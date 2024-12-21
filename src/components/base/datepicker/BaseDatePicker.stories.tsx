import type { Meta, StoryObj } from '@storybook/react';

import BaseDatePicker from './BaseDatePicker';

const meta: Meta<typeof BaseDatePicker> = {
  title: 'Components/BaseDatePicker',
  component: BaseDatePicker,
  argTypes: {
    maxWidth: {
      control: 'radio',
      options: ['md', 'full'],
    },
    radius: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    padding: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    height: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    textAlign: {
      control: 'radio',
      options: ['center', 'left', 'right'],
    },
    yearsBeforeCurrentDate: {
      control: 'number',
    },
    yearsAfterCurrentDate: {
      control: 'number',
    },
    error: {
      control: 'boolean',
    },
  },
  args: {},
  decorators: [
    (Story) => {
      return (
        <div style={{ display: 'flex', height: 350, justifyContent: 'center', alignItems: 'end' }}>
          <Story />
        </div>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof BaseDatePicker>;

export const Primary: Story = {
  args: {
    title: 'Период записи',
    maxWidth: 'md',
    selectsRange: true,
    startDate: new Date(0),
    yearsAfterCurrentDate: 10,
  },
};

export const Secondary: Story = {
  args: {
    title: 'Дата рождения',
    placeholderText: 'Дата рождения',
    maxWidth: 'full',
    selected: new Date(),
  },
};

export const Error: Story = {
  args: {
    title: 'Дата рождения',
    placeholderText: 'Дата рождения',
    maxWidth: 'full',
    selected: new Date(),
    error: true,
  },
};
