from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import APIService, BillingRule, UserLedger, ServiceAPIKey
from .helpers import encrypt_string, decrypt_string

User = get_user_model()


class ApiKeyField(serializers.Field):
    class Meta:
        ordering = ['id']

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
    api_service = serializers.PrimaryKeyRelatedField(queryset=APIService.objects.all().order_by('id'))

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        request = self.context.get('request', None)
        if request and request.user.is_authenticated:
            self.fields['api_service'].queryset = APIService.objects.filter(owner=request.user).order_by('id')

    class Meta:
        model = BillingRule
        fields = '__all__'
        ordering = ['id']

class APIServiceMinimalSerializer(serializers.ModelSerializer):
    class Meta:
        model = APIService
        fields = ['id', 'name']
        ordering = ['id']
class UserLedgerSerializer(serializers.ModelSerializer):
    api_service = APIServiceMinimalSerializer()
    class Meta:
        model = UserLedger
        fields = '__all__'
        ordering = ['id']

class ServiceAPIKeySerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        model = ServiceAPIKey
        fields = ['id', 'prefix', 'created', 'name', 'revoked', 'api_service', 'owner']
        ordering = ['id']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.key = None
        request = self.context.get('request', None)
        if request and request.user.is_authenticated:
            self.fields['api_service'].queryset = APIService.objects.filter(active=True).order_by('id')

    def create(self, validated_data):
        api_key_obj, key = ServiceAPIKey.objects.create_key(**validated_data)
        self.key = key
        return api_key_obj

    def get_fields(self):
        fields = super().get_fields()
        if self.instance:
            fields["api_service"].read_only = True
        return fields

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if hasattr(self, 'key'):  # Check if key is set (i.e., during creation)
            data['key'] = self.key
        return data

class BalanceSerializer(serializers.Serializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    balance = serializers.DecimalField(max_digits=10, decimal_places=5)


