import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { useColorMode } from 'native-base';

import LoggedOutNavigator from './LoggedOut';
import LoggedInNavigator from './LoggedIn';
import Loading from '../shared/components/Loading';
import { useUsersPermissionsUserQuery } from '../generated/graphql';
import { BaseUrl } from '../shared/constants';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setUser } from '../store/reducers/user';

const MainNavigation = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { isLoading } = useUsersPermissionsUserQuery(
    {
      endpoint: BaseUrl,
      fetchParams: {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentUser?.jwt}`,
        },
      },
    },
    {
      usersPermissionsUserId: currentUser?.user?.id,
    },
    {
      enabled: !!(currentUser.user?.id && currentUser.jwt),
      onSuccess: ({ usersPermissionsUser }) => {
        dispatch(
          //@ts-ignore
          setUser({ jwt: currentUser?.jwt, user: usersPermissionsUser?.data })
        );
      },
    }
  );
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
