import React, { useState, useEffect } from 'react';

const MyRemainingTimer = ({ targetTime, currentTime }) => {
    const [timeRemaining, setTimeRemaining] = useState(targetTime - currentTime);

    useEffect(() => {
      const intervalId = setInterval(() => {
        setTimeRemaining(targetTime - Date.now());
      }, 1000);
  
      return () => clearInterval(intervalId);
    }, [targetTime]);
  
    const formatTime = (time) => {
      const hours = Math.floor(time / 3600000);
      const minutes = Math.floor((time % 3600000) / 60000);
      const seconds = Math.floor((time % 60000) / 1000);
  
      return `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
  
    return (
      <div className='flex-container'>
        {/* <div className='myPadding myCenterAlign'>
            <img src={globalFileServer + 'agentApp/Time.svg'} />
        </div> */}
        {/* <div className='myPadding'>
            <h4>זמן לסוף המשימה:</h4>
        </div> */}
        <div className='myPadding'>
            <h4>{formatTime(timeRemaining)}</h4>
        </div>
      </div>
    );
};

export default MyRemainingTimer;