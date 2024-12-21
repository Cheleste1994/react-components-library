import type { Meta, StoryObj } from '@storybook/react';

import Breadcrumbs from './Breadcrumbs';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,

  parameters: {
    docs: {
      canvas: {
        layout: 'centered',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const Primary: Story = {
  args: {
    children: [
      <a key={1}>Настройки сервиса – Направление</a>,
      <a key={2}>Россия – Португалия</a>,
      <a key={3}>Учебная</a>,
    ],
  },
};

export const Secondary: Story = {
  args: {
    children: [<a key={1}>Мои заявки</a>, <a key={2}>Заявка № RUS18EF66189D0</a>],
  },
};
