import React, {useState} from 'react';
import axios from 'axios'

import { Modal} from 'react-bootstrap';
import Picker from 'emoji-picker-react';



function Reaction({channel}) {
  let user = JSON.parse(localStorage.getItem("user"))
  let token = localStorage.getItem('token')   
    const [show, setShow] = useState(false);
    const [chosenEmoji, setChosenEmoji] = useState([]); 
    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(prev => [...prev, emojiObject]);   
        let reaction = {
            _id : channel,
            user_id : user.id,
            ...emojiObject
        }
        console.log(reaction)
        axios.post(`https://glacial-earth-67440.herokuapp.com/api/v1/messages/emojis`, reaction, {headers: {'Authorization': `Bearer ${token}`}})
            .then(res =>{ 
                console.log(res)
            })   
        handleClose()
    }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>   
      <i style={{fontSize: '25px'}} onClick={ handleShow } class="pl-2 fa f fa-smile-o text-dark"></i>
      {
              chosenEmoji
                ? (chosenEmoji.map(ch => <span className="picked-emoji">{ch.emoji}</span>))
                : <span></span>
 
            }
      <Modal size="sm" show={show} onHide={handleClose}>
        <Picker onEmojiClick={onEmojiClick}/>
      </Modal>

    </>
  );
}

export default Reaction;
