import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Link, useHistory } from "react-router-dom";

import { Button, Modal, Form } from 'react-bootstrap';
 import axios from 'axios'




function AddPeople() {
  let token = localStorage.getItem('token')
  let history = useHistory() 
    let path = history.location.pathname.lastIndexOf('/') +1
    let id = history.location.pathname.slice(path)  
  const [show, setShow] = useState(false);
  const [email, setemail] = useState('')
  const handleClose = () => setShow(false);
  const handleSubmit = () =>{
    console.log(email)
    axios.post(`https://glacial-earth-67440.herokuapp.com/api/v1/channels/user/add`, {email: email, _id: id}, {headers: {'Authorization': `Bearer ${token}`}})
            .then(res =>{                  
              
                console.log(res)
                setemail('')
                handleClose()
            })     
  }
  const handleShow = () => setShow(true);
  
  return (
    <> 
    
    <a href="#"  className='text-dark'  onClick={handleShow}>
       Add People
      </a>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add  People</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
        <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" onChange={(e) => setemail(e.target.value)} placeholder="Email" />            
        </Form.Group>
        </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add User
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}

export default AddPeople;
