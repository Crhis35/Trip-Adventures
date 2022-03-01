import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useAsyncStorage } from '../shared/hooks/storage';
import Loading from '../shared/components/Loading';
import OnboardingScreen from '../screens/OnBoarding';
import Sidebar from '../components/Sidebar';
import HomeScreen from '../screens/Home';
import PlaceScreen from '../screens/PlaceScreen';

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
        overlayColor: 'rgba(0,0,0,0.6)',
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
      <Drawer.Screen name="Place" component={PlaceScreen} />
    </Drawer.Navigator>
  );
};

export default LoggedInNavigator;
