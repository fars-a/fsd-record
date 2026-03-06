from django import forms
from django.contrib.auth.models import User

ROLE_CHOICES = (
    ('Admin', 'Admin'),
    ('Manager', 'Manager'),
    ('User', 'User'),
)

from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms

class RegisterForm(UserCreationForm):
    role = forms.ChoiceField(choices=[
        ('User', 'User'),
        ('Admin', 'Admin')
    ])

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2', 'role']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # Remove help texts
        self.fields['username'].help_text = None
        self.fields['password1'].help_text = None
        self.fields['password2'].help_text = None