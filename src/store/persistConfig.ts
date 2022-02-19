import persistReducer from 'redux-persist/es/persistReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './rootReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['location', 'user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
