# Generated by Django 5.0 on 2024-01-30 22:51

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='ParselAdd',
            fields=[
                ('ada', models.CharField(max_length=255)),
                ('parsel', models.CharField(max_length=255)),
                ('mahalle', models.CharField(max_length=255)),
                ('alan', models.FloatField()),
                ('tarla_id', models.AutoField(primary_key=True, serialize=False)),
                ('tarla_adi', models.CharField(max_length=255)),
                ('gubre_fiyat', models.FloatField()),
                ('tohum_fiyat', models.FloatField()),
                ('surulme_fiyat', models.FloatField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
