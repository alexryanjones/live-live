import React, { useEffect } from 'react';

import { Box } from '@chakra-ui/react';
import { Bars } from './visuals/Bars';
import { useTracksStore } from './store/tracks';

function App() {
  const socket = new WebSocket(`${process.env.REACT_APP_WS_URL}`);
  const tracks = useTracksStore((state) => state.tracks);
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
    <Box bg="black" h="100vh">
      <Box h="50%" display="flex">
        <Box w="50%" bg="white">
          {/*  Top left view */}
        </Box>
        <Box w="50%" bg="black">
          {/*  Top right view */}
          <Bars />
        </Box>
      </Box>
      <Box h="50%" bg="gray.100">
        {/*  Bottom view */}
        <p>{JSON.stringify(tracks)}</p>
      </Box>
    </Box>
  );
}

export default App;
