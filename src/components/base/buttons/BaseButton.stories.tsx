import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { ReactComponent as AddIcon } from '@/assets/images/icons/addCircle.svg';

import BaseButton from './BaseButton';

const meta: Meta<typeof BaseButton> = {
  title: 'Components/Buttons/BaseButton',
  component: BaseButton,
  args: {
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
type Story = StoryObj<typeof BaseButton>;

export const Primary: Story = {
  args: {
    title: 'Кнопка',
    Icon: AddIcon,
  },
};

export const Transparent: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Кнопка с празрачным фоном',
      },
    },
  },
  args: {
    title: 'Кнопка',
    color: 'secondary',
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Кнопка неактивна',
      },
    },
  },
  args: {
    title: 'Кнопка',
    disabled: true,
  },
};
