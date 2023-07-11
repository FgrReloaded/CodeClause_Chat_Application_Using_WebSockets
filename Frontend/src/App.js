import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import ChatRoom from './components/ChatRoom';
import Join from './components/Join';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import GlobalChat from './components/GlobalChat';




function App() {
  return (
    <>
    <div className='title' >
      Chat Web App
    </div>
    <Router>
        <Route path="/" exact component={Join} />
        <Route path="/chat/name=:name-room=:room" component={ChatRoom} />
        <Route path="/global" component={GlobalChat} />
    </Router>
    </>
  )
}

export default App;
