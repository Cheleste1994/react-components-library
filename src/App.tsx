import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { router } from './routes';
import { MobileContextProvider } from './store/contexts/MobileContext';
import { TabletContextProvider } from './store/contexts/TabletContext';
import { ThemeContextProvider } from './store/contexts/ThemeContext';
import { store } from './store/redux/store';

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeContextProvider>
          <TabletContextProvider>
            <MobileContextProvider>
              <RouterProvider router={router} future={{ v7_startTransition: true }} />
            </MobileContextProvider>
          </TabletContextProvider>
        </ThemeContextProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
