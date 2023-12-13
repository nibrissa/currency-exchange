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
  const [newoperation, setNewoperation] = useState('+')
  const [newCurrency, setNewCurrency] = useState('RUB')
  const [validationCreate, setValidationCreate] = useState({
    amount: true,
    name: true,
    category: true,
    date: true
  })
  const [editNotes, setEditNotes] = useState([])
  const calculateBalnce = () => {
    if (window.fx&&history&&history.reduce) {
      console.log(history.reduce((accumulator, currentValue) => {
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
    setBalance(history.reduce((accumulator, currentValue) => {
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
      const resp =[
        {
          operation: '-',
          amount: 270,
          currency: 'RUB',
          name: 'яблоки',
          category: 'продукты',
          date: '2023-12-06'
        },{
          operation: '-',
          amount: 70,
          currency: 'USD',
          name: 'наушники',
          category: 'техника',
          date: '2023-12-06'
        },{
          operation: '-',
          amount: 310,
          currency: 'RUB',
          name: 'творог',
          category: 'продукты',
          date: '2023-12-06'
        },{
          operation: '+',
          amount: 10000,
          currency: 'RUB',
          name: 'премия',
          category: 'работа',
          date: '2023-12-06'
        },
      ]
      console.log('gsgfg')
      console.log(resp)
      setHistory(resp)
      setEditNotes(resp.map((note)=>{return {...note, editing:false}}))
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
    const sorted = [...history].sort((a,b)=>{
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
  })
    setEditNotes(sorted.map((note)=>{return {...note, editing:false}}))
    console.log(sorted)
    setHistory(sorted)
}
  useEffect(() => {
    if (window.fx&&history&&history.reduce) {
      console.log(11111111)
      window.test = history.reduce((accumulator, currentValue) => {
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
      0)
      console.log(history.reduce((accumulator, currentValue) => {
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
      setBalance(history.reduce((accumulator, currentValue) => {
        if (currentValue.operation === '-') {
          if (currentValue.currency !== balanceCurrency) {
            return  +accumulator - window.fx(currentValue.amount).from(currentValue.currency).to(balanceCurrency)
          }
          return +accumulator - currentValue.amount
        } else {
          if (currentValue.currency !== balanceCurrency) {
            return  +accumulator + +window.fx(currentValue.amount).from(currentValue.currency).to(balanceCurrency)
          }
          return +accumulator + +currentValue.amount
        }
        
      },
      0))
    } else {
      setTimeout(calculateBalnce, 100)
    }
  }, [balanceCurrency, history])
  const create = () => {
    let valid  = true
    let newValid = {
      amount:true,
      name:true,
      category:true,
      date:true,
    }
    console.log(2314234234234)
    console.log(newAmount)
    if (isNaN(+newAmount)||newAmount===0) {
      valid = false
      newValid = {
        ...newValid,
        amount: false
      }
    } else {
      console.log('ok')
      newValid = {
        ...newValid,
        amount: true
      }
    }
    if (!newName.length) {
      valid = false
      newValid = {
        ...newValid,
        name: false
      }
    } else {
      newValid = {
        ...newValid,
        name: true
      }
    }
    if (!newCategory.length) {
      valid = false
      newValid = {
        ...newValid,
        category: false
      }
    } else {
      newValid = {
        ...newValid,
        category: true
      }
    }
    if (!newDate.length) {
      valid = false
      newValid = {
        ...newValid,
        date: false
      }
    } else {
      newValid = {
        ...newValid,
        date: true
      }
    }

    if (valid) {
    fetch('', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + localStorage.getItem('token')
      },
    data: JSON.stringify({
      operation: newoperation,
      amount: newAmount,
      currency: newCurrency,
      name: newName,
      category: newCategory,
      date: newDate
    })
    })
    const updatedList = [...history, {
      amount: newAmount,
      name: newName,
      category: newCategory,
      date: newDate,
      operation: newoperation,
      currency: newCurrency,
    }] 
    console.log(updatedList)
    setEditNotes(updatedList.map((note)=>{return {...note, editing:false}}))
    setHistory(updatedList)
    setNewAmount(0)
    setNewName('')
    setNewCategory('')
    setNewDate('')
    setNewoperation('plus')
    setNewCurrency('RUB')
  } 
  console.log(444444444444)
  console.log(newValid)
    setValidationCreate(newValid)
  
  }

  const deleteNote = (i) => {
    // fetch('')
    const deleted = [...history.slice(0, i), ...history.slice(i+1,history.length)]
    setEditNotes(deleted.map((note)=>{return {...note, editing:false}}))
    console.log(deleted)
    setHistory(deleted)
  }

  const writeEdit = (i, field, value) => {
    console.log([...editNotes.slice(0,i), {
      ...editNotes[i],
      [field]: value
    }, ...editNotes.slice(i+1, editNotes.length)])
    setEditNotes([...editNotes.slice(0,i), {
      ...editNotes[i],
      [field]: value
    }, ...editNotes.slice(i+1, editNotes.length)])
  }

  const saveEdit = (i) => {
    setEditNotes([...editNotes.slice(0, i),
      {
        ...editNotes[i],
        editing: false
      }, ...editNotes.slice(i+1, editNotes.length)
    ])
    console.log([...history.slice(0, i),
      editNotes[i],
      ...history.slice(i+1, history.length)])
    setHistory([...history.slice(0, i),
    editNotes[i],
    ...history.slice(i+1, history.length)])
  }

  const startEdit = (i) => {
    console.log(i)
    console.log([...editNotes.slice(0, i),
      {
        ...editNotes[i],
        editing: true
      }, 
      ...editNotes.slice(i+1, editNotes.length)
    ])
    setEditNotes([...editNotes.slice(0, i),
      {
        ...editNotes[i],
        editing: true
      }, 
      ...editNotes.slice(i+1, editNotes.length)
    ])
  }

  const cancelEdit = (i) => {
    setEditNotes([...editNotes.slice(0, i),
      {
        ...history[i],
        editing: false
      }, ...editNotes.slice(i+1, editNotes.length)
    ])
  }
  return (
    <Layout>
      <div>{t("balance")}:{balance.toFixed?balance.toFixed(2):balance}{balanceCurrency}</div>
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
        <input value={newAmount} style={validationCreate.amount?{}:{'border':'1px solid red'}} type="number" onChange={(e)=>setNewAmount(e.target.value)} />
        <input value={newName}  style={validationCreate.name?{}:{'border':'1px solid red'}} onChange={(e)=>setNewName(e.target.value)} />
        <input value={newCategory}  style={validationCreate.category?{}:{'border':'1px solid red'}} onChange={(e)=>setNewCategory(e.target.value)} />
        <input value={newDate}  style={validationCreate.date?{}:{'border':'1px solid red'}} type="date" onChange={(e)=>setNewDate(e.target.value)} />
        <select value={newCurrency} onChange={(e)=>setNewCurrency(e.target.value)}>
        {currencies.map(option => (
          <option key={option} value={option}>{t(option)}</option>
        ))}
        </select>
        <select value={newoperation} onChange={(e)=>setNewoperation(e.target.value)}>
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
      <div onClick={() => sort('currency')}>{t("currency")}</div>
      <div onClick={() => sort('date')}>{t("date")}</div>
      {history&&history.map&&history.map((record,i) => {
        return (console.log(editNotes[i]), editNotes[i]&&editNotes[i].editing) ? <div>
          <input value={editNotes[i].amount} type="number" onChange={(e)=>writeEdit(i, 'amount', e.target.value)} />
          <input value={editNotes[i].name} onChange={(e)=>writeEdit(i, 'name', e.target.value)} />
          <input value={editNotes[i].category} onChange={(e)=>writeEdit(i, 'category', e.target.value)} />
          <input value={editNotes[i].date} type="date" onChange={(e)=>writeEdit(i, 'date', e.target.value)} />
          <select value={editNotes[i].currency} onChange={(e)=>writeEdit(i, 'currency', e.target.value)}>
          {currencies.map(option => (
            <option key={option} value={option}>{t(option)}</option>
          ))}
          </select>
          <select value={editNotes[i].operation} onChange={(e)=>writeEdit(i, 'operation', e.target.value)}>
            <option  value={'+'}>{t('plus')}</option>
            <option  value={'-'}>{t('minus')}</option>
          </select>
          <button onClick={()=>cancelEdit(i)}>
            {t("cancel")}
          </button>          <button onClick={()=>saveEdit(i)}>
            {t("save")}
          </button>
        </div> : <div>{record.amount+' '+t(record.currency)}{record.name}{t(record.category)}{record.date}<button onClick={()=>startEdit(i)}>{t('edit')}</button><button onClick={()=>deleteNote(i)}>{t('delete')}</button></div>
      })}
    </Layout>
  );
};

export default DiaryPage;
