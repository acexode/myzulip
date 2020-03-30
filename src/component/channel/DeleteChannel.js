import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios'
import { Button, Modal, Form } from 'react-bootstrap';
 




function DeleteChannel({id}) {  
    const [show, setShow] = useState(false);   
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
 
    function handleSubmit(event) {  
        let token = localStorage.getItem('token')	
        const obj = {
            _id: id                
    }
    console.log(obj)
	
	axios.delete(`https://glacial-earth-67440.herokuapp.com/api/v1/channels/`,  obj, {
		headers: {
		  'Authorization': `Bearer ${token}`
    }} )
	.then(res => {
	  console.log(res);
	  console.log(res.data);
	})
    handleClose()
	event.preventDefault();
  }
  return (
    <> 
    
    <a href="#"  className='text-dark'  onClick={handleShow}>
    Delete Channel 
      </a>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
  <Modal.Title>Delete Channel </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Are you sure you want to delete this channel</p>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleSubmit}>
           Delete
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}

export default DeleteChannel;
