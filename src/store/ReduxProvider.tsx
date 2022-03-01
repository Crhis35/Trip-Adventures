import React, { PropsWithChildren } from 'react';

import { Provider } from 'react-redux';
import Loading from '../shared/components/Loading/index';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '.';

const ReduxProvider = (props: PropsWithChildren<{}>) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<Loading />}>
        {props.children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;
