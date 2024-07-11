import React, {createContext, useState} from 'react';
import {LayoutType} from './types';

const defaultProvider: LayoutType = {
  favoriteCity: [],
  setFavoriteCity: () => Promise.resolve(),
};

const LayoutContext = createContext(defaultProvider);

type Props = {
  children: React.ReactNode;
};

const LayoutProvider = ({children}: Props) => {
  const [favoriteCity, setFavoriteCity] = useState<string[]>(
    defaultProvider.favoriteCity,
  );

  const values = {
    favoriteCity,
    setFavoriteCity,
  };

  return (
    <LayoutContext.Provider value={values}>{children}</LayoutContext.Provider>
  );
};

export {LayoutContext, LayoutProvider};
