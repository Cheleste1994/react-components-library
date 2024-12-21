import type { Meta, StoryObj } from '@storybook/react';

import { MOCK_USERS_DATA } from '@/constants/mockData';

import Table from './Table';

const data = MOCK_USERS_DATA.map((user) => ({ ...user, id: user.userId }));
type User = (typeof data)[0];

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    docs: {
      canvas: {
        layout: 'centered',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Table> & {
  args: {
    data: User[];
    head: string[];
    renderCell: (userData: User) => string[];
  };
};

export const Primary: Story = {
  args: {
    data,
    head: ['Электронная почта', 'Баланс', 'Скидка', 'Стоимость'],
    renderCell: (userData) => {
      const { email, balance, discount, price } = userData;

      return [email, `${balance}`, `${discount}`, `${price}`];
    },
  },
};
