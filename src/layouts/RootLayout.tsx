import { PropsWithChildren, useContext } from 'react';

import { MobileContext } from '@/store/contexts/MobileContext';
import { TabletContext } from '@/store/contexts/TabletContext';

import DesktopLayout from './desktop/DesktopLayout';
import MobileLayout from './mobile/MobileLayout';
import TabletLayout from './tablet/TabletLayout';

export default function RootLayout({ children }: PropsWithChildren) {
  const isTablet = useContext(TabletContext);
  const isMobile = useContext(MobileContext);

  return (
    <>
      {!isTablet && !isMobile && <DesktopLayout>{children}</DesktopLayout>}
      {isTablet && !isMobile && <TabletLayout>{children}</TabletLayout>}
      {isMobile && <MobileLayout>{children}</MobileLayout>}
    </>
  );
}
