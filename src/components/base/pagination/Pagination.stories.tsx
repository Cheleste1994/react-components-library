import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useState } from 'react';

import Pagination from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  args: {
    setCurrentPage: fn(),
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
type Story = StoryObj<typeof Pagination>;

export const Primary: Story = {
  decorators: [
    (Story) => {
      const [currentPage, setCurrentPage] = useState(5);

      return <Story args={{ size: 10, currentPage, setCurrentPage }} />;
    },
  ],
};

export const Secondary: Story = {
  args: {
    size: 5,
    currentPage: 1,
  },
};
