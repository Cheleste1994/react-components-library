import type { Meta, StoryObj } from '@storybook/react';

import Flag, { NameToFlag } from './FlagIconSync';

const meta: Meta<typeof Flag> = {
  title: 'Components/Flag',
  component: Flag,
  argTypes: {
    code: {
      control: 'select',
      options: [...Object.keys(NameToFlag)],
    },
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
type Story = StoryObj<typeof Flag>;

export const Primary: Story = {
  args: {
    code: 'ru',
  },
};

export const Secondary: Story = {
  args: {
    code: 'fr',
  },
};
