import React from 'react';
import AuthenticationNavigator from '../components/Auth';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const LoggedOutNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Authentication"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Authentication" component={AuthenticationNavigator} />
    </Stack.Navigator>
  );
};

export default LoggedOutNavigator;
