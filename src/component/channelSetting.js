import React, {useState, useEffect} from 'react';


import { Button, Modal, Form, Tabs, Tab, Card, Table } from 'react-bootstrap';
 import axios from 'axios'
import UpdateUser from './updateUser';




function ChannelSettings() {
  let token = localStorage.getItem('token')
  let currUser = JSON.parse(localStorage.getItem("user"))
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({})
  const [users, setUsers] = useState([])
  const handleClose = () => setShow(false);
  const toggleAdmin = (user) =>{
    let bool = () => user.isAdmin ? 'unsetAdmin' : 'setAdmin'
    console.log(bool(), 'isAdmin')
    console.log(user)
    axios.post(`https://glacial-earth-67440.herokuapp.com/api/v1/users/${bool()}`,{_id: user._id}, {headers: {'Authorization': `Bearer ${token}`}})
    .then(res =>{                 
        
        console.log(res) 
        getUsers() 
    })   
   
  }
  const getUsers = () =>{
    axios.get(`https://glacial-earth-67440.herokuapp.com/api/v1/users/`, {headers: {'Authorization': `Bearer ${token}`}})
    .then(res =>{                  
        setUsers(res.data.users)
        console.log(res)  
    })     
  }
  useEffect(() => {    
      getUsers()  
    axios.post(`https://glacial-earth-67440.herokuapp.com/api/v1/users/details`, {_id: currUser.id}, {headers: {'Authorization': `Bearer ${token}`}})
            .then(res =>{                  
                setUser(res.data.user)
                console.log(res)  
            })     
  
  },[]);


  const handleShow = () => setShow(true);
  
  return (
    <>    
    
      <button onClick={handleShow} id="settings"><i className="fa fa-cog fa-fw" aria-hidden="true"></i> <span>Settings</span></button>

      <Modal show={show} onHide={handleClose}>
      <Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example" className="pt-3 pl-3 pr-3">
  <Tab eventKey="home" title="User Profile">
    <div className="container mt-3 mb-5">
    <div className="row">
    <div className="col-md-4">
    <Card>
    <Card.Img variant="top" src="https://ca.slack-edge.com/TQHUN32CR-US2EW3C4D-g0a639bf1457-192" />  
    </Card>
    </div>
    <div className="col-md-8">
            <Card> 
        <Card.Body>
  <Card.Title>{user.username} </Card.Title>
            <Card.Text>
                Fullname : {user.firstName} {user.lastName}
            </Card.Text>           
            <Card.Text>
                Username : {user.username} 
            </Card.Text>           
            <Card.Text>
                Email : {user.email}
            </Card.Text>
            <Card.Text>
                Phone : {user.phone}
            </Card.Text>
            <Card.Text>
                Bio : {user.bio}
            </Card.Text>           
        </Card.Body>
        </Card>

    </div>
    </div>
        
    </div>
  </Tab>
  <Tab eventKey="profile" title="Edit Profile">
    <UpdateUser user={user} />
  </Tab>
  <Tab eventKey="contact" title="Settings" >
    <div className="container mt-2">
    <Table striped bordered hover>
  <thead style={{background: 'black', color:'white'}}>
    <tr>
      <th>#</th>
      <th>User</th>
      <th>Admin</th>
      <th>Add/Remove as Admin</th>
    </tr>
  </thead>
  <tbody>
      {users.map((user, i)=>(
        <tr key={i}>
        <td>{i + 1}</td>
        <td>{user.username}</td>
        <td>{user.isAdmin ? 'Yes' : 'No'}</td>
        <td><Button onClick={() => toggleAdmin(user)} variant="dark">Toggle Admin</Button></td>
        </tr>

      ))}
  
  </tbody>
</Table>
    </div>
  </Tab>
</Tabs>
      </Modal>

    </>
  );
}

export default ChannelSettings;
