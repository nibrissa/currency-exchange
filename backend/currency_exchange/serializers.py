from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Conversion, Operation, Spend, Receipt


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class ConversionSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Conversion
        fields = '__all__'


class ConversionSerializerForCreateUpdate(serializers.ModelSerializer):

    class Meta:
        model = Conversion
        fields = '__all__'


class SpendSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Spend
        fields = '__all__'


class SpendSerializerForCreateUpdate(serializers.ModelSerializer):

    class Meta:
        model = Spend
        fields = '__all__'


class ReceiptSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Receipt
        fields = '__all__'


class ReceiptSerializerForCreateUpdate(serializers.ModelSerializer):

    class Meta:
        model = Receipt
        fields = '__all__'
