import React from 'react';
import { Text, HStack, Switch, useColorMode } from 'native-base';
import { useTranslation } from 'react-i18next';

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { t } = useTranslation('common');

  return (
    <HStack space={2} alignItems="center">
      <Text>{t('settings_page.theme.dark')}</Text>
      <Switch isChecked={colorMode === 'light'} onToggle={toggleColorMode} />
      <Text>{t('settings_page.theme.light')}</Text>
    </HStack>
  );
};

export default ThemeToggle;
