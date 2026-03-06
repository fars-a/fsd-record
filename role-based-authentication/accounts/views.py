from django.shortcuts import render, redirect
from django.contrib.auth.models import Group
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from .forms import RegisterForm
from .decorators import role_required

def register(request):
    if request.method == "POST":
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.save()
            role = form.cleaned_data.get('role')
            group = Group.objects.get(name=role)
            user.groups.add(group)
            login(request, user)
            return redirect('dashboard')
    else:
        form = RegisterForm()
    return render(request, 'register.html', {'form': form})

@login_required
def dashboard(request):
    if request.user.groups.filter(name='Admin').exists():
        return redirect('admin_dashboard')
    else:
        return redirect('user_dashboard')

@login_required
@role_required('Admin')
def admin_dashboard(request):
    return render(request, 'admin_dashboard.html')

@login_required
@role_required('User')
def user_dashboard(request):
    return render(request, 'user_dashboard.html')
