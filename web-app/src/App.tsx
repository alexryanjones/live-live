import React, { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    const socket = new WebSocket(`${process.env.REACT_APP_WS_SERVER_ADDRESS}`);

    socket.onopen = () => {
      console.log('WebSocket connection established.');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const { velocity, track } = data;

      if (track === 1) {
        document.body.style.backgroundColor = velocity === 0 ? '#000' : '#FFF';
      } else {
        const div = document.getElementById(`track-${track}`);
        const bar = div?.querySelector('.bar') as HTMLElement;

        if (!div || !bar) {
          return;
        }

        if (velocity === 0) {
          div.style.opacity = '0';
        } else {
          div.style.opacity = '1';
          bar.style.width = `${velocity}%`;
        }
      }
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed.');
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="App">
      <div id="track-0" className="track-info" style={{ top: '10%' }}>
        <div className="bar"></div>
      </div>

      <div id="track-2" className="track-info" style={{ top: '50%' }}>
        <div className="bar"></div>
      </div>
      <div id="track-3" className="track-info" style={{ top: '70%' }}>
        <div className="bar"></div>
      </div>
    </div>
  );
}

export default App;
