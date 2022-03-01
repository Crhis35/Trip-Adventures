import React, { useCallback } from 'react';
import {
  HStack,
  VStack,
  Avatar,
  Heading,
  IconButton,
  useColorModeValue,
  Icon,
  Box,
  Center,
  Button,
  Select,
  CheckIcon,
} from 'native-base';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { Feather } from '@expo/vector-icons';
import MenuButton from './components/MenuButton';
import ThemeToggle from './components/ThemeToggle';
import { MaterialIcons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { removeUser } from '../../store/reducers/user';
import { useTranslation } from 'react-i18next';

const Sidebar = ({ state, navigation }: DrawerContentComponentProps) => {
  const currentRoute = state.routeNames[state.index];
  const { i18n, t } = useTranslation('common');
  const { user: currentUser } = useAppSelector(
    (state) => state.user.currentUser
  );
  const dispatch = useAppDispatch();

  const handlePressBackButton = useCallback(() => {
    navigation.closeDrawer();
  }, [navigation]);
  const handlePressMenu = useCallback(
    (route: string) => {
      navigation.navigate(route);
    },
    [navigation]
  );

  const logOut = useCallback(() => {
    dispatch(removeUser());
  }, []);

  const translateTo = i18n.language === 'en' ? 'es' : 'en';

  const AvailableLanguages = [
    {
      label: 'English',
      value: 'en',
    },
    {
      label: 'Español',
      value: 'es',
    },
  ];
  return (
    <Box
      bg={useColorModeValue('white', 'lightBlue.600')}
      safeArea
      flex={1}
      p={7}
    >
      <VStack flex={1} space={2}>
        <HStack justifyContent="flex-end">
          <IconButton
            onPress={handlePressBackButton}
            borderRadius={100}
            variant="outline"
            borderColor={useColorModeValue('blue.300', 'white')}
            _icon={{
              as: Feather,
              name: 'chevron-left',
              size: 6,
              color: useColorModeValue('blue.800', 'white'),
            }}
          />
        </HStack>
        <Avatar
          // source={require('../assets/profile-image.png')}
          size="xl"
          borderRadius={100}
          mb={6}
          borderColor="secondary.500"
          borderWidth={3}
        />
        <Heading mb={4} size="xl">
          {currentUser?.attributes?.username}
        </Heading>
        <MenuButton
          active={currentRoute === 'Home'}
          onPress={() => handlePressMenu('Home')}
          icon="home"
          bg={useColorModeValue('blue.500', 'darkBlue.800')}
        >
          {t('settings_page.home')}
        </MenuButton>
        <MenuButton
          active={currentRoute === 'Place'}
          onPress={() => handlePressMenu('Place')}
          icon="book-open"
          bg={useColorModeValue('blue.500', 'darkBlue.800')}
        >
          {t('settings_page.place')}
        </MenuButton>
      </VStack>
      <Center>
        <Select
          selectedValue={i18n.language}
          minWidth="100"
          borderColor={useColorModeValue('blue.300', 'white')}
          accessibilityLabel="Choose language"
          placeholder="Language"
          _selectedItem={{
            bg: 'teal.600',
            endIcon: <CheckIcon size="5" key="selected" />,
          }}
          mb={1}
          onValueChange={() => i18n.changeLanguage(translateTo)}
        >
          {AvailableLanguages.map((language, idx) => (
            <Select.Item {...language} key={`language-${idx}`} />
          ))}
        </Select>
      </Center>
      <Center>
        <ThemeToggle />
      </Center>
      <Center mt="4">
        <IconButton
          onPress={logOut}
          borderRadius={100}
          variant="outline"
          borderColor={useColorModeValue('error.300', 'error.50')}
          _icon={{
            as: MaterialIcons,
            name: 'logout',
            size: 6,
            color: useColorModeValue('error.400', 'error.700'),
          }}
        />
      </Center>
    </Box>
  );
};

export default Sidebar;
