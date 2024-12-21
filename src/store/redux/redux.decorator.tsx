import React from 'react';
import { Provider } from 'react-redux';

import { store } from './store';

export const ReduxDecorator = (Story: () => React.ReactElement) => (
  <Provider store={store}>{Story()}</Provider>
);
