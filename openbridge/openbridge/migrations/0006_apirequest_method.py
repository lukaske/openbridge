# Generated by Django 4.2.10 on 2024-02-19 08:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('openbridge', '0005_alter_serviceapikey_options_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='apirequest',
            name='method',
            field=models.CharField(max_length=10, null=True),
        ),
    ]