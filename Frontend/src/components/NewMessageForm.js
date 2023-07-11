import React from 'react';
import "./css/all.css";
import "../css/messageForm.css";


const NewMessageForm = ({ newMessage, setNewMessage, handleSendMessage,  handleStartTyping, handleStopTyping, }) => {

    const handleNewMessageChange = (e) => { setNewMessage(e.target.value) };

    return (
        <>
            <div className="container-fluid form-box mt-5">
                <form className="form" onSubmit={handleSendMessage}>
                    <textarea onInput={handleStartTyping} className="textarea" type="text" rows="1" value={newMessage} onChange={handleNewMessageChange} placeholder="Type Message Here" />
                    {/* <i className="fa-duotone fa-2x fa-face-smile-plus"></i> */}
                    <button className="send" onClick={handleStopTyping}>
                        <i className="fa-duotone fa-2x fa-paper-plane"></i>
                    </button>
                </form>
            </div>
        </>
    );
};

export default NewMessageForm;
