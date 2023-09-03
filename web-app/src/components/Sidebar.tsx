import React, { FC, PropsWithChildren } from 'react';
import { Box } from '@chakra-ui/react';

export const Sidebar: FC<PropsWithChildren> = ({ children }) => (
  <Box bg="gray.100" h="100%" p={4}>
    {children}
  </Box>
);
