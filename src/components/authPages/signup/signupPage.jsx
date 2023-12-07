import React from 'react';
import './signupPage.css'
const SignupPage = () => {
return (
    <div class="container">
    <div class="form-box">
        <div class="form-value">
            <form action="">
                <h2>Зарегистрироваться</h2>
                <div class="inputbox">
                    <ion-icon name="person-circle-outline"></ion-icon>
                    <input type="username" required/>
                    <label for="">Почта</label>
                </div>
                <div class="inputbox">
                    <ion-icon name="lock-closed-outline"></ion-icon>
                    <input type="password" required/>
                    <label for="">Пароль</label>
                </div>
                <button>Зарегистрироваться</button>
                <div class="bottom">
                    <div class="left">
                    <label><a href="/login">Уже есть аккаунт?</a></label>
                    </div>
                   
                </div>
            </form>
        </div>
    </div>
    </div>

);
};

export default SignupPage;