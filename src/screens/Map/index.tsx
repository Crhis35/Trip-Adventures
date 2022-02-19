import React, { useEffect } from 'react';
import { Box } from 'native-base';
import Map from '../../components/Map';
import * as Location from 'expo-location';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setLocation } from '../../store/reducers/location';

const MapScreen = () => {
  const currenLocation = useAppSelector((state) => state.location);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      if (!currenLocation.active) {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        dispatch(
          setLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          })
        );
      }
    })();
  }, []);
  return (
    <Box flex={1}>
      <Map />
    </Box>
  );
};

export default MapScreen;
