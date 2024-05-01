import os
from django.db import models
from django.contrib.auth import get_user_model
from .helpers import regex_validator, decrypt_string, encrypt_string
from django.utils.translation import gettext_lazy as _
from rest_framework_api_key.models import AbstractAPIKey, BaseAPIKeyManager
from django.core.exceptions import ValidationError
import re

def is_alphanumeric(value):
    return value.isalnum()

User = get_user_model()

def regex_validator(value):
    try:
        re.compile(value)
        return True
    except re.error:
        raise ValidationError('Regex is invalid')

class APIService(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    service_provider = models.CharField(max_length=200)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)

    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    url = models.URLField()
    api_key = models.CharField(max_length=200)
    url_compatible_name = models.CharField(unique=True, validators=[is_alphanumeric], max_length=100)
    image = models.URLField(null=True)

    def get_decrypted_key(self):
        return decrypt_string(self.api_key)

    def __str__(self):
        return self.name

class ServiceAPIKeyManager(BaseAPIKeyManager):
    def get_usable_keys(self):
        return super().get_usable_keys().filter(api_service__ServiceAPIKeyactive=True)

class ServiceAPIKey(AbstractAPIKey):
    objects = ServiceAPIKeyManager()
    api_service = models.ForeignKey(
        APIService,
        on_delete=models.CASCADE,
        related_name="api_keys",
    )
    owner = models.ForeignKey(User, on_delete=models.CASCADE, default=None) #default=User.objects.filter(is_superuser=True).first().id

    class Meta(AbstractAPIKey.Meta):
        verbose_name = "Service's API key"
        verbose_name_plural = "Service's API keys"

class BillingRule(models.Model):
    id = models.AutoField(primary_key=True)
    api_service = models.ForeignKey(APIService, on_delete=models.CASCADE)

    name = models.CharField(max_length=200)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    regex = models.CharField(validators=[regex_validator], max_length=200)
    price_per = models.DecimalField(decimal_places=5, default=0, max_digits=10)
    rule_level = models.IntegerField(default=0)

class APIRequest(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    api_service = models.ForeignKey(APIService, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    path = models.TextField(null=True)
    ip = models.CharField(max_length=100, null=True)
    user_agent = models.TextField(null=True)
    method = models.CharField(max_length=10, null=True)
    details = models.TextField(null=True)

class UserBills(models.Model):
    class BillType(models.TextChoices):
        DEBIT = 'DEBIT', _('Debit')
        CREDIT = 'CREDIT', _('Credit')

    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    amount = models.DecimalField(decimal_places=5, default=0, max_digits=10)
    bill_type = models.CharField(choices=BillType.choices, max_length=10)


