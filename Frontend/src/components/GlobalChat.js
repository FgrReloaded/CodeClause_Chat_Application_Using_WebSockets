import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client';
import "./css/all.css";
import "../css/global.css";
import '../css/indicator.css';
import { userr } from "../components/Join.js";
import Message from "./Message/Message.js";

let socket;
const urls = process.env.REACT_APP_URL;


const GlobalChat = () => {

    const [id, setid] = useState("");
    const [messages, setMessages] = useState([]);
    const [typingUser, setTypingUser] = useState('');
    const [sty, setSty] = useState('none');

    const handleSendMessage = (e) => {
        e.preventDefault();
        const message = document.getElementById('textarea').value;
        socket.emit('message', { message, id });
        document.getElementById('textarea').value = "";
    };
    const handleNewMessage = () => {
        socket.emit('typing', userr);  
    };
    const cancelTyping = ()=>{
        socket.emit('canceltyping', userr);  
    }
    useEffect(() => {
        socket = io(urls, { transports: ['websocket'] });
        // socket = io.connect();

        socket.on('connect', () => {
            setid(socket.id);

        })
        socket.emit('joined', userr)

        socket.on('welcome', (data) => {
            setMessages([...messages, data]);
         
        })

        socket.on('userJoined', (userr) => {
            append(`${userr} Joined`, 'align-self-center');
        });
        socket.on('typing', userr => {
            setSty('block');
            setTypingUser(`${userr} is Typing...`);
        });
        socket.on('canceltyping', userr => {
            setSty('none');
            setTypingUser('');
        });

        socket.on('leave', (userr) => {
            append(`${userr} Left`, 'align-self-center');
        });
    }, []);

    useEffect(() => {
        socket.on('sendMessage', (data) => {
            setMessages([...messages, data]);
        })
    }, [messages]);
    const append = (mesg, position) => {
        var messageElement = document.createElement('div');
        messageElement.innerHTML = mesg;
        messageElement.classList.add('msg', 'p-2', position);
        var content = document.getElementById('content');
        if (messageElement.innerHTML.includes('Joined')) {
            messageElement.classList.add('bg-warning', "my-2");
        } else if (messageElement.innerHTML.includes('Left')) {
            messageElement.classList.add('bg-danger', "my-2");
        }else if(messageElement.innerHTML.includes('Typing...')){
            messageElement.classList.add('bg-secondary', 'typing');
        }
        content.append(messageElement);
    };

        return (
            <>
             <div className="container my-5">
                <div className="row">
                    <div className="col-md-8 col-12">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12 d-flex justify-content-between align-items-center info">
                                    <div className="box"></div>
                                    <h4 className='glob' >Global</h4>
                                    <a href="/" className='a'>
                                        <h4 className='x mx-3 my-auto' >X</h4>
                                    </a>
                                </div>
                                <div className="col-12 mt-5 chatBox overflow-auto">
                                    <div className="content p-md-5 p-2" id="content">
                                        <div className={`typing p-2 order-last d-${sty}`}>{typingUser}</div>
                                        {messages.map((item, i) => <Message key={i} userr={item.id === id ? '' : item.userr} message={item.message} />)}
                                    </div>
                                </div>
                                <div className="col-12 mt-5 textarea-2">
                                    <form className="globForm " onSubmit={handleSendMessage} >
                                        <textarea className="textarea " id="textarea" type="text" rows="1"  onInput={handleNewMessage} placeholder="Type Message Here" />
                                        {/* <i className="fa-duotone fa-2x fa-face-smile-plus"></i> */}
                                        <button className="send" onClick={cancelTyping}>
                                            <i className="fa-duotone fa-2x fa-paper-plane"></i>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>


            </>
        );
    };

    export default GlobalChat;