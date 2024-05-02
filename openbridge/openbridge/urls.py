"""
URL configuration for openbridge project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
from django.urls import re_path
from rest_framework.routers import DefaultRouter
from .views import (ServiceProxyView, APIServiceViewset, BillingRuleViewset, root_view,
                    SecurityViewset, ServiceAPIKeyViewset, ClientSubcriptionsViewset,
                    AnalyticsViewset)

router = DefaultRouter()
router.register(r'api-service', APIServiceViewset, basename='api-service')
router.register(r'billing-rule', BillingRuleViewset, basename='billing-rule')
router.register(r'client-api-keys', ServiceAPIKeyViewset, basename='client-api-keys')
router.register(r'client-services', ClientSubcriptionsViewset, basename='client-services')
router.register(r'client-analytics', AnalyticsViewset, basename='client-analytics')
router.register(r'key-gen', SecurityViewset, basename='key-gen')


urlpatterns = [
    path('', root_view, name='root'),
    path('admin/', admin.site.urls),
    path('api/auth/', include('dj_rest_auth.urls')),
    path('api/auth/registration/', include('dj_rest_auth.registration.urls')),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/schema/swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/', include(router.urls)),
    path('b/<slug:site>/<path:path>/', ServiceProxyView.as_view()),
]
