import { Navigate, Outlet } from 'react-router-dom';

import { DASHBOARD_PAGES } from '@/config/pages-url.config';
import { useAppSelector } from '@/store/redux/hooks';
import { getUser, loginUser } from '@/store/redux/slice/user.slice';
import { store } from '@/store/redux/store';

export const authLoader = async () => store.dispatch(loginUser());

export default function AuthRoutes() {
  const { isLogin } = useAppSelector(getUser);

  return isLogin ? <Outlet /> : <Navigate to={DASHBOARD_PAGES.SIGN_IN.path} />;
}
