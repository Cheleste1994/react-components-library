import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { FontClassName } from '@/constants/fonts';

import { ReactComponent as DocIcon } from '@images/nav/documents.svg';

import { ReactComponent as EditIcon } from '@icons/edit.svg';

import BaseTextInput from './BaseTextInput';

const meta: Meta<typeof BaseTextInput> = {
  title: 'Components/Inputs/BaseTextInput',
  component: BaseTextInput,
  argTypes: {
    success: {
      control: 'boolean',
    },
    warning: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
    fontStyle: {
      control: 'radio',
      options: Object.values(FontClassName).filter((f) => typeof f === 'string'),
    },
  },
  args: {
    onChange: fn(),
    title: 'Заголовок',
    placeholder: 'Введите текст',
    textAlign: 'left',
  },
};

export default meta;
type Story = StoryObj<typeof BaseTextInput>;

export const Primary: Story = {
  args: {
    IconStart: <DocIcon />,
    IconEnd: <EditIcon />,
    fontStyle: 'body-text-regular',
  },
};
export const Disabled: Story = {
  args: { disabled: true },
};
export const Success: Story = {
  args: {
    success: true,
  },
};
export const Warning: Story = {
  args: { warning: true },
};
export const Error: Story = {
  args: { error: true },
};
