import React, { FC } from 'react';
import { Box, Select, Stack } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { useVisualsStore } from '../../store/visuals';
import { useTracksStore } from '../../store/tracks';

const CONFIG = {
  id: 'default',
  maxTrackNum: 3,
};

export const Controller: FC = () => {
  const trackIds = Array.from(
    { length: CONFIG.maxTrackNum },
    (_, i) => `${i + 1}`
  );

  const { inputs } = useVisualsStore((state) => state.visuals[CONFIG.id]);

  const { tracks } = useTracksStore((state) => state);

  const { setVisualInputs } = useVisualsStore((state) => state);

  const handleTrackChange = (inputId: string, trackId: string) => {
    setVisualInputs(CONFIG.id, {
      inputs: {
        ...inputs,
        [inputId]: {
          id: inputId,
          activeTrackId: trackId,
        },
      },
    });
  };

  return (
    <Box
      bg="white"
      w="100%"
      border="1px"
      borderColor="gray.400"
      borderRadius="md"
      p={4}
    >
      <Box my={1} mx={4}>
        <Text fontSize="xs" fontWeight={700}>
          {CONFIG.id}
        </Text>
      </Box>
      <Box display="flex" justifyContent="flex-start">
        {trackIds.map((id) => (
          <Stack key={id} align="center" direction="column" mx={4}>
            <Text fontSize="xs">Input {id}</Text>
            <Select
              placeholder="None"
              onChange={(e) => handleTrackChange(id, e.target.value)}
              size="xs"
            >
              {Object.keys(tracks).map((key) => (
                <option key={key} value={tracks[key].id}>
                  {tracks[key].id}
                </option>
              ))}
            </Select>
          </Stack>
        ))}
      </Box>
    </Box>
  );
};
