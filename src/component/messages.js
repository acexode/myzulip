import React, { useState, createRef, useEffect } from 'react';
import chatcss from './chat.css'
import { useHistory } from "react-router-dom";
import axios from 'axios';
// import { Editor } from 'react-draft-wysiwyg';
import editor from './editor.css'
import AddPeople from './addPeople';
import EditChannel from './channel/EditChannel';
import DeleteChannel from './channel/DeleteChannel';
import Picker from 'emoji-picker-react';
import Reaction from './reaction';
import { Navbar, Container, Row, Col } from 'react-bootstrap';
window.HTMLElement.prototype.scrollIntoView = function() {};

  
function Messages({ selected, channels}) {
    let token = localStorage.getItem('token')
    let user = JSON.parse(localStorage.getItem("user"))
   
    let messagesEnd = createRef()
    

    // current location 
    let history = useHistory()
    let path = history.location.pathname.lastIndexOf('/') +1
    let id = history.location.pathname.slice(path)     
    
    const [msg,setMsg] = useState('')
    const [newConverse,setNewConverse] = useState('')
    const [canScroll, setcanScroll] = useState(false)
    const [disquses, setDisqus] = useState([])
    const [conversations, setConversations] = useState([])
    const [showConversation, setshowConversation] = useState(true)
    const [msgThread, setMsgThread] = useState(null)
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const [emojiToggle, setEmojiToggle] = useState(false)
    const [newUpdateId, setnewUpdateId] = useState('')
    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
    }
    const showEmoji = (e) => {
        console.log(e.target.value)
        // alert(emojiToggle);
        setEmojiToggle(!emojiToggle)
    }
    // scroll to bottom
    const scrollToBottom = () => {
        console.log('scrollimg')
        messagesEnd.scrollIntoView({ behavior: "smooth" }); 
    }
   
    //fetch channel data
    const [channel, setChannel] = useState({})
    
    // getData(id)
    function  getData  (id){
        console.log(id)          	       
        axios.post(`https://glacial-earth-67440.herokuapp.com/api/v1/channels/messages`, {_id: id}, {headers: {'Authorization': `Bearer ${token}`}})
        .then(res =>{                  
            setChannel(res.data.channel)   
            setDisqus(res.data.messages) 
            if(res.data.messages.length > 0){
                setcanScroll(true)
            }
            console.log(res)
            console.log(res.data.messages.length)
        })           
    }
    useEffect(() => {
        getData(id)
        console.log(messagesEnd)
        console.log('msg len',disquses)
        if(canScroll){
            console.log('msg len',disquses.length)

            scrollToBottom()

        }
      },[id, setChannel]);
  
    function updateMessage(msg,id){
        setMsg(msg)
        setnewUpdateId(id)
        console.log(messagesEnd)
        scrollToBottom()
    }
    function postConversation(){

    }
    function openConversation(msg){
        console.log(msg)
        setshowConversation(true)
        setMsgThread(msg)
    }
    function deleteMessage(msg){
        console.log('delete', msg)
        axios.delete(`https://glacial-earth-67440.herokuapp.com/api/v1/messages`,{headers: {'Authorization': `Bearer ${token}`}, data: {_id: msg}})
        .then(res =>{                  
            // setChannel(res.data.channel)    
            console.log(res.data)
            getData(id)
        }).catch(error =>{
            console.log(error.response)
        })      
    }
  
    function handleChange(event) {
        setMsg(event.target.value)
      }
     function handleSubmit(event) {           
       if(newUpdateId.length > 0){
        let editedMsg = {
            _id: newUpdateId,
            message: msg
        }
        console.log(editedMsg)
        axios.put(`https://glacial-earth-67440.herokuapp.com/api/v1/messages`, editedMsg, {headers: {'Authorization': `Bearer ${token}`}})
        .then(res =>{                  
            // setChannel(res.data.channel) 
            setnewUpdateId('') 
            getData(id)  
            console.log(res.data)
        })       
       }else{
           const newMsg = {
               channelId: id,
               userId: user.id,           
               message: msg
           }
           axios.post(`https://glacial-earth-67440.herokuapp.com/api/v1/messages`, newMsg, {headers: {'Authorization': `Bearer ${token}`}})
           .then(res =>{                  
               // setChannel(res.data.channel)    
               console.log(res.data)
           })        
           console.log(newMsg)
           setDisqus([...disquses, newMsg])    

       }

        // scrollToBottom()
        setMsg('')       
      
        event.preventDefault();
      }
  return (
    <div className="chat content" >      
    <div className="contact-profile" style={{display: 'flex', justifyContent:'flex-start', paddingLeft:'10px'}}>
        <div className="drop" >  
            <i className="fa fa-cog " data-toggle="dropdown" id="dropdownMenu1" aria-haspopup="true" aria-expanded="false"></i>		
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1" style={{bottom: '', paddingLeft: '10px'}} >
                <li className="message-li"><a className='text-dark'  href="#">New Conversation</a></li>
                <li className="message-li"><EditChannel id={id} /></li>
                <li className="message-li"><DeleteChannel id={id} /></li>
                <li className="message-li"> <AddPeople /> </li>               
                           
            </ul>
        </div>
            <p style={{marginLeft: '15px'}}>{channel && channel.name}</p>                 
      
    </div>
    <div  style={{display: 'flex', flexDirection:'row'}} className="holder">
    <div className="messages" style={{width: '70%'}}>
        <ul>
            {disquses.map((message, i) => (
                <div>
                {message.userId != user.id ? ( 
                    <li key={i} className="sent msg">
                <img src="https://ca.slack-edge.com/TQHUN32CR-US2EW3C4D-g0a639bf1457-192" alt="" /> 
                <p>{message.message} </p>
                <p className="pickemoji"> <Reaction channel ={message._id} token={token} /></p>          
            </li>) :  <li key={i} className= "replies msg">
            <img src="https://ca.slack-edge.com/TQHUN32CR-US2EW3C4D-g0a639bf1457-192" alt="" />                  
                   
            <p>{message.message}   <span className="dropdown-toggle" data-toggle="dropdown" id="dropdownMenu" aria-haspopup="true" aria-expanded="false"></span>	
        <ul className="dropdown-menu" aria-labelledby="dropdownMenu1" style={{bottom: '', paddingLeft: '10px'}} >            
        <li onClick={() => updateMessage(message.message, message._id)} style={{height: '20px'}} className="message-li msg"> <a className='text-dark'  href="#">Edit Message</a> </li>               
        <li onClick={() => deleteMessage(message._id)} style={{height: '20px'}} className="message-li msg"> <a className='text-dark'  href="#">Delete Message</a> </li>           
        <li onClick={() => openConversation(message)} style={{height: '20px'}} className="message-li msg"> <a className='text-dark'  href="#">Start Conversation</a> </li>           
                 
    </ul>
    
    </p>
    <p className="pickemoji"> <Reaction channel ={message._id} /></p>
      
           <div style={{ float:"left", clear: "both" }}
                ref={(el) => { messagesEnd = el; }}>
        </div>
        
        </li>}
               
        </div>
            ))}
        </ul>
    </div>
    {showConversation && canScroll ? <div   style={{width: '30%'}}>       
        <div style={{display:'flex', width: '100%', height:'40px', background: 'white', justifyContent:'space-between'}}>
            <h4>Conversation</h4>
            <h4><a onClick={() => setshowConversation(false)} style={{}}  className="text-black" href="#">  <i className="fa fa-times" aria-hidden="true"></i></a> </h4>            
            </div>
            {msgThread !=  null ? 
            <div className="messages mt-3">
                <ul>
                <li className="replies">
                <img  src="https://ca.slack-edge.com/TQHUN32CR-US2EW3C4D-g0a639bf1457-192" alt="" /> 
                <p >{msgThread.message} </p>
                    
                </li> 
                Replies <hr/> 
                <li className="sent">
                <img  src="https://ca.slack-edge.com/TQHUN32CR-US2EW3C4D-g0a639bf1457-192" alt="" /> 
                <p >{msgThread.message} </p>
                    
                </li> 
                </ul>
                <div style={{display:'flex', width: '100%'}}>
            <form style={{display:'flex', width: '100%', marginTop:"10px"}} onSubmit={postConversation}>
        <input type="text" value={newConverse} onChange={handleChange} placeholder="Write your message..." />    
 
      
        <button type="submit" className="btn btn-secondary"><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
        </form>
            </div>
            </div> : ''
            
            }
           
            
        
        </div> : '' } 
    

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