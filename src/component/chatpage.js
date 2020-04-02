import React, {useState,} from 'react';
import chatcss from './chat.css'
import Channels from './chanels';
import Messages from './messages';
import { useHistory } from 'react-router-dom';
// import socketIOClient from "socket.io-client";
console.log('object')
const channelsList = [
    {
        image: 'https://ca.slack-edge.com/TQHUN32CR-URZMR72BZ-g0f935391eac-72',
        name: 'Akinnade Tumise',
        status: 'online',
        id : 1

    },
    {
        image: 'https://ca.slack-edge.com/TQHUN32CR-URZMR72BZ-g0f935391eac-72',
        name: 'Iman Wada',
        status: 'busy',
        id : 2
    },
    {
        image: 'https://ca.slack-edge.com/TQHUN32CR-US02K1L86-51f9ae34cd3c-72',
        name: 'Khalil Kabara',
        status: 'away',
        id : 3
    },
    {
        image: 'https://ca.slack-edge.com/TQHUN32CR-URS7E3AAV-ff02d1b7acea-72',
        name: 'Abdulqudus',
        status: 'offline',
        id : 4
    },
    {
        image: 'https://ca.slack-edge.com/TQHUN32CR-URXS5JJFP-05967d430d2f-72',
        name: 'Ahmad Dambatta',
        status: 'online',
        id : 5
    },
    {
        image: 'https://ca.slack-edge.com/TQHUN32CR-US05A3N6L-e2a877201844-72',
        name: 'Sherif',
        status: 'online',
        id : 6
    }
]

function Chat() {
    const [channel, setChannel] = useState(channelsList)
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
         <div id="frame" >
             <Channels user={user} channel={channel} switchChannel={switchChannel} />    
            <Messages user={user} selected={selected} channels={channelsList} /> 
           
   </div> 
    </div>
  );
}

export default Chat;