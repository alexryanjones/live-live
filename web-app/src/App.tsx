import React, { useEffect } from 'react';

import { Box } from '@chakra-ui/react';
import { Controller } from './visuals/Bars';
import { useTracksStore } from './store/tracks';
import { Sidebar } from './components/Sidebar';
import { VRender } from './components/VRender';

function App() {
  const socket = new WebSocket(`${process.env.REACT_APP_WS_URL}`);
  const setTrack = useTracksStore((state) => state.setTrack);

  useEffect(() => {
    socket.onopen = () => {
      console.log('WebSocket connection established.');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const { velocity, track, pitch } = data;
      const trackId = track + 1;
      setTrack(`${trackId}`, { id: trackId, velocity, pitch });
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed.');
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <Box display="flex" h="100vh">
      <Box w="30%">
        <Sidebar>
          <Controller />
        </Sidebar>
      </Box>
      <Box w="70%" bg="black">
        <VRender />
      </Box>
    </Box>
  );
}

export default App;
