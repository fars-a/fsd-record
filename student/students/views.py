from django.shortcuts import render, get_object_or_404
from .models import Student
from django.contrib.auth.decorators import login_required

@login_required
def student_list(request):
    students = Student.objects.all()
    return render(request, 'student_list.html', {'students': students})
