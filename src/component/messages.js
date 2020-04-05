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
    const [msgOwner, setmsgOwner] = useState({})
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
   const author = async (id) =>{
    let promise = await axios.post(`https://glacial-earth-67440.herokuapp.com/api/v1/users/details`, {_id: id},{headers: {'Authorization': `Bearer ${token}`}})
    let {data} = await promise
    return  data
   }
    
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
            let arr = res.data.messages.filter(e => !e.conversationId)
            console.log(arr)
            tempStore = arr
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
        console.log((author(msg.userId)))
        let body = {
            title: msg.message,
            channelId: id,
            messageId: msg._id
        }
        axios.post(`https://glacial-earth-67440.herokuapp.com/api/v1/users/details`, {_id: msg.userId},{headers: {'Authorization': `Bearer ${token}`}})
        .then(res =>{         
                console.log(res.data)
                setmsgOwner(res.data.user)

               })
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
    <div className="main" > 
    <div className="chatbox" > 
        <div className="title-bar">
            <a  data-toggle="dropdown" id="dropdownMenu1" aria-haspopup="true" aria-expanded="false"><i className="fa fa-cog"></i> </a> &nbsp;  &nbsp;
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1" style={{bottom: '', paddingLeft: '10px'}} >
                <li className="message-li"><EditChannel id={id} /></li>
                <li className="message-li"><DeleteChannel id={id} /></li>
                <li className="message-li"> <AddPeople /> </li>               
                <li onClick={Logout} className="message-li"><a className='text-dark'  href="#">Log Out</a></li>
                           
            </ul>
            <a className="channel-title" href=""> {channel && channel.name}</a>

        </div>
        <div id="scrollDiv" className="messages">
            {disquses && disquses.map((message, i) => {
                    return (
                        <>
                            {message.userId == user.id ? (
                                <div className="sent">
                                <div>
                                    <p>{message.message} &nbsp;
                                    <span className="dropdown-toggle" data-toggle="dropdown" id="dropdownMenu" aria-haspopup="true" aria-expanded="false"></span>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1" style={{bottom: '', paddingLeft: '10px'}} >            
                                        <li onClick={() => updateMessage(message.message, message._id)} style={{height: '20px'}} className="message-li msg"> <a className='text-dark'  href="#">Edit Message</a> </li>               
                                        <li onClick={() => deleteMessage(message._id)} style={{height: '20px'}} className="message-li msg"> <a className='text-dark'  href="#">Delete Message</a> </li>           
                                        <li onClick={() => openConversation(message)} style={{height: '20px'}} className="message-li msg"> <a className='text-dark'  href="#">Start Conversation</a> </li>           
                                                
                                    </ul>
                                    </p>
                                    <div className="emoji-container">
                                        <Reaction emojis={message.emojis} channel ={message._id} token={token} />
                                       
                                    </div>
                                    
                                </div>
                                <img src="https://ca.slack-edge.com/TQHUN32CR-US2EW3C4D-g0a639bf1457-192" alt="" />
        
                            </div>
                        ) : (
                            <div className="replies">
                            <img src="https://ca.slack-edge.com/TQHUN32CR-US2EW3C4D-g0a639bf1457-192" alt="" />
                            <div>
                                <p >{message.message} &nbsp;
                                        <span className="dropdown-toggle" data-toggle="dropdown" id="dropdownMenu" aria-haspopup="true" aria-expanded="false"></span>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenu1" style={{bottom: '', paddingLeft: '10px'}} >            
                                            <li onClick={() => openConversation(message)} style={{height: '20px'}} className="message-li msg"> <a className='text-dark'  href="#">Start Conversation</a> </li>           
                                        </ul>
                                </p>
                                <div className="emoji-container-replies">
                                    <Reaction emojis={message.emojis} channel ={message._id} token={token} />                                       
                                </div>
                            </div>
                            
                        </div>
                        )}
                        </>
                    )
            })}
        </div>  
        <form onSubmit={handleSubmit} class="post">
            <input type="text" value={msg} onChange={handleChange} placeholder="write your message" class="input-msg" />
            <button class="post-msg" href=""><i class="fa fa-paper-plane"></i></button>
        </form>  
        </div>
        {showConversation  ? 
            <div className="conversation">
                <div className="conversation-title">                    
                    <div className="thread-title">
                        <a href="">Conversation</a>
                        <small>{msgOwner.username}</small>
                    </div>
                    <a className="close-conversation" href="">X</a>

                </div>
                {msgThread !=  null ?
                    <> 
                    <div className="conversations">
                        <img src="https://ca.slack-edge.com/TQHUN32CR-US2EW3C4D-g0a639bf1457-192" alt="" />
                        <div className="conversation-msg">
                            <a href="" className="sender"> {msgOwner.username} </a>
                            <p>  {msgThread.message} </p>
                        </div>
                    </div>
                    <div className="conversations">
                    <p className="num-replies"> {conversations.length + ' reply'} </p>
                        <div className="underline">
                        
                        </div>
                    </div>
                    {conversations && conversations.map((thread, i) => (
                          <>
                            <div className="conversations">
                                <img src="https://ca.slack-edge.com/TQHUN32CR-US2EW3C4D-g0a639bf1457-192" alt="" />
                                <div className="conversation-msg">
                                    <a href="" className="sender"> Anonymous </a>
                                    <p> {thread.message} </p>
                                </div>
                            </div>
                          </>

                    ))}
                            <form onSubmit={postConversation} class="post">
                                <input type="text"  value={newConverse} onChange={conversationChange}  placeholder="write your message" class="input-msg" />
                                <button class="post-msg" href=""><i class="fa fa-paper-plane"></i></button>
                            </form>
                </>
                :''
            
                
                }


            </div>  
        : ''}
 

  
  
</div>
       


  );
}

export default Messages;