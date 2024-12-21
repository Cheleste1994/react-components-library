import { TContinentCode, TCountries, continents, countries } from 'countries-list';

export type Country = {
  code: string;
  name: string;
};

export type Continents = { [key in TContinentCode]: Country[] };

export const getCountriesList = <T extends 'all' | 'continents' = 'continents'>(
  list: T = 'continents' as T
): T extends 'all' ? TCountries : Continents => {
  if (list === 'all') {
    return countries as T extends 'all' ? TCountries : never;
  }

  const data = {} as Continents;

  Object.entries(countries).forEach(([code, { continent, name }]) => {
    if (continent) {
      data[continent] = data[continent] ? [...data[continent], { code, name }] : [{ code, name }];
    }
  });

  return data as T extends 'all' ? never : Continents;
};

export const getContinentsName = (code: TContinentCode | string) =>
  continents[code as TContinentCode] || '';
