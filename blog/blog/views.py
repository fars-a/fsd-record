from django.shortcuts import render, redirect
from .forms import PostForm

def post_list(request):
    if request.method == "POST":
        form = PostForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('post_list')
        else:
            # Error handling
            return render(request, 'blog/post_form.html', {'form': form})
    else:
        form = PostForm()

    return render(request, 'blog/post_form.html', {'form': form})