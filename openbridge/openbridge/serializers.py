from rest_framework import serializers
from .models import APIService, BillingRule, UserBills

class APIServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = APIService
        fields = '__all__'

class BillingRuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = BillingRule
        fields = '__all__'

class UserBillsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserBills
        fields = '__all__'

"""    def create(self, validated_data):
        return APIService.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.service_provider = validated_data.get('service_provider', instance.service_provider)
        instance.description = validated_data.get('description', instance.description)
        instance.url = validated_data.get('url', instance.url)
        instance.api_key = validated_data.get('api_key', instance.api_key)
        instance.url_compatible_name = validated_data.get('url_compatible_name', instance.url_compatible_name)
        instance.image = validated_data.get('image', instance.image)
        instance.save()
        return instance

"""