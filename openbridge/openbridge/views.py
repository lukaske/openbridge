from revproxy.views import ProxyView
from rest_framework import viewsets
from .models import APIService, BillingRule
from .serializers import APIServiceSerializer, BillingRuleSerializer

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

class BillingRuleViewset(viewsets.ModelViewSet):
    queryset = BillingRule.objects.all()
    serializer_class = BillingRuleSerializer

