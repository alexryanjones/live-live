import React, { FC } from 'react';
import { Box } from '@chakra-ui/react';
import { useTracksStore } from '../../store/tracks';

type BarsProps = {};

export const Bars: FC<BarsProps> = () => {
  const track1 = useTracksStore((state) => state.tracks['1']);
  const track2 = useTracksStore((state) => state.tracks['2']);
  const track3 = useTracksStore((state) => state.tracks['3']);

  return (
    <Box bg={track1?.velocity === 0 ? 'black' : 'white'} h="100%">
      <Box bg="green.400" h="50px" w={`${track2?.velocity + 20}%`} my={2} />
      <Box bg="purple.600" h="50px" w={`${track3?.velocity + 40}%`} my={2} />
    </Box>
  );
};
