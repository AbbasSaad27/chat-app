import React, { useEffect, useRef, useState } from 'react'
import { auth, createNewMessage } from '../../firebase/firebase.utils'
import CustomBtn from '../custom-btn/custom-btn.component'
import Message from '../message/message.component'
import './chat-ui.styles.css'

const ChatUi = ({user, docs}) => {
    let isMounted = useRef(false);
    const [message, setMessage] = useState('');
    const [messagesArr, setMessagesArr] = useState(docs);

    const dummy = useRef(null);
    useEffect(() => {
        isMounted.current = true;
        dummy.current.scrollIntoView({behavior: 'smooth'})

        return () => isMounted.current = false;
    }, [messagesArr])

    const handleSubmit = async (e) => {
        e.preventDefault();
        let messegasDbRef = await createNewMessage(message);
        try {
        messegasDbRef.orderBy('createdAt', 'asc').limitToLast(35).onSnapshot(messageList => {
            const docs = messageList.docs;
            isMounted.current && setMessagesArr(docs);
        })
        }catch(e) {
            console.log(e.message);
        }
        
        setMessage('')
    }
    const handleChange = (e) => {
        setMessage(e.target.value);
    }

    return (
        <div className='chat-ui'>
            <header className="head">
                <div className="user-info">
                    <img className="userPhoto user-pic" src={`${user.photoURL}`} alt="userPhoto" />
                    <p className="user-name">Logged in as {user.displayName}</p></div>
                <CustomBtn func={() => auth.signOut()} classname="ui-btn ui-btn-top">Sign Out</CustomBtn>
            </header>
            <main className="message-box">
                {messagesArr[0] ? messagesArr.map((messageSnap) => {
                    const data = messageSnap.data()
                    return (
                        <Message key={messageSnap.id} photoURL={data.photoURL} classname={data.uid === user.uid ? 'own' : 'other'} photoclass={data.uid === user.uid ? 'self-user' : 'other-user'}>{data.text}</Message>
                    )
                }) : ''}
                <div className="dummy" ref={dummy}></div>
            </main>
            <footer className="send-message">
                <form className="message-form" onSubmit={handleSubmit}>
                    <textarea
                    type="text"
                    name="message"
                    placeholder="Type a message"
                    value={message}
                    onChange={handleChange}
                    className='typer'
                    required 
                    ></textarea>
                    <CustomBtn type="submit" classname="ui-btn ui-btn-bottom">Send</CustomBtn>
                </form>
            </footer>
        </div>
    );
}
 
export default ChatUi;