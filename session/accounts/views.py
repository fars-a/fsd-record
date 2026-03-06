from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages

# LOGIN
def login_view(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        
        user = authenticate(request, username=username, password=password)
        if user:
            # Store session data manually
            request.session['user_id'] = user.id
            request.session['username'] = user.username
            
            messages.success(request, f"Welcome {user.username}!")
            return redirect('dashboard')
        else:
            messages.error(request, "Invalid username or password.")
    
    return render(request, "accounts/login.html")

# DASHBOARD
def dashboard(request):
    if 'user_id' in request.session:
        username = request.session.get('username')
        return render(request, "accounts/dashboard.html", {'username': username})
    else:
        messages.warning(request, "You must login first.")
        return redirect('login')

# LOGOUT
def logout_view(request):
    request.session.flush()  # clears all session data
    messages.success(request, "Logged out successfully.")
    return redirect('login')