# Generated by Django 4.0.4 on 2023-12-12 22:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('currency_exchange', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='receipt',
            old_name='type_of_receipt',
            new_name='type',
        ),
        migrations.RenameField(
            model_name='spend',
            old_name='type_of_spend',
            new_name='type',
        ),
    ]
