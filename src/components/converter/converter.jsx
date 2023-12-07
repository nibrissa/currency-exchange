import React, { useEffect, useState} from 'react'
import Layout from '../UI/layout/layout';
import CurrencyRow from '../UI/CurrencyRow/CurrencyRow';


const BASE_URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=23252f9adebfb6f1815d2fd931553567'


const Converter = () => {

    const [currencyOptions, setCurrencyOptions] = useState([])
    const [fromCurrency, setFromCurrency] = useState()
    const [toCurrency, setToCurrency] = useState()
    const [exchangeRate, setExchangeRate] = useState()
    const [amount, setAmount] = useState(1)
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
    
    let toAmount, fromAmount
    if (amountInFromCurrency) {
      fromAmount = amount
      toAmount = amount * exchangeRate
    } else {
      toAmount = amount
      fromAmount = amount / exchangeRate
    }

    useEffect(() => {
        fetch(BASE_URL)
          .then(res => res.json())
          .then(data => {
            const firstCurrency = Object.keys(data.rates)[0]
            setCurrencyOptions([data.base, ...Object.keys(data.rates)])
            setFromCurrency(data.base)
            setToCurrency(firstCurrency)
            setExchangeRate(data.rates[firstCurrency])
          })
      }, [])

      useEffect(() => {
        if (fromCurrency != null && toCurrency != null) {
          fetch(`${BASE_URL}&base=${fromCurrency}&symbols=${toCurrency}`)
            .then(res => res.json())
            .then(data => setExchangeRate(data.rates[toCurrency]))
        }
      }, [fromCurrency, toCurrency])
    
      function handleFromAmountChange(e) {
        setAmount(e.target.value)
        setAmountInFromCurrency(true)
      }
    
      function handleToAmountChange(e) {
        setAmount(e.target.value)
        setAmountInFromCurrency(false)
      }

  return (
    <Layout>
        <div>
            <h1>Конвертер валют</h1>
            <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount}
      />
      <div className="equals">=</div>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
      />
        </div>
    </Layout>
  )
}

export default Converter;