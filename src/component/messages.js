import React, { useState, createRef, useEffect } from 'react';
import chatcss from './chat.css'
import { useHistory } from "react-router-dom";
import axios from 'axios';
// import { Editor } from 'react-draft-wysiwyg';
import editor from './editor.css'
import AddPeople from './addPeople';
import EditChannel from './channel/EditChannel';
import DeleteChannel from './channel/DeleteChannel';


    let msgList = [
        {
        type: 'sent',
        img: '',
        text: 'How far with the project'
        },
        {
        type: 'replies',
        img: '',
        text: 'working on the ui'
        },
        {
        type: 'sent',
        img: '',
        text: 'ok cool'
        },
        {
        type: 'replies',
        img: '',
        text: 'will let you know once am done'
        },
        {
        type: 'sent',
        img: '',
        text: 'sure'
        }
]
  
function Messages({user, selected, channels}) {
    let token = localStorage.getItem('token')
    let chatbox = createRef()
    let messagesEnd = createRef()
   
    let by = ['sent', 'replies']
    const [msg,setMsg] = useState('')
    const [disquses, setDisqus] = useState(msgList)

    // scroll to bottom
    const scrollToBottom = () => {
        messagesEnd.scrollIntoView({ behavior: "smooth" }); 
    }

    // current location 
    let history = useHistory()
    let path = history.location.pathname.lastIndexOf('/') +1
    let id = history.location.pathname.slice(path)    

    //fetch channel data
    const [channel, setChannel] = useState({})
    
    // getData(id)
    useEffect(() => {
        function  getData  (id){
            console.log(id)
          	       
            axios.get(`https://glacial-earth-67440.herokuapp.com/api/v1/channels/${id}`, {headers: {'Authorization': `Bearer ${token}`}})
            .then(res =>{                  
                setChannel(res.data.channel)    
                console.log(res)
            })           
        }
        getData(id)
      },[id, setChannel]);
    
    console.log(id)

  
    function handleChange(event) {
        setMsg(event.target.value)
      }
     function handleSubmit(event) {
       console.log(chatbox.current)
       let type = by[Math.floor(Math.random() * by.length)]
        let user = JSON.parse(localStorage.getItem("user"))
        msgList.push(msg)
        const newMsg = {
            channelId: id,
            userId: user.id,           
            message: msg
        }
        console.log(newMsg)
        axios.post(`https://glacial-earth-67440.herokuapp.com/api/v1/messages`, newMsg, {headers: {'Authorization': `Bearer ${token}`}})
        .then(res =>{                  
            // setChannel(res.data.channel)    
            console.log(res.data)
        })        
        setDisqus([...disquses, newMsg])    
        scrollToBottom()
        setMsg('')       
      
        event.preventDefault();
      }
  return (
    <div className="chat content" >      
    <div className="contact-profile" style={{display: 'flex', justifyContent:'flex-start', paddingLeft:'10px'}}>
        <div className="drop" >  
            <i className="fa fa-cog dropdown-toggle " data-toggle="dropdown" id="dropdownMenu1" aria-haspopup="true" aria-expanded="false"></i>		
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1" style={{bottom: '', paddingLeft: '10px'}} >
                <li className="message-li"><a className='text-dark'  href="#">New Conversation</a></li>
                <li className="message-li"><EditChannel id={id} /></li>
                <li className="message-li"><a className='text-dark'  href="#"><DeleteChannel id={id} /></a></li>
                <li className="message-li"> <AddPeople /> </li>               
                           
            </ul>
        </div>
            <p style={{marginLeft: '15px'}}>{channel && channel.name}</p>                 
      
    </div>
    <div  className="messages">
        <ul>
            {disquses.map((message,i) => (
                <li key={i} className={message.type}>
                    <img src="https://ca.slack-edge.com/TQHUN32CR-US2EW3C4D-g0a639bf1457-192" alt="" />
                    <p>{message.text}    <span className="dropdown-toggle pl-3" data-toggle="dropdown" id="dropdownMenu1" aria-haspopup="true" aria-expanded="false"></span>		
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1" style={{bottom: '', paddingLeft: '10px'}} >              
                <li style={{height: '20px'}} className="message-li"><a className='text-dark'  href="#">Edit Message</a></li>
                <li  style={{height: '20px'}} className="message-li"> <a className='text-dark'  href="#">Delete Message</a> </li>               
                           
            </ul></p>
                </li>

            ))}
           
        </ul>
    <div style={{ float:"left", clear: "both", height:'30px', width: '100%' }}
             ref={(el) => { messagesEnd = el; }}>
    </div>
    </div>
    <div className="message-input">
        <div className="wrap">
        <form onSubmit={handleSubmit}>
        <input type="text" value={msg} onChange={handleChange} placeholder="Write your message..." />    
 
        <i className="fa fa-paperclip attachment" aria-hidden="true"></i>
        <button type="submit" className="submit"><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
        </form>
        </div>
    </div>
</div>
       


  );
}

export default Messages;