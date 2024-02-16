import os
from django.db import models
from django.contrib.auth import get_user_model
from .helpers import regex_validator, decrypt_string, encrypt_string
from django.utils.translation import gettext_lazy as _
from django.core.validators import validate_slug

def is_alphanumeric(value):
    return value.isalnum()

User = get_user_model()
class APIService(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    service_provider = models.CharField(max_length=200)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    url = models.URLField()
    api_key = models.CharField(max_length=200)
    url_compatible_name = models.CharField(unique=True, validators=[is_alphanumeric], max_length=100)
    image = models.URLField()

    def get_decrypted_key(self):
        return decrypt_string(self.api_key)

    def __str__(self):
        return self.name

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
    client = models.ForeignKey(User, on_delete=models.CASCADE)
    api_service = models.ForeignKey(APIService, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    request_path = models.CharField(max_length=200)
    details = models.TextField()

class UserBills(models.Model):
    class BillType(models.TextChoices):
        DAILY = 'DAY', _('Daily')
        MONTHLY = 'MONTH', _('Monthly')
        WEEKLY = 'YEAR', _('Yearly')

    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    billing_rule = models.ForeignKey(BillingRule, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    total = models.DecimalField(decimal_places=5, default=0, max_digits=10)
    amount = models.DecimalField(decimal_places=5, default=0, max_digits=10)
    bill_type = models.CharField(choices=BillType.choices, max_length=10)


