import React, {useState, useEffect} from 'react';
import chatcss from './chat.css'
import { useHistory } from "react-router-dom";
import {Link,  } from 'react-router-dom'
import axios from 'axios';
import ChannelSettings from './channelSetting';



function Channels({user,channel, switchChannel}) {  


	// socket.emit("join", sample)
	var colors= ['#009688','#9c27b0','#ff9800','#e91e63','#03a9f4','#4caf50','#f44336'];
  let history = useHistory();
  let [channelList, setChannelList] = useState([])
  const [bgColor, setbgColor] = useState('')
  let bg  = colors[Math.floor(Math.random() * colors.length)]
	let usera = JSON.parse(localStorage.getItem("user"))
	const acronym_name = (str) => {
		var regular_ex=/\b(\w)/g;
		var matches = str.match(regular_ex);
		var acronym = matches.join('').slice(0,2);
		bg = colors[Math.floor(Math.random() * colors.length)]
		// setbgColor(bg)
		//return the acronym
		return acronym;
	}
  const getData = () =>{
	let token = localStorage.getItem('token')	
	  axios.post(`https://glacial-earth-67440.herokuapp.com/api/v1/channels/user`, {_id: usera.id}, {
		headers: {
		  'Authorization': `Bearer ${token}`
		}
	  })
	  .then(res => {	 
		console.log(res.data)
		setChannelList(res.data.channels)
	  })

  }

  useEffect(()=>{	
	  getData()
	  return (() =>{
		  console.log('cleared')
	  })
  },[])
  
  let [newChannel, setNewChannel] = useState({name: '',description: ''})

//   handle form input change
  function handleChange(e) {
	const {name , value} = e.target
    setNewChannel({
        ...newChannel,
        [name] : value
    })
  }

  // submit form
 function handleSubmit(event) {  	
	const obj = {
		name: newChannel.name,
		description: newChannel.description		
	}
	
	axios.post(`https://glacial-earth-67440.herokuapp.com/api/v1/channels/`,  obj, {} )
	.then(res => {
	  console.log(res);
	  console.log(res.data);
	})	
	setNewChannel({name: '',description: ''})

	event.preventDefault();
  }

  function goto(loc){	 
	let newPath = history.location.pathname
	if(newPath.length > 5){

	}
	
	newPath = newPath.replace(newPath, `/chat/${loc}`)

	 history.goBack(1)
  }
  return ( 
         <div className="channelList">
			 <div className="user">
                <div className="img-container">
                    <img src="https://lh3.googleusercontent.com/a-/AOh14GgPxle11ueE5CXJGGxVNcSZ91iZTRObMwHBGhH0vQ=s192-cc-rg" alt="" />
                </div>
                <p>{usera.username}</p>
            </div>
			<div class="channels">
                <ul id="list">
				{ channelList.map((ch) =>{ 
					 return(
						<Link  key={ch._id}   to={`/chat/${ch._id}`}>
						<li className="channel">						  
						<div style={{background:`${bg}`}} className="acronyms">
							{acronym_name(ch.name)}
						</div>
						<div class="name" > <p className="name">{ch.name}</p> </div>
					   </li>
						</Link>
					 )

				})}	
                   
                </ul>
            </div>		
			<div className="bottom-buttons dropup">
                <a className=" btn-default dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href=""><i className="fa fa-user-plus"></i> Create Channel</a>
                <ChannelSettings />
				
				<form onSubmit={handleSubmit}>
					<ul style={{background: 'transparent', border:'none'}} className="dropdown-menu" aria-labelledby="dropdownMenu2">
						<li><input className="form-control" type="text" name="name" value={newChannel.name} onChange={handleChange}  placeholder="Name" /></li>
						<li><input className="form-control" type="text" name="description" value={newChannel.description} onChange={handleChange}  placeholder="Description" /></li>
						<li>
							<button style={{display: "None"}} type="submit">Submit</button>
						</li>
						
					</ul>
				</form>
            </div>
  
    </div>
  );
}

export default Channels;