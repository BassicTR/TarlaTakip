from django import forms
from .models import ParselAdd

class ParcelForm(forms.ModelForm):
    class Meta:
        model = ParselAdd
        fields = ['ada', 'parsel', 'alan', 'mahalle', 'tarla_adi']
    
    
    alan = forms.DecimalField(decimal_places=2)
    tarla_adi = forms.CharField(widget=forms.HiddenInput())



class ParcelForm2(forms.ModelForm):
    class Meta:
        model = ParselAdd
        fields = ['tarla_adi','ekilen_urun', 'gubre', 'tohum', 'surulme']

    ekilen_urun = forms.ChoiceField(choices=[
        ('Arpa', 'Arpa'),
        ('Buğday', 'Buğday'),
        ('Mısır', 'Mısır'),
        ('Kırmızı Fasulye', 'Kırmızı Fasulye'),
        ('Nohut', 'Nohut'),
        ('Ayçiçeği', 'Ayçiçeği'),
        ('Üzüm', 'Üzüm'),
    ])