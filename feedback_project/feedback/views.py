from django.shortcuts import render, redirect
from .models import Feedback
from .forms import FeedbackForm

def submit_feedback(request):
    form = FeedbackForm(request.POST or None)
    if form.is_valid():
        form.save()
        return redirect('feedback_list')
    return render(request, 'feedback/feedback_form.html', {'form': form})

def feedback_list(request):
    feedbacks = Feedback.objects.all().order_by('-submitted_at')
    return render(request, 'feedback/feedback_list.html', {'feedbacks': feedbacks})