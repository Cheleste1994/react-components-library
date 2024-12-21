import { getCountriesList } from '@/utils/getCountriesList';

export interface Direction {
  id: string;
  countryCode: string;
  countryName: string;
}

export type Directions = Direction[];

export const getDirections = async (): Promise<Directions> => {
  return Object.entries(getCountriesList('all')).map(([code, value]) => ({
    id: code,
    countryCode: code,
    countryName: value.name,
  }));
};
