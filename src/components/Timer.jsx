import React, { useState, useEffect } from 'react';

function Timer({ initialMinutes = 30, onTimeUp }) {
  const [timeRemaining, setTimeRemaining] = useState(initialMinutes * 60);

  useEffect(() => {
    if (timeRemaining <= 0) {
      onTimeUp?.(); 
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => Math.max(prev - 1, 0)); 
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, onTimeUp]);

  const minutes = String(Math.floor(timeRemaining / 60)).padStart(2, '0');
  const seconds = String(timeRemaining % 60).padStart(2, '0');

  return (
    <div className="text-xl font-semibold text-red-600">
      Time Left: {minutes}:{seconds}
    </div>
  );
}

export default Timer;
