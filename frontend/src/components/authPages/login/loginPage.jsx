import React from 'react';
import './loginPage.css'
import { useTranslation } from "react-i18next";

const AuthPage = () => {
    const { t, i18n } = useTranslation();
    const login = (e) => {
        e.preventDefault()
        const data = {
            email: e.target[0].value,
            password: e.target[1].value
        }
        fetch('', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem('token')
              },
            data: JSON.stringify(data)
        }).them((response) => {
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
            <form onSubmit={login}>
                <h2>{t("login_title")}</h2>
                <div className="inputbox">
                    <ion-icon name="person-circle-outline"></ion-icon>
                    <input type="username" required/>
                    <label htmlFor="">{t("Email")}</label>
                </div>
                <div className="inputbox">
                    <ion-icon name="lock-closed-outline"></ion-icon>
                    <input type="password" required/>
                    <label htmlFor="">{t("Password")}</label>
                </div>
                <button type="submit">{t("login_submit")}</button>
                <div className="bottom">
                    <div className="left">
                    <label><a href="/signup">{t("not_registered?")}</a></label>
                    </div>
                    <div className="right">
                        <label><a href="#">{t("forgot_password?")}</a></label>
                    </div>
                </div>
                <div className='lang'>
                        <span onClick={()=>i18n.changeLanguage('ru')} className={i18n.resolvedLanguage==='ru'?'selected-lang':''}>RU</span>
                        /
                        <span onClick={()=>i18n.changeLanguage('en')} className={i18n.resolvedLanguage==='en'?'selected-lang':''}>EN</span>
                    </div>
            </form>
        </div>
    </div>
    </div>

);
};

export default AuthPage;