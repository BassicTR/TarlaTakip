from django.db import models

from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    ad_soyad = models.CharField(max_length=255, verbose_name="Ad Soyad")
    
    def __str__(self):
        return self.ad_soyad