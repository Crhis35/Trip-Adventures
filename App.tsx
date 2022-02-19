import React, { useState } from 'react';

import i18next from 'i18next';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import { CourierPrime_400Regular } from '@expo-google-fonts/courier-prime';
import { I18nextProvider } from 'react-i18next';
import { Image } from 'react-native';
import { Asset } from 'expo-asset';

import { config as i18nextConfig } from './src/translations';

import AppThemeProvider from './src/theme';
import MainNavigation from './src/navigations/index';
import QueryProvider from './src/react-query/index';

i18next.init(i18nextConfig);

const cacheImages = (images) =>
  images.map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });

const cacheFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const handleFinish = () => setIsReady(true);
  const loadAssets = async () => {
    const images = [
      require('./src/assets/login.jpeg'),
      require('./src/assets/onboarding-img1.png'),
      require('./src/assets/onboarding-img2.png'),
      require('./src/assets/onboarding-img3.png'),
    ];

    const fonts = [
      {
        Courier: CourierPrime_400Regular,
      },
    ];

    const imagePromises = cacheImages(images);
    const fontPromises = cacheFonts(fonts);
    Promise.all([...fontPromises, ...imagePromises]);
  };

  if (!isReady) {
    return (
      <AppLoading
        onError={console.error}
        onFinish={handleFinish}
        startAsync={loadAssets}
      />
    );
  }
  return (
    <I18nextProvider i18n={i18next}>
      <AppThemeProvider>
        <QueryProvider>
          <MainNavigation />
        </QueryProvider>
      </AppThemeProvider>
    </I18nextProvider>
  );
}
