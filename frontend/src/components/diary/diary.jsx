import React, { useEffect, useState } from "react";
import Layout from "../UI/layout/layout";
import { useTranslation } from "react-i18next";
import { currencies } from "../converter/currencies";

const DiaryPage = () => {
  const { t, i18n } = useTranslation();
  const [history, setHistory] = useState([])
  const [balance, setBalance] = useState(0)
  const [balanceCurrency, setBalanceCurrency] = useState('RUB')
  const [direction, setDirection] = useState(true)
  const [sortValue, setSortValue] = useState('date')
  const [newAmount, setNewAmount] = useState(0)
  const [newName, setNewName] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [newDate, setNewDate] = useState('')
  const [newOperator, setNewOperator] = useState('+')
  const [newCurrency, setNewCurrency] = useState('RUB')
  const [editAmount, setEditAmount] = useState(0)
  const [editName, setEditName] = useState('')
  const [editCategory, setEditCategory] = useState('')
  const [editDate, setEditDate] = useState('')
  const [editOperator, setEditOperator] = useState('+')
  const [editCurrency, setEditCurrency] = useState('RUB')
  const calculateBalnce = () => {
    if (window.fx) {
    setBalance([
      {
        operation: '+',
        amount: 2700,
        currency: 'RUB',
        name: 'wakawaaka',
        category: '-kawakawaka',
        date: '2023-12-06'
      },{
        operation: '-',
        amount: 70,
        currency: 'USD',
        name: 'wakawaaka',
        category: '-kawakawaka',
        date: '2023-12-06'
      },{
        operation: '-',
        amount: 3100,
        currency: 'RUB',
        name: 'wakawaaka',
        category: '-kawakawaka',
        date: '2023-12-06'
      },{
        operation: '+',
        amount: 10000,
        currency: 'RUB',
        name: 'wakawaaka',
        category: '-kawakawaka',
        date: '2023-12-06'
      },
    ].reduce((accumulator, currentValue) => {
      if (currentValue.operation === '-') {
        if (currentValue.currency !== balanceCurrency) {
          return  accumulator - window.fx(currentValue.amount).from(currentValue.currency).to(balanceCurrency)
        }
        return accumulator - currentValue.amount
      } else {
        if (currentValue.currency !== balanceCurrency) {
          return  accumulator + window.fx(currentValue.amount).from(currentValue.currency).to(balanceCurrency)
        }
        return accumulator + currentValue.amount
      }
      
    },
    0))
  } else {
    setTimeout(calculateBalnce, 100)
  }
}
  useEffect(()=>{
    fetch('').then((response) => {
      setHistory([
        {
          operation: '+',
          amount: 2700,
          currency: 'RUB',
          name: 'wakawaaka',
          category: '-kawakawaka',
          date: '2023-12-06'
        },{
          operation: '-',
          amount: 70,
          currency: 'USD',
          name: 'wakawaaka',
          category: '-kawakawaka',
          date: '2023-12-06'
        },{
          operation: '-',
          amount: 3100,
          currency: 'RUB',
          name: 'wakawaaka',
          category: '-kawakawaka',
          date: '2023-12-06'
        },{
          operation: '+',
          amount: 10000,
          currency: 'RUB',
          name: 'wakawaaka',
          category: '-kawakawaka',
          date: '2023-12-06'
        },
      ])
    })
  },[])
  const sort = (value) => {
    const newDirection = value===sortValue? !direction : direction 
    setDirection(newDirection)
    setSortValue(value)
    let ar = [...history]
    console.log(ar.sort((a,b)=> {
      if (a[value]<b[value]) {
        return -1
      }
      return 1
    }))
    console.log(ar)
    setHistory([...history].sort((a,b)=>{
      if (newDirection) {
          if (a[value]<b[value]) {
            return -1
          }
          return 1
      } else {
        if (a[value]>b[value]) {
          return -1
        }
        return 1
      }
  }))
}
  useEffect(() => {
    calculateBalnce()
  }, [balanceCurrency, history, calculateBalnce])
  const create = () => {
    fetch('', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + localStorage.getItem('token')
      },
    data: JSON.stringify({
      operation: newOperator,
      amount: newAmount,
      currency: newCurrency,
      name: newName,
      category: newCategory,
      date: newDate
    })
    })
    setHistory([...history, {
      amount: newAmount,
      name: newName,
      category: newCategory,
      date: newDate,
      operation: newOperator,
      currency: newCurrency,
    }])
    setNewAmount(0)
    setNewName('')
    setNewCategory('')
    setNewDate('')
    setNewOperator('plus')
    setNewCurrency('RUB')
  }

  const deleteNote = (i) => {
    // fetch('')
    setHistory([...history.slice(0, i), ...history.slice(i+1,history.length)])
  }
  const edit = (i) => {
    setHistory([...history.slice(0, i), 
      {
        amount:editAmount,
        name:editName,
        category:editCategory,
        date:editDate,
        operation:editOperator,
        currency:editCurrency
      },
       ...history.slice(i+1,history.length)])
  }
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
      <div>
        {t("add_diary_note")}
        <input value={newAmount} type="number" onChange={(e)=>setNewAmount(e.target.value)} />
        <input value={newName} onChange={(e)=>setNewName(e.target.value)} />
        <input value={newCategory} onChange={(e)=>setNewCategory(e.target.value)} />
        <input value={newDate} type="date" onChange={(e)=>setNewDate(e.target.value)} />
        <select value={newCurrency} onChange={(e)=>setNewCurrency(e.target.value)}>
        {currencies.map(option => (
          <option key={option} value={option}>{t(option)}</option>
        ))}
        </select>
        <select value={newOperator} onChange={(e)=>setNewOperator(e.target.value)}>
          <option  value={'+'}>{t('plus')}</option>
          <option  value={'-'}>{t('minus')}</option>
        </select>
        <button onClick={create}>
          {t("do_add_note")}
        </button>
      </div>
      <h1>{t("diary_title")}</h1>
      <div onClick={() => sort('amount')}>{t("amount")}</div>
      <div onClick={() => sort('operation')}>{t("operation")}</div>
      <div onClick={() => sort('name')}>{t("name")}</div>
      <div onClick={() => sort('category')}>{t("category")}</div>
      <div onClick={() => sort('date')}>{t("date")}</div>
      <div onClick={() => sort('currency')}>{t("currency")}</div>
      {history.map((record,i) => {
        return <div>{record.amount+' '+t('RUB')}{record.name}{t(record.category)}{record.date}<button>{t('edit')}</button><button onClick={()=>deleteNote(i)}>{t('delete')}</button></div>
      })}
    </Layout>
  );
};

export default DiaryPage;
