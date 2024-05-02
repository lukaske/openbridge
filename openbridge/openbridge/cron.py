from django.db import transaction
from django.contrib.auth import get_user_model
from .models import APIRequest, BillingRule, UserLedger, APIService
from datetime import datetime as dt
from django.utils import timezone
import re

User = get_user_model()
def group_by(data, key='rule_level'):
    grouped_data = {}
    for item in data:
        if item[key] not in grouped_data:
            grouped_data[item[key]] = []
        grouped_data[item[key]].append(item)

    return grouped_data, sorted(grouped_data.keys())

def get_month_starts(start_date, end_date):
    month_starts = []
    current_date = dt(start_date.year, start_date.month, 1)
    while current_date <= end_date:
        month_starts.append(current_date)
        if current_date.month == 12:
            current_date = dt(current_date.year + 1, 1, 1)
        else:
            current_date = dt(current_date.year, current_date.month + 1, 1)

    return month_starts

def apply_billing_rule(request, rules, levels):
    #Only one billing rule will be applied on the same level
    partial_bill = 0
    for level in levels:
        sorted_levels = sorted(rules[level], key=lambda x: x['name'])
        for rule in sorted_levels:
            if re.findall(r"".format(rule['regex']), request['path']):
                partial_bill += rule['price_per']
                break
    return partial_bill

def generate_bills(from_date=dt.min, to_date=dt.today()):
    # Limit the start_date
    from_date = APIRequest.objects.order_by('created_at').first().created_at
    # Generate the months between the from_date and to_date, excluding the last month
    months = get_month_starts(from_date, to_date)[:-2]
    for i, month in enumerate(months):
        month_tz_aware = timezone.make_aware(month, timezone=timezone.get_current_timezone())
        with transaction.atomic():
            print(f'Billing for month: {month}')
            calculated_all_totals = True
            api_earning = {}
            users = APIRequest.objects.filter(created_at__month=month.month, created_at__year=month.year).values('user').distinct()
            for i, user in enumerate(users):
                user_id = user['user']
                api_services = APIRequest.objects.filter(user=user_id, created_at__month=month.month, created_at__year=month.year).values('api_service')
                distinct_api_services = api_services.distinct()
                print(f'Processing user {i+1} / {len(users)}, {len(distinct_api_services)} distinct API services used.')
                for api_service in distinct_api_services:
                    api_service_id = api_service['api_service']
                    billing_rules = BillingRule.objects.filter(api_service=api_service_id).values()
                    rules, levels = group_by(billing_rules)
                    logs = APIRequest.objects.filter(user=user_id, api_service=api_service_id, created_at__month=month.month, created_at__year=month.year).values()
                    bill = 0
                    calculated_total = False
                    for log in logs:
                        try:
                            bill += apply_billing_rule(log, rules, levels)
                            calculated_total = True
                        except Exception as e:
                            print(e)
                            print(f'Error in applying billing rule for {user_id} and {api_service_id}')
                    if calculated_total:
                        UserLedger.objects.create(user_id=user_id, credit=bill, billing_period=month_tz_aware, api_service_id=api_service_id, description=f'Usage of API')
                        api_earning[api_service_id] = api_earning.get(api_service_id, 0) + bill
                        APIRequest.objects.filter(user=user_id, api_service=api_service_id, created_at__month=month.month, created_at__year=month.year).delete()
                    else:
                        calculated_all_totals = False
            api_services = APIService.objects.all()
            for api_service in api_services:
                UserLedger.objects.create(user_id=api_service.owner.id, debit=api_earning.get(api_service.id, 0), billing_period=month_tz_aware, api_service_id=api_service.id, description='Earnings from API usage')
            if calculated_all_totals: print(f'Successfully processed month: {month}')
            else: print(f'Error in calculating total for {month}! Missing logs / unsuccessful regex!')
    return True