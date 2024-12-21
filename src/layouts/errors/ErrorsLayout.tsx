import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import Loader from '@/components/base/loader/Loader';

export default function ErrorsLayout() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <Loader />
        </div>
      }
    >
      <Outlet />
    </Suspense>
  );
}
