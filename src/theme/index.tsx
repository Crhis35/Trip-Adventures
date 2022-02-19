import React from 'react';
import { ColorMode, NativeBaseProvider, StorageManager } from 'native-base';
import theme from './theme';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReduxProvider from '../store/ReduxProvider';

const colorModeManager: StorageManager = {
  get: async () => {
    try {
      let val = await AsyncStorage.getItem('@color-mode');
      return val === 'dark' ? 'dark' : 'light';
    } catch (e) {
      return 'light';
    }
  },
  set: async (value: ColorMode) => {
    try {
      await AsyncStorage.setItem('@color-mode', String(value));
    } catch (e) {
      console.log('ee');
    }
  },
};
const AppThemeProvider: React.FC = ({ children }) => {
  return (
    <NavigationContainer>
      <NativeBaseProvider colorModeManager={colorModeManager} theme={theme}>
        <ReduxProvider>{children}</ReduxProvider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default AppThemeProvider;
