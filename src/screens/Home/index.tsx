import React from 'react';
import {
  Box,
  Center,
  Icon,
  Text,
  useToken,
  VStack,
  useColorMode,
  useColorModeValue,
  Button,
} from 'native-base';
import {
  createBottomTabNavigator,
  BottomTabBarButtonProps,
} from '@react-navigation/bottom-tabs';
import Post from '../../components/Post/index';
import { Dimensions, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapScreen from '../Map';

const Tab = createBottomTabNavigator();

const HEIGHT = Dimensions.get('window').height * 0.08;

const CustomTabBarButtom: React.FC<BottomTabBarButtonProps> = ({
  children,
  onPress,
}) => {
  return (
    <Button
      style={{
        top: -30,
        justifyContent: 'center',
        alignItems: 'center',
        ...styles.shadow,
      }}
      onPress={onPress}
      w="70"
      h="70"
      borderRadius="35"
      bg={useColorModeValue('#38bdf8', '#0369a1')}
    >
      {children}
    </Button>
  );
};

const HomeScreen: React.FC = () => {
  const { colorMode } = useColorMode();

  return (
    <Box flex={1} w="full">
      <VStack
        flex={1}
        space={1}
        mt="-20px"
        pt="20px"
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
      >
        <Tab.Navigator
          initialRouteName="Post"
          screenOptions={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarStyle: {
              borderRadius: 15,
              backgroundColor: colorMode === 'light' ? 'white' : 'black',
              position: 'absolute',
              bottom: 20,
              left: 20,
              right: 20,
              height: HEIGHT,
              ...styles.shadow,
            },
          }}
        >
          <Tab.Screen
            name="Post"
            component={Post}
            options={{
              tabBarIcon: ({ focused }) => (
                <Center
                  justifyContent="center"
                  alignItems="center"
                  _ios={{
                    top: 15,
                  }}
                >
                  <Icon
                    color={
                      focused ? useToken('colors', 'primary.500') : 'gray.500'
                    }
                    as={<Ionicons name="ios-search" />}
                  />
                  <Text
                    color={
                      focused ? useToken('colors', 'primary.500') : 'gray.500'
                    }
                  >
                    Post
                  </Text>
                </Center>
              ),
            }}
          />
          <Tab.Screen
            name="Map"
            component={MapScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <Icon
                  color={focused ? 'emerald.200' : 'warmGray.50'}
                  as={<Ionicons name="ios-map" />}
                />
              ),
              tabBarButton: (props) => <CustomTabBarButtom {...props} />,
            }}
          />
          <Tab.Screen
            name="Post3"
            component={Post}
            options={{
              tabBarIcon: ({ focused }) => (
                <Center
                  justifyContent="center"
                  alignItems="center"
                  _ios={{
                    top: 15,
                  }}
                >
                  <Icon
                    color={
                      focused ? useToken('colors', 'primary.500') : 'gray.500'
                    }
                    as={<Ionicons name="ios-search" />}
                  />
                  <Text
                    color={
                      focused ? useToken('colors', 'primary.500') : 'gray.500'
                    }
                  >
                    Post
                  </Text>
                </Center>
              ),
            }}
          />
        </Tab.Navigator>
      </VStack>
    </Box>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7f5df0',
    shadowOffset: {
      width: 0,
      height: HEIGHT * 0.05,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default HomeScreen;
