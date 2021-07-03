import React from 'react';
import './message.styles.css';


const Message = ({children, photoURL, classname, photoclass}) => {
    return (
        <div className="message-container">
            <img className={`userPhoto ${photoclass} `} src={`${photoURL}`} alt="userphoto" />
            <div className={`message ${classname}`}>
                <p className="text">{children}</p>
            </div>
        </div>
    );
}
 
export default Message;