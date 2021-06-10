import React, { useEffect } from 'react';
import { selectCameraImage } from './features/cameraSlice';
import './ChatView.css';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

export default function ChatView() {
  const selectedImage = useSelector(selectCameraImage);
  const history = useHistory()
  const exit = () => {
    history.replace('/chats');
  }

  useEffect(() => {
    if (!selectedImage) {
      exit();
    }

  }, [selectedImage])

  

  return (
    <div className="chatView">
      <img src={selectedImage} onClick={exit} alt="" />
      <div className="chatView__timer">
        <CountdownCircleTimer
          isPlaying
          duration={10}
          strokeWidth={10}
          size={50}
          colors={[
            ['#004777', 0.33],
            ['#F7B801', 0.33],
            ['#A30000', 0.33]
          ]}
        >
          {({ remainingTime }) => {
            if (remainingTime === 0) {
              exit();
            }
            return remainingTime;
          }}
        </CountdownCircleTimer>
      </div>

    </div>
  )
}