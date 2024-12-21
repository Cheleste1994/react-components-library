import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import BaseRadioButton from './BaseRadioButton';

const meta: Meta<typeof BaseRadioButton> = {
  title: 'Components/Buttons/BaseRadioButton',
  component: BaseRadioButton,
  args: {
    title: 'Radio',
    onChange: fn(),
    onClick: fn(),
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
type Story = StoryObj<typeof BaseRadioButton>;

export const Primary: Story = {
  args: {
    disabled: false,
  },
};
export const Secondary: Story = {
  args: {
    defaultChecked: true,
    disabled: false,
  },
};
