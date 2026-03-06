from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group

class Command(BaseCommand):
    help = 'Create default roles (groups) for the application'

    def handle(self, *args, **kwargs):
        roles = ['Admin', 'Manager', 'User']
        for role in roles:
            group, created = Group.objects.get_or_create(name=role)
            if created:
                self.stdout.write(self.style.SUCCESS(f'Successfully created role: {role}'))
            else:
                self.stdout.write(self.style.WARNING(f'Role already exists: {role}'))
