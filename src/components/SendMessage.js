import { db } from '../firebase';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import firebase from 'firebase/compat/app';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { useAuth } from "../contexts/AuthContext";

function SendMessage ({ scroll }) {
    const [msg, setMsg] = useState('');
    const { currentUser } = useAuth();
    let img;

    async function sendMessage (e) {
        e.preventDefault();

        if (!currentUser.photoURL) {
            img = "https://img.freepik.com/free-vector/realistic-galaxy-background_23-2148991322.jpg?size=626&ext=jpg"
        }
        else {
            img = `${currentUser.photoURL}`
        };

        await db.collection('messages').add({
            text: msg,
            photoURL: img,
            uid: currentUser.uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            user: currentUser.displayName
        });
        setMsg('');
        scroll.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div>
            <form onSubmit={sendMessage} autocomplete="off">
                <div className="sendMsg">
                    <TextField autocomplete="off" style={{ width: '78%', fontSize: '15px', fontWeight: '550', marginLeft: '5px', marginBottom: '-3px' }}
                        variant="filled" placeholder='Message...' type="text" value={msg} onChange={e => setMsg(e.target.value)} className="mt-3 mr-1" />
                    <Button style={{ width: '78%', fontSize: '15px', fontWeight: '550', marginLeft: '5px', marginBottom: '-3px' }}
                        variant="contained" endIcon={<SendIcon />} type="submit" >Send</Button>
                </div>
            </form>
        </div>
    )
};

export default SendMessage;