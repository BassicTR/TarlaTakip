from django.urls import path, re_path
from . import views 
app_name = "tarlaTakipAfterLogin"

urlpatterns = [
    path('dashboard/', views.dashboard, name = "dashboard"), #Anasayfa
    path('add_parcel/', views.add_parcel, name='add_parcel'),
    path('exchange/', views.exchange_list, name = "exchange"),
    path('parcels/', views.available_parcels, name='available_parcels'),
    path('delete-parcel/', views.delete_parcel, name='delete_parcel'),
    path('show_parcel_details/<int:selected_parcel_id>/', views.show_selected_parcel_details, name='show_selected_parcel_details'),
    path('profit_loss_table/', views.profit_loss_table, name='profit_loss_table'),

]