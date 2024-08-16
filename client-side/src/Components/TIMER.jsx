import React, { useState, useEffect } from 'react';

const ClockShow = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    // Cleanup the interval on component unmount
    return () => clearInterval(timerId);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString();

  return (
    <div>
      <h5 className='text-white'>{formattedTime}</h5>
    </div>
  );
};

export default ClockShow;