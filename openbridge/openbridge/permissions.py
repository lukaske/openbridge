import typing

from django.http import HttpRequest
from rest_framework import permissions
from rest_framework_api_key.models import AbstractAPIKey
from rest_framework_api_key.permissions import BaseHasAPIKey
from .models import ServiceAPIKey

class HasServiceAPIKey(BaseHasAPIKey):
    model = ServiceAPIKey

    def has_permission(self, request, view):
        super_permission = super().has_permission(request, view)
        site_id = view.kwargs.get('site', None)
        key_object = self.get_key_object(request)
        return super_permission and key_object.api_service.url_compatible_name == site_id

    def get_key_object(self, request):
        key = self.get_key(request)
        if not key:
            return None
        return self.model.objects.get_from_key(key)

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the snippet.
        return obj.owner == request.user

class IsInheritedOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the snippet.
        return obj.api_service.owner == request.user
