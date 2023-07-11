import React, { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client';
import NewMessageForm from './NewMessageForm';
import useTyping from "./hooks/useTyping";
import Indicator from './Indicator';
import Messages from './Messages';
import InfoBar from './InfoBar';
import '../css/chatroom.css'

const ChatRoom = (props) => {

    const socketRef = useRef();

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [users, setUsers] = useState([]);
    const [typingUsers, setTypingUsers] = useState([]);
    const [user, setUser] = useState();


    const { isTyping, startTyping, stopTyping, cancelTyping } = useTyping();

    const { room, name } = props.match.params;
    const url = process.env.REACT_APP_URL;

    useEffect(() => {
        socketRef.current = io(url, {
            query: { room, name }
        });
        setUser({
            name: name
        });
        socketRef.current.on('allUsersData', ({ users }) => {
            setUsers(users)
        })
        socketRef.current.on('user leave chat', (name) => {
            setUsers(users.filter((user) => {return user.name !== name}));
        });
        socketRef.current.on("send message", (message) => {
            const incomingMessage = {
                ...message,
                ownedByCurrentUser: message.senderId === socketRef.current.id,
            };
            setMessages((messages) => [...messages, incomingMessage]);
        });


        socketRef.current.on("start typing message", (typingInfo) => {
            if (typingInfo.senderId !== socketRef.current.id) {
              const user = typingInfo.user;
              setTypingUsers((users) => [...users, user]);
            }
          });
      
          socketRef.current.on("stop typing message", (typingInfo) => {
            if (typingInfo.senderId !== socketRef.current.id) {
              const user = typingInfo.user;
              setTypingUsers((users) => users.filter((u) => u.name !== user.name));
            }
          });
    }, [room, name]);


    const sendMessage = () => {
        if (!socketRef.current) return;
        const messageObject = {
            senderId: socketRef.current.id,
            type: "text",
            body: newMessage,
            user: user
        };
        setNewMessage("");
        socketRef.current.emit("send message", messageObject);
    };

    const startTypingMessage = () => {
        if (!socketRef.current) return;
        socketRef.current.emit("start typing message", {
          senderId: socketRef.current.id,
          user,
        });
      };
    
      const stopTypingMessage = () => {
        if (!socketRef.current) return;
        socketRef.current.emit("stop typing message", {
          senderId: socketRef.current.id,
          user,
        });
      };


    const handleSendMessage = (event) => {
        event.preventDefault();
        cancelTyping();
        sendMessage(newMessage);
        setNewMessage("");
    };

    useEffect(() => {
        if (isTyping) startTypingMessage();
        else stopTypingMessage();
      }, [isTyping]);

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-8 col-12">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <InfoBar room={room} />
                                </div>
                                <div className="col-12 chatBox overflow-auto">
                                    <Messages messages={messages} typingUsers={typingUsers} />
                                </div>
                                <div className="col-12 masterForm">
                                    <NewMessageForm newMessage={newMessage} setNewMessage={setNewMessage} handleSendMessage={handleSendMessage} handleStartTyping={startTyping} handleStopTyping={stopTyping} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-12 indicate my-md-0 my-2 ">
                        <Indicator users={users} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatRoom;