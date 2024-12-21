import type { Meta, StoryObj } from '@storybook/react';

import { MOCK_USERS_DATA } from '@/constants/mockData';

import Table from './Table';

const data = MOCK_USERS_DATA.map((user) => ({ ...user, id: user.userId }));

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
type Story = StoryObj<typeof Table>;

export const Primary: Story = {
  args: {
    data,
    head: ['Электронная почта', 'Баланс', 'Скидка', 'Стоимость'],
    renderCell: (userData) => {
      const { email, balance, discount, price } = userData as (typeof data)[0];

      return [email, `${balance}`, `${discount}`, `${price}`];
    },
  },
};
