import React, { useState, createRef, useEffect } from 'react';
import chatcss from './chat.css'
import { useHistory } from "react-router-dom";
import axios from 'axios';
import ScrollToBottom from 'react-scroll-to-bottom';
import { css } from 'glamor';
import AddPeople from './addPeople';
import EditChannel from './channel/EditChannel';
import DeleteChannel from './channel/DeleteChannel';
import Picker from 'emoji-picker-react';
import Reaction from './reaction';
import { animateScroll } from "react-scroll";
import io from "socket.io-client";
const ROOT_CSS = css({
    height: 400,
   
  });
let socket;

// {
//     "message": "Conversation with that messageId already exists.",
//     "conversationId": "5e870b0c9be0540017285166"
// }

function Messages({ selected, channels}) {
    const [endPoint, setendPoint] = useState('https://glacial-earth-67440.herokuapp.com/')
	socket = io(endPoint, {transports: ['websocket']});
    let tempStore = null
    let scroll = false
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
    const [conversationId, setConversationId] = useState('')
    const [showConversation, setshowConversation] = useState(false)
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
        console.log('container scroll')
        animateScroll.scrollToBottom({
          containerId: "scrollDiv"
        });
    }

   
 
    const [channel, setChannel] = useState({})
   
    
    /**
     * get messages under channel
     * @param {channelId} id 
     */

    function  getData  (id){
        console.log(id)          	       
        axios.post(`https://glacial-earth-67440.herokuapp.com/api/v1/channels/messages`, {_id: id}, {headers: {'Authorization': `Bearer ${token}`}})
        .then(res =>{                  
            setChannel(res.data.channel)   
            let data = {
                channelId: res.data.channel._id,
                name: user.username,
            }
            console.log(data)
            tempStore = res.data.messages
            if(tempStore.length > 0){
                setDisqus(tempStore) 
                scrollToBottom()
               scroll = true
          
             
            }
            console.log(tempStore)
            console.log(scroll)
            console.log(res.data.messages.length)
        })           
    }
    useEffect(() => {
        getData(id)
        scrollToBottom()
        socket.emit("join", {channelId: id, name: user.username} )
            socket.on("joinMessage", (data) => {
                console.log(data)
            })
        socket.on("joinMessage", (data) => {
            console.log(data)
        })  
        console.log(scroll)     
      
        return () => {
            socket.emit("disconnect")
            socket.off()
          };
        
      },[id, setChannel]);
     
      useEffect(() => {
        socket.on('sendMessageConfirmed', (data) => {         
             scrollToBottom()
             console.log(tempStore)
             setDisqus([...tempStore, data.message])
            // getData(id)
            
        })
      }, [disquses]);

    /**
     * update a message
     * @param {string} msg 
     * @param {string} id 
     */
  
    function updateMessage(msg,id){
        setMsg(msg)
        setnewUpdateId(id)
        console.log(messagesEnd)
        scrollToBottom()
    }

    /**
     * post a new message under conversation
     * @param {object} event 
     */

    function postConversation(event){
        const newMsg = {
            channelId: id,            
            userId: user.id,   
            conversationId: conversationId,           
            message: newConverse
        }
        console.log(msgThread)
        console.log(newMsg)
        axios.post(`https://glacial-earth-67440.herokuapp.com/api/v1/messages`, newMsg, {headers: {'Authorization': `Bearer ${token}`}})
        .then(res =>{                  
            // setChannel(res.data.channel) 
            //
            console.log(res.data)
        })
        setConversations([...conversations, newMsg]) 
        setNewConverse('')       
        console.log(newMsg)
        event.preventDefault();
    }

    /**
     * create or open an existing conversation
     * @param {object} msg 
     */
    function openConversation(msg){
        console.log(msg)
        let body = {
            title: msg.message,
            channelId: id,
            messageId: msg._id
        }
        axios.post(`https://glacial-earth-67440.herokuapp.com/api/v1/conversations`, body, {headers: {'Authorization': `Bearer ${token}`}})
            .then(res =>{                
               
                    let conversationId = res.data.conversationId                    
                    if(conversationId){
                       setConversationId(conversationId)
                    }else if(res.data.createdConvo){
                        setConversationId(res.data.createdConvo._id)
                    }
                    console.log('messageId', msg._id)
                   
                    axios.post(`https://glacial-earth-67440.herokuapp.com/api/v1/conversations/messages`, {messageId: msg._id}, {headers: {'Authorization': `Bearer ${token}`}})
                    .then(res =>{   
                        console.log(res)
                        setConversations(res.data.messages)
                       }) 

                    console.log(res.data)
        })  
        setshowConversation(true)
        console.log(showConversation)
        setMsgThread(msg)
    }

   /**
    * Logout user
    */
    const Logout = () =>{
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        history.push('/login')
    }
    /**
     * delete a message
     * @param {object} msg 
     */
    function deleteMessage(msg){
        console.log('delete', msg)
        axios.delete(`https://glacial-earth-67440.herokuapp.com/api/v1/messages`,{headers: {'Authorization': `Bearer ${token}`}, data: {_id: msg}})
        .then(res =>{                  
            // setChannel(res.data.channel)    
            console.log(res.data)
            getData(id)
        }).catch(error =>{
            console.log(error.response.data)
        })      
    }
    
    /**
     * handle input change
     * @param {DOM Event} event 
     */
    function handleChange(event) {
        setMsg(event.target.value)
      }

     /**
     * handle input change for conversation
     * @param {DOM Event} event 
     */
    function conversationChange(event) {
        console.log(event.target.value)
        setNewConverse(event.target.value)
      }

    
       /**
     * post new and update message
     * @param {DOM Event} event 
     */
     function handleSubmit(event) {  
        scrollToBottom()         
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
            setDisqus([...disquses, newMsg])    
           axios.post(`https://glacial-earth-67440.herokuapp.com/api/v1/messages`, newMsg, {headers: {'Authorization': `Bearer ${token}`}})
           .then(res =>{                  
               // setChannel(res.data.channel) 
               let data = {
                   channelId : id,
                   ...res.data.data[2],
                   ...res.data.data[1]
               } 
               console.log(res.data.data)  
               console.log(data)
               socket.emit("sendMessage", data)
           })  
        
      
           console.log(newMsg)
          

       }

        
        setMsg('')       
      
        event.preventDefault();
      }


  return (
    <div className="chat content" >      
    <div className="contact-profile" style={{display: 'flex', justifyContent:'flex-start', paddingLeft:'10px'}}>
        <div className="drop" >  
            <i className="fa fa-cog " data-toggle="dropdown" id="dropdownMenu1" aria-haspopup="true" aria-expanded="false"></i>		
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1" style={{bottom: '', paddingLeft: '10px'}} >
                <li className="message-li"><EditChannel id={id} /></li>
                <li className="message-li"><DeleteChannel id={id} /></li>
                <li className="message-li"> <AddPeople /> </li>               
                <li onClick={Logout} className="message-li"><a className='text-dark'  href="#">Log Out</a></li>
                           
            </ul>
        </div>
            <p style={{marginLeft: '15px'}}>{channel && channel.name}</p>                 
      
    </div>
    <div  style={{display: 'flex', flexDirection:'row'}} className="holder">
    <div id="scrollDiv" className="messages" style={{flex: '70%'}}>
        <ul>
          
            {disquses && disquses.map((message, i) => {

                return (
                 <div    key={i}>
                  
                {message.userId != user.id ? ( 
                    <li className="sent msg">
                <img src="https://ca.slack-edge.com/TQHUN32CR-US2EW3C4D-g0a639bf1457-192" alt="" /> 
                <p>{message.message} </p>
                <p className="pickemoji"> <Reaction emojis={message.emojis} channel ={message._id} token={token} /></p>          
            </li>) :  <li className= "replies msg">
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

                )
            })}
        </ul>
    </div>
    {showConversation  ? <div   style={{flex: '30%', boxSizing:'border-box'}}>       
        <div style={{display:'flex', width: '100%', height:'40px', background: 'white', justifyContent:'space-between', paddingTop: '3px'}}>
            <h5 className="pl-2">Conversation</h5>
            <h5 className="pr-1 text-dark"><a onClick={() => setshowConversation(false)} style={{}}  className="text-dark" href="#">  <i className="fa fa-times" aria-hidden="true"></i></a> </h5>            
            </div>
            {msgThread !=  null ? 
            <div className="messages ">
                <ul className="container">
                <li className="replies mt-2 mb-2 row">
                <img  style={{float:'right', width: '25px', height: '25px'}}  src="https://ca.slack-edge.com/TQHUN32CR-US2EW3C4D-g0a639bf1457-192" alt="" />                
                <p style={{padding: '7px 1px', direction: 'ltr'}} >                  
                    {msgThread.message} </p>                    
                </li> 
                {conversations && conversations.map((thread, i) => (
                    <li className="sent" >                       
                    <p style={{padding: '7px 3px', background:"#f1f1f1", color: "#6c757d"}} >{thread.message} </p>                        
                    <img style={{float:'right', width: '25px', height: '25px'}} src="https://ca.slack-edge.com/TQHUN32CR-US2EW3C4D-g0a639bf1457-192" alt="" /> 
                    </li> 

                ))}
               
                </ul>
                <div style={{display:'flex', width: '100%'}}>
            <form style={{display:'flex', width: '100%', marginTop:"10px"}} onSubmit={postConversation}>
        <input type="text" value={newConverse} onChange={conversationChange} placeholder="Write your message..." />    
 
      
        <button type="submit" className="btn btn-secondary" style={{height: '40px'}}><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
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