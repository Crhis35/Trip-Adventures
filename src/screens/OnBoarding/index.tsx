import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { useAsyncStorage } from '../../shared/hooks/storage';

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

const Dots = ({ selected }: { selected: Boolean }) => {
  const backgroundColor = selected
    ? 'rgba(0, 0, 0, 0.8)'
    : 'rgba(0, 0, 0, 0.3)';

  return (
    <View
      style={{
        width: 6,
        height: 6,
        marginHorizontal: 3,
        backgroundColor,
      }}
    />
  );
};

const Skip = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
    <Text style={{ fontSize: 16 }}>Skip</Text>
  </TouchableOpacity>
);

const Next = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
    <Text style={{ fontSize: 16 }}>Next</Text>
  </TouchableOpacity>
);

const Done = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
    <Text style={{ fontSize: 16 }}>Done</Text>
  </TouchableOpacity>
);

const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const { setValue } = useAsyncStorage({
    key: '@skip-intro',
    initialValue: false,
  });

  const onComplete = async () => {
    await setValue(true);
    navigation.navigate('Home');
  };
  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Dots}
      onSkip={onComplete}
      onDone={onComplete}
      pages={[
        {
          backgroundColor: '#34d399',
          image: <Image source={require('../../assets/onboarding-img1.png')} />,
          title: 'Connect to the World',
          subtitle: 'A New Way To Connect With The World',
        },
        {
          backgroundColor: '#38bdf8',
          image: <Image source={require('../../assets/onboarding-img2.png')} />,
          title: 'Share Your Favorites',
          subtitle: 'Share Your Thoughts With Similar Kind of People',
        },
        {
          backgroundColor: '#a78bfa',
          image: <Image source={require('../../assets/onboarding-img3.png')} />,
          title: 'Become The Star',
          subtitle: 'Let The Spot Light Capture You',
        },
      ]}
    />
  );
};
export default OnboardingScreen;
