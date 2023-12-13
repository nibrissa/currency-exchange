from django.urls import re_path, path
from rest_framework.routers import SimpleRouter

from .views import *

urlpatterns = [
    re_path(r'register/{0,1}$', CreateUserView.as_view()),
    re_path(r'operation/{0,1}$', OperationsViewSet.as_view()),
]

router = SimpleRouter()
router.register(r'conversion', ConversionsViewSet, basename='Conversion')
router.register(r'spend', SpendViewSet, basename='Spend')
router.register(r'receipt', ReceiptViewSet, basename='Receipt')

urlpatterns += router.urls
