import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios'
import { Button, Modal, Form } from 'react-bootstrap';
 




function EditChannel({id}) {  
    const [show, setShow] = useState(false);
    let [channel, setChannel] = useState({name: '',description: ''})
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function handleChange(e) {
	const {name , value} = e.target
    setChannel({
        ...channel,
        [name] : value
    })
  }
  function handleSubmit(event) {  
    let token = localStorage.getItem('token')	
	const obj = {
        _id: id,
		name: channel.name,
		description: channel.description		
    }
    console.log(obj)
	
	axios.put(`https://glacial-earth-67440.herokuapp.com/api/v1/channels/`,  obj, {
		headers: {
		  'Authorization': `Bearer ${token}`
    }} )
	.then(res => {
	  console.log(res);
	  console.log(res.data);
	})	
	setChannel({name: '',description: ''})
    handleClose()
	event.preventDefault();
  }
  return (
    <> 
    
    <a href="#"  className='text-dark'  onClick={handleShow}>
    Edit Channel 
      </a>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
  <Modal.Title>Edit Channel </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
        <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" value={channel.name} onChange={handleChange} placeholder="Name" />            
        </Form.Group>
        <Form.Group controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" name="description" value={channel.description} onChange={handleChange} placeholder="Description" />            
        </Form.Group>
        </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}

export default EditChannel;
