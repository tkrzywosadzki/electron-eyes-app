import React from 'react';
import { render } from 'react-dom';
import { useState } from 'react';

const App = () => {
  const [status, setStatus] = useState("off");
  const [time, setTime] = useState(5);
  const [timer, setTimer] = useState(null);

  const formatTime = (time) => {
    
    const minutes = Math.floor(time/60);
    const seconds = time % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  };
  

  const formattedTime = formatTime(time);

  const playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };

  const startTimer = () => {
    setTime(5);
    setStatus('work');
    const newTimer = setInterval(() => {
      setTime(prevTime => {
        if (prevTime <= 0) {
          clearInterval(newTimer);
          playBell();
          startRestTimer();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    setTimer(newTimer);
  };

  const startRestTimer = () => {
    setTime(5);
    setStatus('rest');
    const newTimer = setInterval(() => {
      setTime(prevTime => {
        if (prevTime <= 0) {
          clearInterval(newTimer);
          playBell();
          startTimer();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    setTimer(newTimer);
  };

  const stopTimer = () => {
    clearInterval(timer);
    setStatus('off');
    setTime(0);
  };

  const closeApp = () => {
    window.close();
  }


  
  return (
    <div>
      <h1>Protect your eyes</h1>
      { status === 'off' && (
        <div>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div>
      )}
      { status === 'work' && (<img src="./images/work.png" />)}
      { status === 'rest' && (<img src="./images/rest.png" />)}
      { status !== 'off' && (
        <div className="timer">
          {formattedTime}
        </div>
      )}
      { status === 'off' && (<button className="btn" onClick={startTimer}>Start</button>)}
      { status !== 'off' && (<button className="btn" onClick={stopTimer}>Stop</button>)}
      <button className="btn btn-close" onClick={closeApp}>X</button>
    </div>
  );
};

render(<App />, document.querySelector('#app'));

