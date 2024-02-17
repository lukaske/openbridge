from revproxy.views import ProxyView
from rest_framework import viewsets
from .models import APIService, BillingRule
from .serializers import APIServiceSerializer, BillingRuleSerializer
from django.http import HttpResponse
from rest_framework import permissions
from .permissions import IsOwnerOrReadOnly, IsInheritedOrReadOnly

def root_view(request):
    return HttpResponse("Welcome to OpenBridge.me, visit <a href='https://app.openbridge.me'>app.openbridge.me</a> to get started. <br><br> Access API documentation at <a href='/api/'>http://openbridge.me/api/</a>.")

class TestProxyView(ProxyView):
    def dispatch(self, request, path, mysite):
        if mysite == 'test':
            self.upstream = 'https://store.half-litter.tech'
        else:
            self.upstream = 'https://half-litter.tech'
        return super().dispatch(request, path)

class APIServiceViewset(viewsets.ModelViewSet):
    queryset = APIService.objects.all()
    serializer_class = APIServiceSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly , IsOwnerOrReadOnly]

class BillingRuleViewset(viewsets.ModelViewSet):
    queryset = BillingRule.objects.all()
    serializer_class = BillingRuleSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsInheritedOrReadOnly]

