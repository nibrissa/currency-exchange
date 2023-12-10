from django.contrib.auth.models import User
from rest_framework.generics import CreateAPIView
from rest_framework.mixins import CreateModelMixin, ListModelMixin
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import GenericViewSet, ModelViewSet

from backend.currency_exchange.logic import filter_operations, filter_conversions
from backend.currency_exchange.models import Conversion, Operation, Receipt, Spend
from backend.currency_exchange.serializers import UserSerializer


class CreateUserView(CreateAPIView):

    model = User
    serializer_class = UserSerializer


class OperationsViewSet(APIView):

    def get(self, request):

        return Response(200)


class ConversionsViewSet(CreateModelMixin, ListModelMixin, GenericViewSet):
    
    model = Conversion

    def list(self, request, *args, **kwargs):
        queryset = filter_conversions(request)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class SpendViewSet(ModelViewSet):

    model = Spend

    def list(self, request, *args, **kwargs):
        queryset = filter_operations(request)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class ReceiptViewSet(ModelViewSet):

    model = Receipt

    def list(self, request, *args, **kwargs):
        queryset = filter_operations(request)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


