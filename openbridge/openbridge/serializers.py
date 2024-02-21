from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import APIService, BillingRule, UserBills
from .helpers import encrypt_string, decrypt_string
User = get_user_model()


class ApiKeyField(serializers.Field):
    def to_representation(self, value):
        try:
            decrypted = decrypt_string(value)
        except:
            decrypted = "Error: Key could not be decrypted, please check the key in DB."
        return decrypted

    def to_internal_value(self, data):
        return encrypt_string(data)

class APIServiceSerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())
    api_key = ApiKeyField(write_only=True, required=False)

    class Meta:
        model = APIService
        fields = '__all__'
        ordering = ['id']


class BillingRuleSerializer(serializers.ModelSerializer):
    api_service = serializers.PrimaryKeyRelatedField(queryset=APIService.objects.all())

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        request = self.context.get('request', None)
        if request and request.user.is_authenticated:
            self.fields['api_service'].queryset = APIService.objects.filter(owner=request.user)

    class Meta:
        model = BillingRule
        fields = '__all__'
        ordering = ['id']

class UserBillsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserBills
        fields = '__all__'
        ordering = ['id']

