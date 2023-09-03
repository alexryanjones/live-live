import React, { FC } from 'react';
import { Box } from '@chakra-ui/react';
import { useTracksStore } from '../../store/tracks';
import { Inputs } from '../../store/visuals';

type BarsProps = {
  inputs: Inputs;
};

export const Bars: FC<BarsProps> = ({ inputs }) => {
  const input1 = useTracksStore(
    (state) => state.tracks[inputs['1'].activeTrackId] || {}
  );
  const input2 = useTracksStore(
    (state) => state.tracks[inputs['2'].activeTrackId] || {}
  );
  const input3 = useTracksStore(
    (state) => state.tracks[inputs['3'].activeTrackId] || {}
  );

  return (
    <Box bg="black" h="100%">
      <Box
        bg="green.400"
        h="50px"
        w={`${(input1?.velocity || 0) + 20}%`}
        my={2}
      />
      <Box
        bg="purple.600"
        h="50px"
        w={`${(input2?.velocity || 0) + 20}%`}
        my={2}
      />
      <Box
        bg="blue.400"
        h="50px"
        w={`${(input3?.velocity || 0) + 20}%`}
        my={2}
      />
    </Box>
  );
};
