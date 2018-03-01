from django.contrib import admin
from .models import Task, GlobalSettings

# Register your models here.
admin.site.register(Task)
admin.site.register(GlobalSettings)

