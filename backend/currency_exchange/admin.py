from django.contrib import admin

from .models import Conversion, Spend, Receipt

admin.site.register(Conversion)
admin.site.register(Spend)
admin.site.register(Receipt)
