import datetime

from backend.currency_exchange.models import Operation, Conversion, Spend, Receipt


def filter_by_date(data_dict: dict, queryset):
    current_date_time = datetime.datetime.now()

    if data_dict.get('year_from') and data_dict.get('year_to'):
        queryset = queryset.filter(conversion_date_time__year__gte=data_dict.get('year_from'),
                                   conversion_date_time__year__lte=data_dict.get('year_to'))
    elif data_dict.get('one_year'):
        queryset = queryset.filter(conversion_date_time__year=data_dict.get('one_year'))
    if data_dict.get('month_from') and data_dict.get('month_to'):
        queryset = queryset.filter(conversion_date_time__year=current_date_time.year,
                                   conversion_date_time__month__gte=data_dict.get('month_from'),
                                   conversion_date_time__month__lte=data_dict.get('month_to'))
    elif data_dict.get('one_month'):
        queryset = queryset.filter(conversion_date_time__year=current_date_time.year,
                                   conversion_date_time__month=data_dict.get('one_month'))
    if data_dict.get('date_from') and data_dict.get('date_to'):
        queryset = queryset.filter(conversion_date_time__year=current_date_time.year,
                                   conversion_date_time__month=current_date_time.month,
                                   conversion_date_time__day__gte=data_dict.get('date_from'),
                                   conversion_date_time__day__lte=data_dict.get('date_to'))
    elif data_dict.get('one_date'):
        queryset = queryset.filter(conversion_date_time__year=current_date_time.year,
                                   conversion_date_time__month=current_date_time.month,
                                   conversion_date_time__day=data_dict.get('one_date'))

    return queryset


def filter_operations(request):
    data_dict = {
        'one_date': request.GET.get('date'),
        'date_from': request.GET.get('date_from'),
        'one_month': request.GET.get('month'),
        'month_from': request.GET.get('month_from'),
        'month_to': request.GET.get('month_to'),
        'one_year': request.GET.get('year'),
        'year_from': request.GET.get('year_from'),
        'year_to': request.GET.get('year_to'),

    }

    user = request.user

    operations = Operation.objects.filter(user=user)
    operations = filter_by_date(data_dict, operations)
    return operations


def filter_conversions(request):
    data_dict = {
        'one_date': request.GET.get('date'),
        'date_from': request.GET.get('date_from'),
        'one_month': request.GET.get('month'),
        'month_from': request.GET.get('month_from'),
        'month_to': request.GET.get('month_to'),
        'one_year': request.GET.get('year'),
        'year_from': request.GET.get('year_from'),
        'year_to': request.GET.get('year_to'),

    }

    user = request.user

    conversions = Conversion.objects.filter(user=user)
    conversions = filter_by_date(data_dict, conversions)
    return conversions


def send_monthly_report_to_email(user, month):
    months = {
        1: 'Январь',
        2: 'Февраль',
        3: 'Март',
        4: 'Апрель',
        5: 'Май',
        6: 'Июнь',
        7: 'Июль',
        8: 'Август',
        9: 'Сентябрь',
        10: 'Октябрь',
        11: 'Ноябрь',
        12: 'Декабрь',
    }
    current_date_time = datetime.datetime.now()
    spends = Spend.objects.filter(user=user, operation_date_time__month=month).count()
    receipts = Receipt.objects.filter(user=user, operation_date_time__month=month).count()
    budget_type = 'Сбалансированный' if spends == receipts else 'Профицитный' if spends < receipts else 'Дефицитный'
    message = f'Статистика за за {months.get(month)} {current_date_time.year}:\n' \
              f'Траты: {spends}\n.' \
              f'Поступления: {receipts}\n.' \
              f'Тип бюджета: {budget_type}.'
