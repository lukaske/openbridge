from django.contrib import admin
from rest_framework_api_key.admin import APIKeyModelAdmin
from .models import ServiceAPIKey

@admin.register(ServiceAPIKey)
class ServiceAPIKeyModelAdmin(APIKeyModelAdmin):
    pass
