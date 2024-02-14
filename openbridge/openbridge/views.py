from revproxy.views import ProxyView

class TestProxyView(ProxyView):
    def dispatch(self, request, path, mysite):
        if mysite == 'test':
            self.upstream = 'https://store.half-litter.tech'
        else:
            self.upstream = 'https://half-litter.tech'
        return super().dispatch(request, path)