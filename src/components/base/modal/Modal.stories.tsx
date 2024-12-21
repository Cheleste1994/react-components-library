import type { Meta, StoryObj } from '@storybook/react';

import { useModal } from '@/hooks/useModal';

import BaseButton from '../buttons/BaseButton';

import Modal from './Modal';
import ModalTemplate from './ModalTemplate';

const meta: Meta<typeof ModalTemplate> = {
  title: 'Components/Modal',
  component: ModalTemplate,

  argTypes: {
    titleAlign: {
      control: 'radio',
      options: ['left', 'center'],
    },
  },
  parameters: {
    docs: {
      canvas: {
        layout: 'centered',
      },
    },
  },
  decorators: [
    (Story) => {
      const [isOpen, toogleModal] = useModal();

      return (
        <div>
          <BaseButton title="Открыть" onClick={toogleModal} />
          <Modal open={isOpen} handleClose={toogleModal}>
            <Story />
          </Modal>
        </div>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof ModalTemplate>;

export const Primary: Story = {
  args: {
    title: 'Заголовок',
    titleAlign: 'left',
    btnClose: () => {},
    children: 'Контентная часть',
    btnCancel: {
      title: 'Отмена',
      onChange: () => {},
    },
    btnConfirm: {
      title: 'Отправить',
      onChange: () => {},
    },
  },
};

export const Secondary: Story = {
  args: {
    title: {
      title: 'Заголовок',
      caption: 'Описание',
    },
    titleAlign: 'center',
  },
};
