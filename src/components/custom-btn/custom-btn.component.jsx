import React from 'react';
import './custom-btn.styles.css';

const CustomBtn = ({children, classname, func, type}) => {
    return (
            <button type={`${type? type : 'button'}`} className={`btn ${classname ? classname : ''}`} onClick={func}>{children}</button>
    );
}
 
export default CustomBtn;