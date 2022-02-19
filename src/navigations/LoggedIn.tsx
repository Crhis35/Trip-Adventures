import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useAsyncStorage } from '../shared/hooks/storage';
import Loading from '../shared/Loading';
import OnboardingScreen from '../screens/OnBoarding';
import Sidebar from '../components/Sidebar';
import HomeScreen from '../screens/Home';

const Drawer = createDrawerNavigator();

const LoggedInNavigator = () => {
  let initialRouteName = 'OnBoarding';
  const { loading, storedValue } = useAsyncStorage({
    key: '@skip-intro',
    initialValue: false,
  });
  if (loading) {
    return <Loading />;
  }

  if (storedValue) {
    initialRouteName = 'Home';
  }

  return (
    <Drawer.Navigator
      initialRouteName={initialRouteName}
      drawerContent={(props) => <Sidebar {...props} />}
      screenOptions={{
        drawerType: 'back',
        overlayColor: '#00000000',
        headerShown: false,
      }}
    >
      {!storedValue && (
        <Drawer.Screen
          name="OnBoarding"
          component={OnboardingScreen}
          options={{
            headerShown: false,
            swipeEnabled: false,
          }}
        />
      )}
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );
};

export default LoggedInNavigator;
