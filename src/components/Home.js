import '../App.css';
import { db } from '../firebase';
import { Link } from "react-router-dom";
import SendMessage from './SendMessage';
import { useAuth } from "../contexts/AuthContext";
import React, { useState, useEffect, useRef } from 'react';


function Home () {
    const [messages, setMessages] = useState([]);
    const { currentUser } = useAuth();
    const scroll = useRef();

    const scrollToBottom = () => {
        setTimeout(() => {
            scroll.current?.scrollIntoView({ behavior: "auto" })
        }, 100);
    };

    useEffect(() => {
        db.collection('messages').orderBy('createdAt').limit(50).onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => doc.data()))
        })

    }, []);

    return (
        <>
            {scrollToBottom()}
            <div className="msgs">
                {messages.map(({ id, text, photoURL, uid, user }) => (
                    <div>
                        <div key={id} className={`msg ${uid === currentUser.uid ? 'sent' : 'received'}`}>
                            <Link to="/Other-user" className="break w-100 text-dark mb-2" state={{ user: { user, photoURL } }}>
                                {user}
                            </Link>
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
};

export default Home;