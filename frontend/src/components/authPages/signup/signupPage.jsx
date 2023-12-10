import React from 'react';
import './signupPage.css';
import { useTranslation } from "react-i18next";

const SignupPage = () => {
    const { t, i18n } = useTranslation();
    const [emptyEmail, setEmptyEmail] = React.useState(false)
    const [invalidEmail, setInvalidEmail] = React.useState(false)
    const [invalidPassword, setInvalidPassword] = React.useState(false)
    const [smallPassword, setSmallPassword] = React.useState(false)
    const [emptyPassword, setEmptyPassword] = React.useState(false)
    const signup = (e) => {
        e.preventDefault()
        const data = {
            email: e.target[0].value.trim(),
            password: e.target[1].value.trim()
        }
        setEmptyEmail(false)
        setInvalidEmail(false)
        setInvalidPassword(false)
        setSmallPassword(false)
        setEmptyPassword(false)
        let valid = true
        if (!data.email) {
            valid = false
            setEmptyEmail(true)
        } else if (!data.email.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/)) {
            valid = false
            setInvalidEmail(true)
        }
        if (!data.password.length) {
            valid = false
            setEmptyPassword(true)
        } else if (data.password.length < 8) {
            valid = false
            setSmallPassword(true)
        } else if (data.password.match(/[^a-zA-Z0-9_]/)) {
            valid = false
            setInvalidPassword(true)
        }

        fetch('', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
              },
            data: JSON.stringify(data)
        }).then((response)=>{
            if (response.status) {
                // window.location.pathname = '/convert'
            }
        })
        // window.location.pathname = '/convert'
    }
return (
    <div className="container">
    <div className="form-box">
        <div className="form-value">
            <form onSubmit={signup}>
                <h2>{t("registration_title")}</h2>
                <div className="inputbox">
                    <ion-icon name="person-circle-outline"></ion-icon>
                    <input type="username" name="email" required/>
                    <label htmlFor="">{t("Email")}</label>
                    <p className='error'>
                    {emptyEmail ? t("empty_email") : invalidEmail ? t("invalid_email") : ''}
                    </p>
                </div>
                <div className="inputbox">
                    <ion-icon name="lock-closed-outline"></ion-icon>
                    <input type="password" name="password" required/>
                    <label htmlFor="">{t("Password")}</label>
                    <p className='error'>
                    {emptyPassword ? t("empty_password") : smallPassword ? t("short_password") : invalidPassword ? t("invalid_password") : ''}
                    </p>
                </div>
                <button type='submit'>{t("registration_submit")}</button>
                <div className="bottom">
                    <div className="left">
                    <label><a href="/login">{t("registered?")}</a></label>
                    <div className='lang'>
                        <span onClick={()=>i18n.changeLanguage('ru')} className={i18n.resolvedLanguage==='ru'?'selected-lang':''}>RU</span>
                        /
                        <span onClick={()=>i18n.changeLanguage('en')} className={i18n.resolvedLanguage==='en'?'selected-lang':''}>EN</span>
                    </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    </div>

);
};

export default SignupPage;