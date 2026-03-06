from django import forms
from .models import Post

class PostForm(forms.ModelForm):

    class Meta:
        model = Post
        fields = ['title', 'content', 'author']

    # Field-level validation
    def clean_title(self):
        title = self.cleaned_data.get('title')
        if len(title) < 5:
            raise forms.ValidationError("Title must be at least 5 characters long.")
        return title

    # Form-level validation
    def clean(self):
        cleaned_data = super().clean()
        title = cleaned_data.get("title")
        content = cleaned_data.get("content")

        if title and content:
            if title.lower() in content.lower():
                raise forms.ValidationError(
                    "Title should not be repeated inside content."
                )
        return cleaned_data