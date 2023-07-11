import React from 'react';
import "../css/chatmessage.css";

export default function ChatMessage({ message: { body, ownedByCurrentUser, user: { name } } }) {
    if ((body !== "")) {
        if (ownedByCurrentUser) {
            return (
                <div className="container-md container-fluid mt-2">
                    <div className="row text-end justify-content-end">
                        <div className="col-12 msg owned">
                            <p className="msgYou py-md-1 px-md-3 px-2 py-1 m-0">
                                {body}
                            </p>
                        </div>
                        <div className="col-12">
                            <p className="sentText ml-2 m-0">You</p>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="container-md container-fluid mt-2">
                    <div className="row text-start">
                        <div className="col-12 msg">
                            <p className="msgHim py-md-1 px-md-3 px-2 py-1 m-0">
                                {body}
                            </p>
                        </div>
                        <div className="col-12">
                            <p className="sentText m-0">{name}</p>
                        </div>
                    </div>
                </div>
            )
        }
    } else {
        return null;
    }
};
