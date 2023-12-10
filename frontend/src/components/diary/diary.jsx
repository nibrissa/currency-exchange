import React, { useEffect, useState } from "react";
import Layout from "../UI/layout/layout";
import { useTranslation } from "react-i18next";
import { currencies } from "../converter/currencies";

const DiaryPage = () => {
  const { t, i18n } = useTranslation();
  const [history, setHistory] = useState([])
  const [balance, setBalance] = useState(0)
  const [balanceCurrency, setBalanceCurrency] = useState('RUB')
  const calculateBalnce = () => {
    setBalance([
      {
        operation: '+',
        value: 2700,
        currency: 'RUB',
        name: 'wakawaaka',
        category: '-kawakawaka',
        date: '17:03 20.11.2023'
      },{
        operation: '-',
        value: 70,
        currency: 'USD',
        name: 'wakawaaka',
        category: '-kawakawaka',
        date: '17:03 20.11.2023'
      },{
        operation: '-',
        value: 3100,
        currency: 'RUB',
        name: 'wakawaaka',
        category: '-kawakawaka',
        date: '17:03 20.11.2023'
      },{
        operation: '+',
        value: 10000,
        currency: 'RUB',
        name: 'wakawaaka',
        category: '-kawakawaka',
        date: '17:03 20.11.2023'
      },
    ].reduce((accumulator, currentValue) => {
      if (currentValue.operation === '-') {
        if (currentValue.currency !== balanceCurrency) {
          return  accumulator - window.fx(currentValue.value).from(currentValue.currency).to(balanceCurrency)
        }
        return accumulator - currentValue.value
      } else {
        if (currentValue.currency !== balanceCurrency) {
          return  accumulator + window.fx(currentValue.value).from(currentValue.currency).to(balanceCurrency)
        }
        return accumulator + currentValue.value
      }
      
    },
    0))
  }
  useEffect(()=>{
    fetch('').then((response) => {
      setHistory([
        {
          operation: '+',
          value: 2700,
          currency: 'RUB',
          name: 'wakawaaka',
          category: '-kawakawaka',
          date: '17:03 20.11.2023'
        },{
          operation: '-',
          value: 70,
          currency: 'USD',
          name: 'wakawaaka',
          category: '-kawakawaka',
          date: '17:03 20.11.2023'
        },{
          operation: '-',
          value: 3100,
          currency: 'RUB',
          name: 'wakawaaka',
          category: '-kawakawaka',
          date: '17:03 20.11.2023'
        },{
          operation: '+',
          value: 10000,
          currency: 'RUB',
          name: 'wakawaaka',
          category: '-kawakawaka',
          date: '17:03 20.11.2023'
        },
      ])
    })
  },[])
  useEffect(() => {
    calculateBalnce()
  }, [balanceCurrency, history, calculateBalnce])
  return (
    <Layout>
      <div>{t("balance")}:{balance.toFixed(2)}{balanceCurrency}</div>
      <select value={balanceCurrency} onChange={(e)=>setBalanceCurrency(e.target.value)}>
      {currencies.map(option => (
        <option key={option} value={option}>{t(option)}</option>
      ))}
    </select>
      <div className="lang">
        <span
          onClick={() => i18n.changeLanguage("ru")}
          className={i18n.resolvedLanguage === "ru" ? "selected-lang" : ""}
        >
          RU
        </span>
        /
        <span
          onClick={() => i18n.changeLanguage("en")}
          className={i18n.resolvedLanguage === "en" ? "selected-lang" : ""}
        >
          EN
        </span>
      </div>
      <h1>{t("diary_title")}</h1>
      {history.map((record) => {
        return <div>{record.value+' '+t('RUB')}{record.name}{t(record.category)}{record.date}</div>
      })}
    </Layout>
  );
};

export default DiaryPage;
