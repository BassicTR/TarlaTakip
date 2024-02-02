from django.shortcuts import render , redirect
from .forms import registerForm
from django.contrib.auth import authenticate, login,logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import AuthenticationForm




def index(request):
    return render(request, '../templates/index.html')


def register(request):
    if request.method == 'POST':
        form = registerForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data['username']
            password = form.cleaned_data['password1']
            user = authenticate(username=username, password=password)
            login(request, user)
            return redirect('tarlaTakipAfterLogin:dashboard')
    else:
        form = registerForm()

    return render(request, 'register.html', {'form': form})


def user_login(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('tarlaTakipAfterLogin:dashboard')
        else:
            # Hatalı giriş durumu
            return render(request, 'login.html', {'error_message': 'Hatalı giriş!'})
    return render(request, 'login.html')

@login_required(login_url='tarlaTakipFrontend/login/')
def dashboard(request):
    return render(request, 'dashboard.html')


def user_logout(request):
    logout(request)
    return redirect("tarlaTakipFrontend:index")


def service(request):
    return render(request, '../templates/service.html')
def service1(request):
    return render(request, '../templates/service01.html')
def service2(request):
    return render(request, '../templates/service02.html')
def service3(request):
    return render(request, '../templates/service03.html')
def about(request):
    return render(request, '../templates/about.html')
def contact(request):
    return render(request, '../templates/contact.html')