import React from 'react';
import { Platform } from 'react-native';
import {
  Box,
  Divider,
  Icon,
  Input,
  VStack,
  useContrastText,
} from 'native-base';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const isAndroid = Platform.OS === 'ios';

const SearchBar = () => {
  const bgDark = 'gray.900';
  const colorContrastDark = useContrastText(bgDark);
  return (
    <VStack
      my="4"
      space={5}
      w="100%"
      divider={
        <Box px="2">
          <Divider />
        </Box>
      }
    >
      {isAndroid ? (
        <VStack w="100%" space={5} alignSelf="center">
          <Input
            placeholder="Search"
            width="100%"
            variant="filled"
            borderRadius="10"
            h={8}
            py="1"
            px="2"
            borderWidth="0"
            _text={{
              color: colorContrastDark,
            }}
            InputLeftElement={
              <Icon
                ml="2"
                size="4"
                color="gray.400"
                as={<Ionicons name="ios-search" />}
              />
            }
          />
        </VStack>
      ) : (
        <VStack w="100%" space={5} alignSelf="center">
          <Input
            placeholder="Search People & Places"
            width="100%"
            borderRadius="4"
            py="3"
            px="1"
            fontSize="14"
            InputLeftElement={
              <Icon
                m="2"
                ml="3"
                size="6"
                color="gray.400"
                as={<MaterialIcons name="search" />}
              />
            }
            InputRightElement={
              <Icon
                m="2"
                mr="3"
                size="6"
                color="gray.400"
                as={<MaterialIcons name="mic" />}
              />
            }
          />
        </VStack>
      )}
    </VStack>
  );
};

export default SearchBar;
