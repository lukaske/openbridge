from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import APIService, BillingRule, UserBills
User = get_user_model()

class APIServiceSerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        model = APIService
        fields = '__all__'

class BillingRuleSerializer(serializers.ModelSerializer):
    api_service = APIServiceSerializer()
    class Meta:
        model = BillingRule
        fields = '__all__'

class UserBillsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserBills
        fields = '__all__'

