import React from 'react';
import { Box, useColorModeValue } from 'native-base';
import PlaceForm from './components/Form';

const PlaceScreen: React.FC = () => {
  return (
    <Box bg={useColorModeValue('blueGray.50', 'blueGray.900')} safeArea>
      <PlaceForm />
    </Box>
  );
};

export default PlaceScreen;
