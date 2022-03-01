import React, { useState, useEffect, useRef } from 'react'
import { db } from '../firebase'
import { useAuth } from "../contexts/AuthContext"
import SendMessage from './SendMessage';
import '../App.css';

function Home () {
    const [messages, setMessages] = useState([]);
    const { currentUser } = useAuth()
    const scroll = useRef()

    console.log(scroll.current, "hi")
    window.history.scrollRestoration = 'manual'


    const scrollToBottom = () => {
        setTimeout(() => {
            scroll.current?.scrollIntoView({ behavior: "auto" })
        }, 100);

    }

    useEffect(() => {
        db.collection('messages').orderBy('createdAt').limit(50).onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => doc.data()))
        })

    }, [])

    return (
        <>
            {scrollToBottom()}
            <div className="msgs">
                {messages.map(({ id, text, photoURL, uid }) => (
                    <div>
                        <div key={id} className={`msg ${uid === currentUser.uid ? 'sent' : 'received'}`}>
                            <img src={photoURL} alt="" />
                            <p>{text}</p>
                        </div>
                    </div>
                ))}
                <SendMessage scroll={scroll} />
                <div style={{ height: 120 }}></div>
                <div ref={scroll} id="scroll"></div>
            </div>
        </>
    )
}

export default Home;