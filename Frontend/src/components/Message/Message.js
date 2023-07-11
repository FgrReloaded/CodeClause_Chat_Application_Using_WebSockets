import React from 'react';
import "./Message.css";

const Message = ({ userr, message}) => {
    if(userr === "Admin"){
        return (
            <div className={`msgYou my-2 p-2 align-self-center`}>
                {`${message}`}
            </div>
        )
    }
    if (userr) {
        return (

            <div className={`msgHim my-2 p-2 align-self-start`}>
                {`${userr}: ${message}`}
            </div>
        )
    }
    else {
        return (
        <div className="msg bg-info my-2 p-2 align-self-end">
                {`You: ${message}`}
        </div>
        )
    }

}

export default Message
