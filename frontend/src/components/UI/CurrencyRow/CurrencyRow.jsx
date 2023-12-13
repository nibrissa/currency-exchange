import React from 'react'
import { useTranslation } from "react-i18next";
import './currencyrow.css'

const CurrencyRow = (props) => {
  const { t } = useTranslation();
    const {
        currencyOptions,
        selectedCurrency,
        onChangeCurrency,
        onChangeAmount,
        amount,
        update,
        to, 
        setTo
      } = props
  return (
    <div className='row-wrapper'>
    <input type="number" className="input" value={amount} onChange={(e) => {
      onChangeAmount(e)
      update(selectedCurrency, to, e.target.value, setTo)
    }} />
    <select value={selectedCurrency} onChange={(e)=>{
        onChangeCurrency(e)
        update(e.target.value, to, amount, setTo)
      }}>
      {currencyOptions.map(option => (
        <option key={option} value={option}>{t(option)}</option>
      ))}
    </select>
  </div>
  )
}

export default CurrencyRow;