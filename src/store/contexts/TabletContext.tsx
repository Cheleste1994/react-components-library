import React, { FC, PropsWithChildren, useEffect, useState } from 'react';

export const TabletContext = React.createContext(false);

export const TabletContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkIsTablet = (): void => {
      setIsTablet(window.matchMedia('(max-width: 990px)').matches);
    };

    checkIsTablet();

    window.addEventListener('resize', checkIsTablet);

    return () => {
      window.removeEventListener('resize', checkIsTablet);
    };
  }, []);

  return <TabletContext.Provider value={isTablet}>{children}</TabletContext.Provider>;
};
