import React from 'react';
import { Button, Icon, IButtonProps } from 'native-base';
import { Feather } from '@expo/vector-icons';

interface Props extends IButtonProps {
  active: boolean;
  icon: string;
  children: React.ReactNode;
}

const MenuButton = ({ active, icon, children, ...props }: Props) => {
  return (
    <Button
      size="lg"
      _light={{
        colorScheme: 'blue',
        bg: active ? 'primary.500' : 'primary.50',
        _pressed: {
          bg: active ? 'primary.500' : 'primary.100',
        },
        _text: {
          color: active ? 'blue.50' : 'primary.500',
        },
      }}
      _dark={{
        colorScheme: 'darkBlue',
        bg: active ? 'darkBlue.800' : undefined,
        _pressed: {
          bg: 'primary.600',
        },
        _text: {
          color: active ? 'blue.50' : 'white',
        },
      }}
      variant={active ? 'solid' : 'outline'}
      justifyContent="flex-start"
      leftIcon={<Icon as={Feather} name={icon} size="sm" opacity={0.5} />}
      {...props}
    >
      {children}
    </Button>
  );
};

export default MenuButton;
