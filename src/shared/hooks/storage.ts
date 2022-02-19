import React from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  key: string;
  initialValue: any;
}

export function useAsyncStorage({ key, initialValue }: Props) {
  const [storedValue, setStoredValue] = React.useState<any>();
  const [loading, setLoading] = React.useState<Boolean>(true);

  async function getStoredItem({ key, initialValue }: Props) {
    try {
      const item = await AsyncStorage.getItem(key);
      const value = item ? JSON.parse(item) : initialValue;
      setStoredValue(value);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    getStoredItem({ key, initialValue });
  }, [key, initialValue]);

  const setValue = async (value: any) => {
    try {
      setLoading(true);
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const removeValue = async () => {
    try {
      setLoading(true);
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, storedValue, setValue, removeValue };
}
