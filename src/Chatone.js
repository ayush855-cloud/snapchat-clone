import { Avatar } from '@material-ui/core';
import { StopRounded } from '@material-ui/icons';
import React, {useState} from 'react';
import './Chatone.css';
import ReactTimeAgo from 'react-timeago';
import { setCameraImage } from './features/cameraSlice';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { db } from './firebase';

export default function Chatone({ id, profilePic, username, timestamp, imageUrl, read }) {
  const history = useHistory()
  const dispatch = useDispatch();
  const [date, setDate] = useState(null)
  const open = () => {
    if (!read) {
      dispatch(setCameraImage(imageUrl));
      db.collection('posts').doc(id).set({
        read: true,
      }, { merge: true })
    }
    history.push('/chats/view')
  }

//   useEffect(() => {
//     const date = new Date(timestamp?.toDate()).toUTCString()
//     setDate(date);
//   }, [date])

  return (
    <div onClick={open} className="chat">
      <Avatar src={profilePic} className="chat_avatar" />
      <div className="chat__info">
        <h4>{username}</h4>
        <p>{!read && 'Tap to view - '}{(<ReactTimeAgo date={new Date(timestamp?.toDate()).toUTCString()} />)}</p>
      </div>

      {!read && <StopRounded className="chat__readIcon" />}
    </div>
  )
}
