import React from 'react';
import Masthead from '../../shared/components/MastHead';
import AuthStagger from './Stagger';
import { Box, VStack, useColorModeValue } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface Props {
  title: string;
}

const AuthScreen: React.FC<Props> = ({ children, title }) => {
  return (
    <>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        style={{ flex: 1 }}
      >
        <Box
          flex={1}
          w="full"
          bg={useColorModeValue('blueGray.50', 'blueGray.900')}
          mt="-20px"
          pt="20px"
          h="100%"
          borderTopLeftRadius="20px"
          borderTopRightRadius="20px"
        >
          <Masthead title={title} image={require('../../assets/login.jpeg')} />

          <VStack
            flex={1}
            space={1}
            bg={useColorModeValue('blueGray.50', 'blueGray.900')}
            mt="-20px"
            pt="20px"
            h="100%"
            borderTopLeftRadius="20px"
            borderTopRightRadius="20px"
          >
            {children}
          </VStack>
        </Box>
      </KeyboardAwareScrollView>
      <AuthStagger />
    </>
  );
};
export default AuthScreen;
