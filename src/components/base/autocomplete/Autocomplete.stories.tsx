import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import ReactCountryFlag from 'react-country-flag';

import { getContinentsName, getCountriesList } from '@/utils/getCountriesList';

import Autocomplete from './Autocomplete';

const continentsData = Object.entries(getCountriesList()).map(([key, value]) => ({
  key,
  value: getContinentsName(key),
  options: value.map((c) => ({
    key: c.code,
    value: c.name,
    Icon: <ReactCountryFlag countryCode={c.code} svg />,
  })),
}));

const countriesData = Object.entries(getCountriesList('all')).map(([key, value]) => ({
  key,
  value: value.name,
  Icon: <ReactCountryFlag countryCode={key} svg />,
}));

const meta: Meta<typeof Autocomplete> = {
  title: 'Components/Autocomplete',
  component: Autocomplete,
  args: {
    onChecked: fn(),
  },
  parameters: {
    docs: {
      canvas: {
        layout: 'centered',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

export const Primary: Story = {
  args: {
    title: 'Страна отправления',
    placeholder: 'Россия',
    options: continentsData,
    notFound: 'Страна отправления не найдена',
    checkedKey: 'ru',
  },
  decorators: [
    (Story) => (
      <div style={{ height: 300 }}>
        <Story />
      </div>
    ),
  ],
};

export const Secondary: Story = {
  args: {
    title: 'Страна отправления',
    placeholder: 'Россия',
    options: countriesData,
    notFound: 'Страна отправления не найдена',
    checkedKey: 'by',
  },
  decorators: [
    (Story) => (
      <div style={{ height: 300, display: 'flex', alignItems: 'end' }}>
        <Story />
      </div>
    ),
  ],
};
