import React, { FC, useLayoutEffect } from 'react';

import { useAppSelector } from '../redux/hooks';
import { getUser } from '../redux/slice/user.slice';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'app-theme';

export const ThemeContext = React.createContext<Theme | null>(null);

interface ThemeContextProviderProps {
  children: React.ReactElement;
}

export const getInitialTheme = (): Theme => {
  const savedTheme = localStorage.getItem(STORAGE_KEY) as Theme;

  if (savedTheme) {
    return savedTheme;
  }
  const prefersDark =
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  return prefersDark ? 'dark' : 'light';
};

export const ThemeContextProvider: FC<ThemeContextProviderProps> = ({ children }) => {
  const { theme } = useAppSelector(getUser);

  useLayoutEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};
