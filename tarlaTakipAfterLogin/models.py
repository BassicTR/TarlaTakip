from django.db import models
from tarlaTakipFrontend.models import CustomUser
from django.core.exceptions import ValidationError

class ParselAdd(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    ada = models.CharField(max_length=255)
    parsel = models.CharField(max_length=255)
    mahalle = models.CharField(max_length=255)
    alan = models.FloatField()
    tarla_id = models.AutoField(primary_key=True)
    tarla_adi = models.CharField(max_length=255, null=True, blank=True)
    gubre = models.CharField(max_length=255, null=True, blank=True)
    tohum = models.CharField(max_length=255, null=True, blank=True)
    surulme = models.CharField(max_length=255, null=True, blank=True)
    ekilen_urun= models.CharField(max_length=255, null=True, blank=True)

    sale_price = models.FloatField(null=True, blank=True)
    purchase_price = models.FloatField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.username} - {self.ada} - {self.parsel} - {self.mahalle} - {self.alan} - {self.tarla_id}"
    

    
