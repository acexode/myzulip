import React, {useState,} from 'react';
import chatcss from './chat.css'
import Channels from './chanels';
import Messages from './messages';
import { useHistory } from 'react-router-dom';
// import socketIOClient from "socket.io-client";
console.log('object')


function Chat() {
    const [channel, setChannel] = useState([])
    // const [endPoint, setendPoint] = useState('https://glacial-earth-67440.herokuapp.com/')
    
    
    let history = useHistory()
    let obj = JSON.parse(localStorage.getItem('user'))
  
    const [user, setuser] = useState(obj.username)
    
    const [selected, selectedChannel] = useState()   
    console.log(user)
    const switchChannel = (e) =>{        
        selectedChannel(e)
        console.log(selected)
    }
  return (
    <div className="chat-container">         
             <Channels user={user} channel={channel} switchChannel={switchChannel} />    
            <Messages user={user}  /> 
           
  
    </div>
  );
}

export default Chat;