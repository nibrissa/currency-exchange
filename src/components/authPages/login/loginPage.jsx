import React from 'react';
import './loginPage.css'
const AuthPage = () => {
return (
    <div class="container">
    <div class="form-box">
        <div class="form-value">
            <form action="">
                <h2>Войти</h2>
                <div class="inputbox">
                    <ion-icon name="person-circle-outline"></ion-icon>
                    <input type="username" required/>
                    <label for="">Имя пользователя</label>
                </div>
                <div class="inputbox">
                    <ion-icon name="lock-closed-outline"></ion-icon>
                    <input type="password" required/>
                    <label for="">Пароль</label>
                </div>
                <button>Войти</button>
                <div class="bottom">
                    <div class="left">
                    <label><a href="/signup">Нет аккаунта?</a></label>
                    </div>
                    <div class="right">
                        <label><a href="#">Забыли пароль?</a></label>
                    </div>
                </div>
            </form>
        </div>
    </div>
    </div>

);
};

export default AuthPage;