import React from 'react';

import {
  Box,
  HStack,
  Icon,
  IconButton,
  Stagger,
  useColorMode,
  useDisclose,
} from 'native-base';

import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

const AuthStagger: React.FC = () => {
  const { isOpen, onToggle } = useDisclose();
  const { toggleColorMode } = useColorMode();
  const { i18n } = useTranslation();

  const translateTo = i18n.language === 'en' ? 'es' : 'en';
  return (
    <Box position="absolute" top="75%" left={0} right={0} bottom={0}>
      <Box alignItems="flex-end" marginRight="9">
        <Stagger
          visible={isOpen}
          initial={{
            opacity: 0,
            scale: 0,
            translateY: 34,
          }}
        >
          <IconButton
            mb="4"
            variant="solid"
            bg="indigo.500"
            colorScheme="indigo"
            borderRadius="full"
            onPress={() => i18n.changeLanguage(translateTo)}
            icon={
              <Icon
                as={MaterialIcons}
                size="6"
                name="translate"
                _dark={{
                  color: 'warmGray.50',
                }}
                color="warmGray.50"
              />
            }
          />
          <IconButton
            mb="4"
            variant="solid"
            bg="purple.500"
            colorScheme="indigo"
            borderRadius="full"
            onPress={toggleColorMode}
            icon={
              <Icon
                as={MaterialIcons}
                size="6"
                name="brightness-6"
                _dark={{
                  color: 'warmGray.50',
                }}
                color="warmGray.50"
              />
            }
          />
        </Stagger>
      </Box>
      <HStack marginRight="8" justifyContent="flex-end">
        <IconButton
          variant="solid"
          borderRadius="full"
          size="lg"
          onPress={onToggle}
          bg="cyan.400"
          icon={
            <Icon
              as={MaterialCommunityIcons}
              size="6"
              name="cog-outline"
              color="warmGray.50"
              _dark={{
                color: 'warmGray.50',
              }}
            />
          }
        />
      </HStack>
    </Box>
  );
};
export default AuthStagger;
