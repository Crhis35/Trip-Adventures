import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { useColorMode } from 'native-base';

import LoggedOutNavigator from './LoggedOut';
import LoggedInNavigator from './LoggedIn';
import Loading from '../shared/Loading';
import { useMeQuery } from '../generated/graphql';
import { BaseUrl } from '../shared/constants';
import { useAppSelector } from '../store/hooks';

const MainNavigation = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const { isLoading } = useMeQuery({
    endpoint: BaseUrl,
    fetchParams: {
      headers: {
        Authorization: `Bearer ${currentUser.jwt}`,
      },
    },
  });
  const { colorMode } = useColorMode();
  const color = colorMode === 'light' ? 'dark' : 'light';
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <StatusBar style={color} />
      {currentUser.user ? <LoggedInNavigator /> : <LoggedOutNavigator />}
    </>
  );
};

export default MainNavigation;
