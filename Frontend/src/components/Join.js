import React, { useState } from 'react'
import '../css/join.css'
import { Link } from 'react-router-dom';

let userr;

const sendUser = () => {
    userr = document.getElementById('globname').value;
    document.getElementById('globname').value = "";
}

export default function Join() {

    const [name, setName] = useState('');
    const [names, setNames] = useState('');
    const [room, setRoom] = useState('');
    const [display, setdisplay] = useState('d-flex');
    const [Jdisplay, setJdisplay] = useState('d-none');
    const [RoomStyle, setRoomStyle] = useState({background: 'rgba(255, 255, 255, 0.5)'})
    const [GlobalStyle, setGlobalStyle] = useState({background: 'rgba(255, 255, 255, 0.05)'})
    const Global = () => {
        setdisplay('d-none');
        setGlobalStyle({background: 'rgba(255, 255, 255, 0.5)'});
        setRoomStyle({background: 'rgba(255, 255, 255, 0.05)'});
        setJdisplay('d-flex');
    }
    const Room = () => {
        setdisplay('d-flex');
        setGlobalStyle({background: 'rgba(255, 255, 255, 0.05)'});
        setRoomStyle({background: 'rgba(255, 255, 255, 0.5)'});
        setJdisplay('d-none');
    }

    return (
        <>
            <div className="container mb-5">
                <div className="row mx-auto text-center justify-content-center mt-5">
                    <div className="col-md-4 col-6 gloroom p-3" onClick={Room} style={RoomStyle}>Chat Room</div>
                    <div className="col-md-4 col-6 gloroom p-3" onClick={Global} style={GlobalStyle}>Global Chat</div>
                </div>
                <div className="row mx-auto text-center justify-content-center">
                    <div className="col-md-8 roomForm p-md-5 col-12 p-3">
                        <div className={`${display} flex-column`}>
                            <h4 className="nameHead">Enter Your Name</h4>
                            <input type="text" onChange={(event) => setName(event.target.value)} className='name' placeholder='Name' />
                        </div>
                        <div className={`${Jdisplay} flex-column`}>
                            <h4 className="nameHead">Enter Your Name Here</h4>
                            <input type="text" id="globname" onChange={(event) => setNames(event.target.value)} className='name' placeholder='Name' />
                        </div>
                        <div className={`${display} flex-column`} >
                            <h4 className="roomHead">Enter Your Room</h4>
                            <input type="text" onChange={(event) => setRoom(event.target.value)} className='room' placeholder='Room' />
                        </div>
                        <Link className={`${display} flex-column a mb-3`}
                            onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat/name=${name}-room=${room}`}>
                            <button className="btn btn-info mt-5" type="submit">Join</button>
                        </Link>
                        <Link className={`${Jdisplay} flex-column a mb-3`} onClick={event => (!names) ? event.preventDefault() : null} to='/global' >
                            <button className="btn btn-info mt-5" onClick={sendUser} type='submit'>Join</button>
                        </Link>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export { userr};