import { Navigate, Outlet } from 'react-router-dom';

import { DASHBOARD_PAGES } from '@/config/pages-url.config';
import { useAppSelector } from '@/store/redux/hooks';
import { getUser } from '@/store/redux/slice/user.slice';

export default function UnAuthRoutes() {
  const { isLogin } = useAppSelector(getUser);

  return isLogin ? <Navigate to={DASHBOARD_PAGES.HOME.path} /> : <Outlet />;
}
