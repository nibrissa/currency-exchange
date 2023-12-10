import React from 'react';
import './layout.sass'

const Layout = (props) => {
return (
    <div className='layout-wrapper'>
        <div className='layout-content'>
            {props.children}
        </div>
    </div>

);
};

export default Layout;