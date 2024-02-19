from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class MyUserAdmin(UserAdmin):
    model = CustomUser
    ordering = ('email',)

    fieldsets = UserAdmin.fieldsets + (
            (None, {'fields': ('some_extra_data',)}),
    )

admin.site.register(CustomUser, MyUserAdmin)
