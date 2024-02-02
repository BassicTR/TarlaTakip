from django.shortcuts import render, redirect, get_object_or_404
from .models import ParselAdd
from .forms import  *
from tarlaTakipFrontend.models import CustomUser


def dashboard(request):
        return render(request, 'dashboard.html')

def add_parcel(request):
    if request.method == 'POST':
        form = ParcelForm(request.POST)

        if form.is_valid():
            mahalle = form.cleaned_data['mahalle']
            ada = form.cleaned_data['ada']
            parsel = form.cleaned_data['parsel']


            existing_parcel = ParselAdd.objects.filter(
                mahalle=mahalle,
                ada=ada,
                parsel=parsel,
                user=request.user
            ).first()

            if existing_parcel:
                return render(request, 'dashboard.html', {'form': form, 'error_message': 'Bu tarla zaten sistemde mevcut!'})

            parcel = form.save(commit=False)
            parcel.user = request.user 
            parcel.save()  

            
            return redirect('tarlaTakipAfterLogin:dashboard') 
    else:
        form = ParcelForm()
    return render(request, 'dashboard.html' ,{'form': form})

def exchange_list(request):
    return render(request, 'borsalar.html')

def available_parcels(request):
    
    available_parcels = ParselAdd.objects.filter(user=request.user)

    return render(request, 'available_parcels.html', {'available_parcels': available_parcels})


def delete_parcel(request):
    if request.method == 'POST':
        mahalle = request.POST.get('mahalle')
        ada = request.POST.get('ada')
        parsel = request.POST.get('parsel')

        try:
            parcel = ParselAdd.objects.get(mahalle=mahalle, ada=ada, parsel=parsel)
            parcel.delete()
        except ParselAdd.DoesNotExist:
            pass

    return redirect('tarlaTakipAfterLogin:available_parcels')

from django.views import View

def show_selected_parcel_details(request, selected_parcel_id):
    selected_parcel = ParselAdd.objects.get(tarla_id=selected_parcel_id)

    if request.method == 'POST':
        form = ParcelForm2(request.POST, instance=selected_parcel)
        if form.is_valid():
            form.save(commit=False)

            selected_parcel.save()
            return redirect('tarlaTakipAfterLogin:show_selected_parcel_details' , selected_parcel_id=selected_parcel_id)  
    else:
        form = ParcelForm2(instance=selected_parcel)
    # Şablon ile birlikte detayları render eder.
    return render(request, 'selected_parcel_details.html', {'selected_parcel': selected_parcel , 'form': form})



def profit_loss_table(request):
    # Mevcut kullanıcıya ait tarlaları alir.
    user_parcels = ParselAdd.objects.filter(user=request.user)

    profit_loss_data = []
    for parcel in user_parcels:
        # Satış ve alış fiyatlarını kontrol ediyor.
        sale_price = float(parcel.sale_price) if parcel.sale_price is not None else 0
        purchase_price = float(parcel.purchase_price) if parcel.purchase_price is not None else 0

        # Gübre, tohum ve sürülme değerlerini kontrol ediyor.
        gubre = float(parcel.gubre) if parcel.gubre is not None else 0
        tohum = float(parcel.tohum) if parcel.tohum is not None else 0
        surulme = float(parcel.surulme) if parcel.surulme is not None else 0

        total_income = parcel.alan * 750 / 1000
        total_cost = gubre + tohum + surulme 
        profit_loss = total_income - total_cost


        profit_loss_data.append({
            'tarla_id': parcel.tarla_id,
            'tarla_adi': parcel.tarla_adi,
            'parsel': parcel.parsel,
            'ada': parcel.ada,
            'alan': parcel.alan,
            'gubre': gubre,
            'tohum': tohum,
            'surulme': surulme,
            'total_income': total_income,
            'total_cost': total_cost,
            'profit_loss': profit_loss,
        })

    return render(request, 'karzarar.html', {'profit_loss_data': profit_loss_data})





