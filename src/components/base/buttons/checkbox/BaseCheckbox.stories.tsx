import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import BaseCheckbox from './BaseCheckbox';

const meta: Meta<typeof BaseCheckbox> = {
  title: 'Components/Buttons/BaseCheckbox',
  component: BaseCheckbox,
  args: {
    title: 'Checbox',
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
type Story = StoryObj<typeof BaseCheckbox>;

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
