import React, { useEffect } from 'react';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  MapEvent,
} from 'react-native-maps';
import {
  Box,
  Icon,
  useColorMode,
  ScrollView as ScrollViewNative,
} from 'native-base';
import { useAppSelector } from '../../store/hooks';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Animated,
  Dimensions,
  Platform,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import CustomCallout from './components/CustomCallout';
import { mapDarkStyle, mapStandardStyle } from '../../shared/helpers/map';

const markers = [
  {
    coordinate: {
      latitude: 22.6293867,
      longitude: 88.4354486,
    },
    title: 'Amazing Food Place',
    description: 'This is the best food place',
    image: require('../../assets/login.jpeg'),
    rating: 4,
    reviews: 99,
  },
  {
    coordinate: {
      latitude: 22.6281662,
      longitude: 88.4410113,
    },
    title: 'Travel',
    description: 'This is the best food place',
    image: require('../../assets/login.jpeg'),
    rating: 4,
    reviews: 99,
  },
];
const { width } = Dimensions.get('window');

const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const AnimatedIcon = Animated.createAnimatedComponent(Icon);
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollViewNative);

const Map = () => {
  const { colorMode } = useColorMode();
  const { location } = useAppSelector((state) => state.location);

  let mapIndex = 0;
  const mapAnimation = new Animated.Value(0);
  const _map = React.useRef<MapView | null>(null);
  const _timer = React.useRef<NodeJS.Timeout | null>(null);

  const _scrollView = React.useRef<ScrollView | null>(null);

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= markers.length) {
        index = markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      _timer.current = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { coordinate } = markers[index];
          _map.current?.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: 0.04864195044303443,
              longitudeDelta: 0.040142817690068,
            },
            200
          );
        }
      }, 10);
    });
    return () => {
      mapAnimation.removeAllListeners();
      clearTimeout(_timer.current as NodeJS.Timeout);
    };
  });

  const interpolations = markers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: 'clamp',
    });
    return { scale };
  });

  const onMarkerPress = (mapEventData: any) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }
    _scrollView.current?.scrollTo({ x, y: 0, animated: true });
  };

  return (
    <Box flex={1}>
      <MapView
        ref={_map}
        style={{
          height: '100%',
          width: '100%',
        }}
        provider={PROVIDER_GOOGLE}
        customMapStyle={colorMode === 'dark' ? mapDarkStyle : mapStandardStyle}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.04864195044303443,
          longitudeDelta: 0.040142817690068,
        }}
      >
        {markers.map((marker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };

          return (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.coordinate.latitude,
                longitude: marker.coordinate.longitude,
              }}
              onPress={(e) => onMarkerPress(e)}
            >
              <AnimatedIcon
                as={MaterialCommunityIcons}
                name="map-marker"
                style={[scaleStyle]}
                _light={{ color: 'primary.800' }}
                _dark={{ color: 'primary.300' }}
              />
            </Marker>
          );
        })}
      </MapView>
      <AnimatedScrollView
        ref={_scrollView}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={300}
        style={{
          position: 'absolute',
          bottom: 100,
          left: 0,
          right: 0,
          paddingVertical: 10,
        }}
        snapToAlignment="center"
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET,
        }}
        contentContainerStyle={{
          paddingHorizontal:
            Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                },
              },
            },
          ],
          {
            useNativeDriver: false,
          }
        )}
      >
        {markers.map((marker, index) => (
          <CustomCallout key={index} />
        ))}
      </AnimatedScrollView>
    </Box>
  );
};

export default Map;
