import { Navigate, createBrowserRouter } from 'react-router-dom';

import { DASHBOARD_PAGES } from '@/config/pages-url.config';
import RootLayout from '@/layouts/RootLayout';
import HomePage from '@/pages/home';
import HomeUserId from '@/pages/home/user-id';
import TablePostId from '@/pages/posts/post-id';
import UserTablePage from '@/pages/user-table';
import UserTableId from '@/pages/user-table/user-id';

import AuthRoutes, { authLoader } from './PrivateRoutes/AuthRoutes/AuthRoutes';
import UnAuthRoutes from './PrivateRoutes/UnAuthRoutes/UnAuthRoutes';

export const router = createBrowserRouter(
  [
    {
      element: (
        <RootLayout>
          <AuthRoutes />
        </RootLayout>
      ),
      loader: authLoader,
      children: [
        {
          path: DASHBOARD_PAGES.HOME.path,
          element: <HomePage />,
          children: [{ path: DASHBOARD_PAGES.HOME.ID.path, element: <HomeUserId /> }],
        },
        {
          path: DASHBOARD_PAGES.USER_TABLE.path,
          element: <UserTablePage />,
          children: [{ path: DASHBOARD_PAGES.USER_TABLE.USER_ID.path, element: <UserTableId /> }],
        },
        {
          path: DASHBOARD_PAGES.POSTS.path,
          children: [{ path: DASHBOARD_PAGES.POSTS.POST_ID.path, element: <TablePostId /> }],
        },
        {
          path: DASHBOARD_PAGES.HELP.path,
          element: <Navigate to={DASHBOARD_PAGES.IN_DEVELOPMENT.path} replace />,
        },
        { path: `${DASHBOARD_PAGES.ERROR_403.path}`, element: <div>Page 403</div> },
        {
          path: `${DASHBOARD_PAGES.IN_DEVELOPMENT.path}`,
          element: <div>In Development</div>,
        },
        { path: '*', element: <div>Page 404</div> },
      ],
    },
    {
      element: <UnAuthRoutes />,
      loader: authLoader,
      children: [
        {
          path: DASHBOARD_PAGES.SIGN_IN.path,
          element: <div>Sign IN</div>,
        },
        {
          path: DASHBOARD_PAGES.SIGN_UP.path,
          element: <div>Sign UP</div>,
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);
