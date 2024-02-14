import os
from django.db import models
from django.contrib.auth import get_user_model
from helpers import regex_validator, decrypt_string, encrypt_string

User = get_user_model()
class APIService(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField()
    service_provider = models.CharField()
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    url = models.URLField()
    api_key = models.CharField()
    url_compatible_name = models.CharField(unique=True, validators=lambda x: x.isalnum(), transform=lambda x: x.lower())
    image = models.URLField()

    def __str__(self):
        return self.name

class BillingRule(models.Model):
    id = models.AutoField(primary_key=True)
    api_service = models.ForeignKey(APIService, on_delete=models.CASCADE)

    name = models.CharField()
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    regex = models.CharField(validators=lambda x: regex_validator(x))
    price_per = models.DecimalField(decimal_places=5, default=0)
    rule_level = models.IntegerField(default=0)

class APIRequest(models.Model):
    id = models.AutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)
    request_path = models.CharField()
    details = models.TextField()

class ProxyKeyStore(models.Model):
    id = models.AutoField(primary_key=True)
    key = models.CharField(transform=lambda x: encrypt_string(x))
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def get_decrypted_key(self):
        return decrypt_string(self.key)



