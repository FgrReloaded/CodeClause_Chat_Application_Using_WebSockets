import React from "react";
import "../css/chatmessage.css";



const TypingMessage = ({ user }) => {



    return (
        <div className="typing my-1 type py-2 px-3">
            {user.name} is Typing ...
        </div>
    );
};

export default TypingMessage;
