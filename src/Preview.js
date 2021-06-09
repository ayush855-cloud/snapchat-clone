import { Close } from '@material-ui/icons';
import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { AttachFile, Create, Crop, MusicNote, Note, Timer, TextFields,Send } from '@material-ui/icons';
import {resetCameraImage, selectCameraImage} from './features/cameraSlice';
import {v4 as uuid} from 'uuid';
import './Preview.css'
import firebase from 'firebase';
import { storage,db } from './firebase';
import { selectUser } from './features/appSlice';

function Preview() {
    const history=useHistory()
    const image=useSelector(selectCameraImage);
    const user=useSelector(selectUser);
    const dispatch=useDispatch();

    useEffect(()=>{
        if(!image){
            history.replace("/");
        }
    },[image,history])

    const closePreview=()=>{
        dispatch(resetCameraImage())
    }

    const sendPost = () => {
        const id = uuid();
        const uploadTask = storage.ref(`posts/${id}`).putString(image, "data_url");
        uploadTask.on('state_changed', null, (error) => {
          console.log(error)
        }, () => {
          storage.ref('posts').child(id).getDownloadURL().then((url) => {
            db.collection('posts').add({
              imageUrl: url,
              username: user.username,
              read: false,
              profilePic: user.profilePic,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
            history.replace('/chats');
          })
        });
      }

    return (
        <div className="preview">
        <Close onClick={closePreview} className="preview_close"/>
        <div className="preview__toolbarRight">
        <TextFields />
        <Create />
        <Note />
        <MusicNote />
        <AttachFile />
        <Crop />
        <Timer />
      </div>
            <img src={image} className="captureImage"/>
            <div className="preview__footer">
        <h2>Send now</h2>
        <Send onClick={sendPost} className="preview__sendIcon" />
      </div>
        </div>
    )
}

export default Preview
