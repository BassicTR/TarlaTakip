from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import CustomUser

class registerForm(UserCreationForm):
    ad_soyad = forms.CharField(max_length=255, required=True)

    class Meta:
        model = CustomUser
        fields = ['ad_soyad', 'username', 'email', 'password1', 'password2']

