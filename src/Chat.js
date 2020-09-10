import React, { useState, useEffect } from 'react'
import "./Chat.css"
import AttachFile from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Avatar, IconButton } from '@material-ui/core'
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import db from "./firebase"
import { useParams } from 'react-router-dom'
import { useStateValue } from './StateProvider'
import firebase from 'firebase'


function Chat() {
  const [seed, setSeed] = useState("")
  const [input, setInput] = useState("")
  const { roomId } = useParams()
  const [roomName, setRoomName] = useState("")
  const [messages, setMessages] = useState([])
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const room = roomId && roomId.replace(':', '');
    if (room) {
      db.collection("rooms")
        .doc(room)
        .onSnapshot((snapshot) => {
          setRoomName(snapshot.data().name)
        })
      db.collection("rooms")
        .doc(room)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => (
          setMessages(snapshot.docs.map(doc => doc.data()))
        ))
    }
  }, [roomId])

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000))
  }, [roomId])

  const sendMessage = async (e) => {
    e.preventDefault();
    console.log(input)
    db.collection("rooms").doc(roomId && roomId.replace(':', '')).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setInput("")
  }

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>last seen at {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}</p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map(message => (
          <p className={`chat__message ${message.name === user.displayName && "chat__receiver"}`}>
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}

      </div>

      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form action="">
          <input value={input} onChange={(e) => { setInput(e.target.value) }} type="text" placeholder="Type a message" />
          <button onClick={sendMessage} type="submit">Send a message</button>
        </form>
        <MicIcon />
      </div>
    </div>
  )
}

export default Chat 