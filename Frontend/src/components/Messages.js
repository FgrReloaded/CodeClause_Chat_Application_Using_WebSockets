import React from 'react';
import ChatMessage from './ChatMessage';
import TypingMessage from './TypingMessage'

const Messages = ({ messages, typingUsers }) => {
    return (
        <>
            <div className="container-md container-fluid px-0">
                <div className="row">
                    <div className="messages-container px-0">
                        <ol className="messages-list px-0">
                            {messages.map((message, i) => (
                                <div key={i}>
                                    <ChatMessage message={message}></ChatMessage>
                                </div>
                            ))}
                            {typingUsers.map((user, i) => (
                                <div key={messages.length + i}>
                                    <TypingMessage user={user}></TypingMessage>
                                </div>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Messages;
