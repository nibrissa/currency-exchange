from django.conf import settings
from django.db import models


class Conversion(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    currency_from = models.CharField(max_length=3)
    currency_to = models.CharField(max_length=3)
    amount_to_convert = models.FloatField()
    converted_amount = models.FloatField()
    conversion_date_time = models.DateTimeField(auto_now_add=True)


class Operation(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    operation_name = models.CharField(max_length=120)
    amount = models.PositiveIntegerField(verbose_name='Сумма')
    operation_date_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True


class Spend(Operation):
    STORE_PURCHASE = "SP"
    TRANSPORT_PAYMENT = "TP"
    TELECOM_AND_INTERNET_CHARGES = "TI"
    CAFES_AND_RESTAURANTS = "CR"
    CARD_TRANSFERS = "CT"
    ENTERTAINMENTS = "EN"
    BEAUTY_AND_HEALTH = "BH"
    CLOTHES_AND_SHOES = "CS"
    HOUSEHOLD_GOODS = "HG"
    FUEL = "FU"
    OTHER = "OT"
    SPENDS = [
        (STORE_PURCHASE, "Покупки в магазинах"),
        (TRANSPORT_PAYMENT, "Проезд в общественном транспорте"),
        (TELECOM_AND_INTERNET_CHARGES, "Связь и интернет"),
        (CAFES_AND_RESTAURANTS, "Рестораны и кафе"),
        (CARD_TRANSFERS, "Переводы"),
        (ENTERTAINMENTS, "Развлечения"),
        (FUEL, "Топливо"),
        (OTHER, "Другие траты")
    ]
    type = models.CharField(choices=SPENDS, max_length=2, verbose_name='Тип операции')


class Receipt(Operation):
    CASHBACK = "CB"
    SALARY = "SA"
    SOCIAL_PAYMENT = "SP"
    SCHOLARSHIP = "SC"
    CARD_TRANSFERS = "CT"
    OTHER = "OT"
    RECEIPTS = [
        (CASHBACK, "Кэшбэк"),
        (SALARY, "Зарплата"),
        (SCHOLARSHIP, "Стипендия"),
        (SOCIAL_PAYMENT, "Социальные выплаты"),
        (CARD_TRANSFERS, "Переводы"),
        (OTHER, "Другие операции"),

    ]
    type = models.CharField(choices=RECEIPTS, max_length=2, verbose_name='Тип операции')