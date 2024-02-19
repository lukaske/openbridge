import re
from revproxy.views import ProxyView
from rest_framework import viewsets
from .models import APIService, BillingRule, ServiceAPIKeyManager
from .serializers import APIServiceSerializer, BillingRuleSerializer
from django.http import HttpResponse
from rest_framework import permissions
from .permissions import IsOwnerOrReadOnly, IsInheritedOrReadOnly, HasServiceAPIKey
from django.http import JsonResponse
from rest_framework_api_key.permissions import HasAPIKey

def root_view(request):
    return HttpResponse("Welcome to OpenBridge.me, visit <a href='https://app.openbridge.me'>app.openbridge.me</a> to get started. <br><br> Access API documentation at <a href='/api/'>http://openbridge.me/api/</a>.")

class TestProxyView(ProxyView):
    permission_classes = [HasServiceAPIKey]
    def dispatch(self, request, path, **kwargs):
        # Check permissions manually
        for permission in self.permission_classes:
            if not permission().has_permission(request, self):
                return JsonResponse({'error': 'Unauthorized'}, status=401)
        
        api_object = HasServiceAPIKey().get_key_object(request).api_service
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

