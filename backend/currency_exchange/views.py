from django.contrib.auth.models import User
from rest_framework.generics import CreateAPIView
from rest_framework.mixins import CreateModelMixin, ListModelMixin
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import GenericViewSet, ModelViewSet

from .logic import filter_spends, filter_conversions, filter_receipts
from .models import Conversion, Operation, Receipt, Spend
from .serializers import UserSerializer, SpendSerializer, ReceiptSerializer, SpendSerializerForCreateUpdate, \
    ReceiptSerializerForCreateUpdate, ConversionSerializer, ConversionSerializerForCreateUpdate


class CreateUserView(CreateAPIView):

    model = User
    serializer_class = UserSerializer


class OperationsViewSet(APIView):

    def get(self, request):
        spends = SpendSerializer(filter_spends(request), many=True).data
        receipts = ReceiptSerializer(filter_receipts(request), many=True).data
        response = {'spends': spends,
                    'spends_sum': sum([spend['amount'] for spend in spends]),
                    'receipts': receipts,
                    'receipts_sum': sum([receipt['amount'] for receipt in receipts])}
        return Response(response)


class ConversionsViewSet(CreateModelMixin, ListModelMixin, GenericViewSet):
    
    model = Conversion
    serializer_class = ConversionSerializer

    def create(self, request, *args, **kwargs):
        serializer = ConversionSerializerForCreateUpdate(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer = ConversionSerializer(self.perform_create(serializer))
        return Response(serializer.data, status=201)

    def perform_create(self, serializer):
        return serializer.save()

    def list(self, request, *args, **kwargs):
        queryset = filter_conversions(request)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class SpendViewSet(ModelViewSet):

    model = Spend
    serializer_class = SpendSerializer

    def create(self, request, *args, **kwargs):
        serializer = SpendSerializerForCreateUpdate(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer = SpendSerializer(self.perform_create(serializer))
        return Response(serializer.data, status=201)

    def perform_create(self, serializer):
        return serializer.save()

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = SpendSerializerForCreateUpdate(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer = SpendSerializer(self.perform_update(serializer))
        return Response(serializer.data)

    def perform_update(self, serializer):
        return serializer.save()

    def list(self, request, *args, **kwargs):
        queryset = filter_spends(request)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class ReceiptViewSet(ModelViewSet):

    model = Receipt
    serializer_class = ReceiptSerializer

    def create(self, request, *args, **kwargs):
        serializer = ReceiptSerializerForCreateUpdate(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer = ReceiptSerializer(self.perform_create(serializer))
        return Response(serializer.data, status=201)

    def perform_create(self, serializer):
        return serializer.save()

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = ReceiptSerializerForCreateUpdate(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer = ReceiptSerializer(self.perform_create(serializer))
        return Response(serializer.data)

    def perform_update(self, serializer):
        return serializer.save()

    def list(self, request, *args, **kwargs):
        queryset = filter_receipts(request)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


