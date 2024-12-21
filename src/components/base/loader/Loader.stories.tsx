import type { Meta, StoryObj } from '@storybook/react';

import Loader from './Loader';

const meta: Meta<typeof Loader> = {
  title: 'Components/Loader',
  component: Loader,
  args: {},
  parameters: {
    docs: {
      canvas: {
        layout: 'centered',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: 200 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Loader>;

export const Primary: Story = {};
