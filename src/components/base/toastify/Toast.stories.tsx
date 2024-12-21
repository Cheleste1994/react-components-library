import type { Meta, StoryObj } from '@storybook/react';
import { ToastOptions, toast } from 'react-toastify';

import BaseButton from '../buttons/BaseButton';

import Toast from './Toast';
import ToastContainer from './ToastContainer';

type CustomToastStatuses = keyof Pick<typeof toast, 'success' | 'warning' | 'error'>;
type CustomToastPosition = Pick<Pick<ToastOptions, 'position' | 'delay'>, 'position' | 'delay'>;

type CustomToast = React.ComponentProps<typeof Toast> & {
  statuses: CustomToastStatuses;
} & CustomToastPosition;

const meta: Meta<CustomToast> = {
  title: 'Components/Toast',
  component: Toast,
  argTypes: {
    statuses: {
      control: 'select',
      options: ['success', 'error'],
    },
    position: {
      control: 'select',
      options: [
        'top-right',
        'top-center',
        'top-left',
        'bottom-right',
        'bottom-center',
        'bottom-left',
      ],
    },
  },
  parameters: {
    docs: {
      canvas: {
        layout: 'centered',
      },
    },
  },
  decorators: (Story, { args: { statuses, ...options } }) => {
    const handleClick = () => {
      toast[statuses](<Story />, options);
    };

    return (
      <>
        <BaseButton title="Make toast" onClick={handleClick} />
        <ToastContainer />
      </>
    );
  },
};

export default meta;
type Story = StoryObj<CustomToast>;

export const Primary: Story = {
  args: {
    title: 'Title',
    description: 'Description',
    statuses: 'success',
    position: 'bottom-left',
    delay: 0,
  },
};
