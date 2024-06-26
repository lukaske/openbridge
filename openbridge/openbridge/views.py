import re
from revproxy.views import ProxyView
from rest_framework import viewsets
from .models import APIService, BillingRule, APIRequest, ServiceAPIKey, UserLedger
from .serializers import APIServiceSerializer, BillingRuleSerializer, ServiceAPIKeySerializer, UserLedgerSerializer, BalanceSerializer
from django.http import HttpResponse
from rest_framework import permissions, filters
from .permissions import IsOwnerOrReadOnly, IsInheritedOrReadOnly, HasServiceAPIKey, ShowOnlyToOwner
from django_filters.rest_framework import DjangoFilterBackend
from django.http import JsonResponse
from urllib.parse import urlparse
from .helpers import generate_fernet_key
from .raw_queries import getAnalyticsRawQuery, getAnalyticsRawQueryOwner
from django.db import connection
from django.db.models import Sum
from .cron import generate_bills

def root_view(request):
    return HttpResponse("Welcome to OpenBridge.me, visit <a href='https://app.openbridge.me'>app.openbridge.me</a> to get started. <br><br> Access API documentation at <a href='/api/'>http://openbridge.me/api/</a>.")

class ServiceProxyView(ProxyView):
    permission_classes = [HasServiceAPIKey]

    def get_proxy_request_headers(self, request):
        headers = super().get_proxy_request_headers(request)
        key_object = HasServiceAPIKey().get_key_object(request)
        api_object = key_object.api_service
        headers['Host'] = urlparse(api_object.url).netloc
        has_content_type = headers.get('Content-Type', None)
        if not has_content_type:
            headers['Content-Type'] = 'text/plain'
        if api_object.api_key:
            headers['Authorization'] = api_object.get_decrypted_key()
        return headers

    def dispatch(self, request, path, **kwargs):
        # Check permissions manually
        for permission in self.permission_classes:
            if not permission().has_permission(request, self):
                return JsonResponse({'error': 'Unauthorized'}, status=401)

        key_object = HasServiceAPIKey().get_key_object(request)
        api_object = key_object.api_service

        APIRequest.objects.create(
            api_service=api_object,
            path=path,
            method=request.method,
            user=key_object.owner,
            ip=request.META.get('REMOTE_ADDR'),
            user_agent=request.META.get('HTTP_USER_AGENT'),
            details=request.headers # debug
        )
        self.upstream = api_object.url
        return super().dispatch(request, path)

class APIServiceViewset(viewsets.ModelViewSet):
    queryset = APIService.objects.all().order_by('id')
    serializer_class = APIServiceSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly , IsOwnerOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['id', 'name', 'active', 'owner']
    ordering_fields = ['id', 'name', 'created_at', 'active']
    search_fields = ['name', 'description']

class BillingRuleViewset(viewsets.ModelViewSet):
    queryset = BillingRule.objects.all().order_by('id')
    serializer_class = BillingRuleSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['id', 'api_service']
    ordering_fields = ['id', 'name', 'created_at']
    search_fields = ['name', 'description']

    def get_queryset(self, *args, **kwargs):
        if self.request.user.is_anonymous:
            return BillingRule.objects.none()
        return super().get_queryset(*args, **kwargs).filter(
            api_service__in=APIService.objects.filter(owner=self.request.user)
        )

class SecurityViewset(viewsets.ViewSet):
    allowed_methods = ['GET']
    def list(self, request):
        return JsonResponse({'key': generate_fernet_key()})

class ClientBalanceViewset(viewsets.ViewSet):
    serializer_class = BalanceSerializer
    allowed_methods = ['GET']
    def list(self, request):
        if request.user.is_anonymous:
            return JsonResponse({'error': 'Unauthorized'}, status=401)
        user = request.user
        balance = UserLedger.objects.filter(user=user).aggregate(price_diff=Sum('debit', default=0) - Sum('credit', default=0))
        response = {
            'user_id': user.id,
            'balance': balance['price_diff']
        }
        return JsonResponse(response)

class AnalyticsViewset(viewsets.ViewSet):
    def list(self, request):
        if request.user.is_anonymous:
            return JsonResponse({'error': 'Unauthorized'}, status=401)
        with connection.cursor() as cursor:
            cursor.execute(getAnalyticsRawQuery(), (request.user.id,))
            data1 = cursor.fetchall()
            data1 = [dict(zip([col[0] for col in cursor.description], row)) for row in data1]
            cursor.execute(getAnalyticsRawQueryOwner(), (request.user.id,))
            data2 = cursor.fetchall()
            data2 = [dict(zip([col[0] for col in cursor.description], row)) for row in data2]
            response = {
                'user_id': request.user.id,
                'used': data1,
                'provided': data2
            }
            return JsonResponse(response)

class ServiceAPIKeyViewset(viewsets.ModelViewSet):
    queryset = ServiceAPIKey.objects.all().order_by('id')
    serializer_class = ServiceAPIKeySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['id', 'api_service', 'owner']
    ordering_fields = ['id', 'created', 'name', 'revoked', 'expiry_date']
    search_fields = ['name', 'description']
    lookup_field = 'prefix'

    def destroy(self, *args, **kwargs):
        # Don't allow deletion of keys
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    def get_queryset(self, *args, **kwargs):
        if self.request.user.is_anonymous:
            return ServiceAPIKey.objects.none()
        return super().get_queryset(*args, **kwargs).filter(
            owner=self.request.user
        )

class ClientSubcriptionsViewset(viewsets.ModelViewSet):
    queryset = APIService.objects.all().order_by('id')
    serializer_class = APIServiceSerializer

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['id', 'name', 'active', 'owner']
    ordering_fields = ['id', 'name', 'created_at', 'active']
    search_fields = ['name', 'description']
    allowed_methods = ['GET']

    def get_queryset(self, *args, **kwargs):
        if self.request.user.is_anonymous:
            return APIService.objects.none()
        return super().get_queryset(*args, **kwargs).filter(
            id__in=ServiceAPIKey.objects.filter(owner=self.request.user).values('api_service_id')
        )

class UserLedgerViewset(viewsets.ModelViewSet):
    queryset = UserLedger.objects.all().order_by('created_at').select_related('api_service')
    serializer_class = UserLedgerSerializer

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['id', 'api_service_id', 'billing_period', 'created_at', 'debit', 'credit']
    ordering_fields = ['id', 'api_service_id', 'billing_period', 'created_at', 'debit', 'credit']
    search_fields = ['description']
    allowed_methods = ['GET']

    def get_queryset(self, *args, **kwargs):
        if self.request.user.is_anonymous:
            return UserLedger.objects.none()
        return super().get_queryset(*args, **kwargs).filter(
            user_id=self.request.user.id
    )

class GenerateBillingViewset(viewsets.ViewSet):
    allowed_methods = ['GET']
    def list(self, request):
        if request.user.is_anonymous:
            return JsonResponse({'error': 'Unauthorized'}, status=401)
        generate_bills()
        return JsonResponse({'status': 'success'}, status=200)

