import React, {useState, useEffect} from 'react';
import chatcss from './chat.css'
import { useHistory } from "react-router-dom";
import {Link,  } from 'react-router-dom'
import axios from 'axios';



function Channels({user,channel, switchChannel}) {  
  let history = useHistory();
  let [channelList, setChannelList] = useState([])
	let usera = JSON.parse(localStorage.getItem("user"))
	
  const getData = () =>{
	let token = localStorage.getItem('token')	
	  axios.get(`https://glacial-earth-67440.herokuapp.com/api/v1/channels/`, {
		headers: {
		  'Authorization': `Bearer ${token}`
		}
	  })
	  .then(res => {	 
		setChannelList(res.data.channels)
	  })

  }
  getData()
  useEffect(()=>{
	  getData()
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
         <div id="sidepanel">
		<div id="profile">
			<div className="wrap">
				<img id="profile-img" src="https://lh3.googleusercontent.com/a-/AOh14GgPxle11ueE5CXJGGxVNcSZ91iZTRObMwHBGhH0vQ=s192-cc-rg" className="online" alt="" />
				<p>{usera.username}</p>
				
				<div id="status-options">
					<ul>
						<li id="status-online" className="active"><span className="status-circle"></span> <p>Online</p></li>
						<li id="status-away"><span className="status-circle"></span> <p>Away</p></li>
						<li id="status-busy"><span className="status-circle"></span> <p>Busy</p></li>
						<li id="status-offline"><span className="status-circle"></span> <p>Offline</p></li>
					</ul>
				</div>
			
			</div>
		</div>	
		<div id="contacts">
			<ul>
                { channelList.map((ch) =>{                    
                     return(
						 <Link  key={ch._id} className="chanel-name"  to={`/chat/${ch._id}`}>
					 	<li>
							<div className="channels">							
								<i className="fa fa-hashtag"></i>							
								<p className="name">{ch.name}</p>									
								{/* <i className="fa fa-times-circle pt-2"  data-toggle="tooltip" data-placement="top" title="Tooltip on top"></i>							 */}
							</div>
						</li>
						 </Link>
				
				)
            })}				
			</ul>
   
   </div>
			{/* <button id="addcontact" ><i className="fa fa-user-plus fa-fw" aria-hidden="true"></i> <span>Create Channel</span></button> */}   
	<div id="bottom-bar" className="dropup">
		<button id="addcontact" className=" btn-default dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				<i className="fa fa-user-plus fa-fw" aria-hidden="true"></i> <span>Create Channel</span>
		</button>
		<button id="settings"><i className="fa fa-cog fa-fw" aria-hidden="true"></i> <span>Settings</span></button>
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