import React, { FC, PropsWithChildren, useEffect, useState } from 'react';

export const MobileContext = React.createContext(false);

export const MobileContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = (): void => {
      setIsMobile(window.matchMedia('(max-width: 500px)').matches);
    };

    checkIsMobile();

    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  return <MobileContext.Provider value={isMobile}>{children}</MobileContext.Provider>;
};
