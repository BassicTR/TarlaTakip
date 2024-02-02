from django.urls import path
from . import views 

app_name = "tarlaTakipFrontend"

urlpatterns = [
    path('', views.index, name='index'),
    path('register/', views.register, name='register'),
    path('login/', views.user_login, name='login'),
    path('logout/', views.user_logout, name='logout'),
    path('service/', views.service, name='service'),
    path('service01/', views.service1, name='service01'),
    path('service02/', views.service2, name='service02'),
    path('service03/', views.service3, name='service03'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
]