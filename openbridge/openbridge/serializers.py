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
    api_service = serializers.PrimaryKeyRelatedField(queryset=APIService.objects.all())

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        request = self.context.get('request', None)
        if request and request.user.is_authenticated:
            self.fields['api_service'].queryset = APIService.objects.filter(owner=request.user)

    class Meta:
        model = BillingRule
        fields = '__all__'

class UserBillsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserBills
        fields = '__all__'

