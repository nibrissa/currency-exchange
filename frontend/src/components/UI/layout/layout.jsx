import React from 'react';
import './layout.sass'
import Menu from '../menu/Menu';

const Layout = (props) => {
return (
    <div className='layout-wrapper'>
        <Menu/>
        <div className='layout-content'>
            {props.children}
        </div>
    </div>

);
};

export default Layout;