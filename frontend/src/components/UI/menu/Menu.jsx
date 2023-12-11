import React from 'react'
import './menu.sass'

const Menu = () => {
  return (
    <nav className='menu-wrapper'>
        <ul className='menu-content'>
            <li className='menu-content__block-wrapper'>
                <li className="menu-content__element">
                    Конвертер валют
                </li>
                <li className="menu-content__element">
                    Дневник трат
                </li>
            </li>
            <li className='menu-content__block-wrapper'>
                   <li className="menu-content__element">
                <button className='menu-content__btn'>Войти</button>
            </li>
            <li className="menu-content__element">
                <button className='menu-content__btn'>Зарегестрироваться</button>
            </li>
            </li>
         

        </ul>

    </nav>
  )
}

export default Menu;