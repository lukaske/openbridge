import re
from revproxy.views import ProxyView
from rest_framework import viewsets
from .models import APIService, BillingRule, APIRequest
from .serializers import APIServiceSerializer, BillingRuleSerializer
from django.http import HttpResponse
from rest_framework import permissions
from .permissions import IsOwnerOrReadOnly, IsInheritedOrReadOnly, HasServiceAPIKey
from django.http import JsonResponse
from urllib.parse import urlparse

def root_view(request):
    return HttpResponse("Welcome to OpenBridge.me, visit <a href='https://app.openbridge.me'>app.openbridge.me</a> to get started. <br><br> Access API documentation at <a href='/api/'>http://openbridge.me/api/</a>.")

class ServiceProxyView(ProxyView):
    permission_classes = [HasServiceAPIKey]

    def dispatch(self, request, path, **kwargs):
        # Check permissions manually
        for permission in self.permission_classes:
            if not permission().has_permission(request, self):
                return JsonResponse({'error': 'Unauthorized'}, status=401)

        key_object = HasServiceAPIKey().get_key_object(request)
        api_object = key_object.api_service
        #request.META['HTTP_HOST'] = urlparse(api_object.url).netloc
        #request.META['CONTENT_TYPE'] = 'text/plain'
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
    queryset = APIService.objects.all()
    serializer_class = APIServiceSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly , IsOwnerOrReadOnly]

class BillingRuleViewset(viewsets.ModelViewSet):
    queryset = BillingRule.objects.all()
    serializer_class = BillingRuleSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsInheritedOrReadOnly]

