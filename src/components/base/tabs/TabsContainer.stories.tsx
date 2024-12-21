import type { Meta, StoryObj } from '@storybook/react';

import { MOCK_USERS_DATA } from '@/constants/mockData';

import { ReactComponent as FolderCloud } from '@icons/folderCloud.svg';
import { ReactComponent as ReceiptSearch } from '@icons/receiptSearch.svg';
import { ReactComponent as WalletSearch } from '@icons/walletSearch.svg';

import Table from '../table/Table';

import TabsContainer from './TabsContainer';
import Tab from './components/Tab';

const data = MOCK_USERS_DATA.map((user) => ({ ...user, id: user.userId }));

const meta: Meta<typeof TabsContainer> = {
  title: 'Components/TabsContainer',
  component: TabsContainer,
  args: {
    gap: 'md',
    initialSlide: 0,
  },
};

export default meta;
type Story = StoryObj<typeof TabsContainer>;

export const Primary: Story = {
  args: {
    tabTitles: [
      <Tab key={1} title="Информация о заявке" StartIcon={ReceiptSearch} />,
      <Tab key={2} title="Пакет документов" StartIcon={FolderCloud} />,
      <Tab key={3} title="Стоимость услуг" StartIcon={WalletSearch} />,
    ],
    children: [
      <h1 key={1}>Слайд 1</h1>,
      <Table
        data={data}
        head={['Электронная почта', 'Баланс', 'Скидка', 'Стоимость']}
        renderCell={({ email, balance, discount, price }) => [
          email,
          `${balance}`,
          `${discount}`,
          `${price}`,
        ]}
        key={2}
      />,
      <h1 key={3}>Слайд 3</h1>,
    ],
  },
};

export const Secondary: Story = {
  args: {
    tabTitles: ['Информация о заявке', 'Пакет документов', 'Стоимость услуг'],
    children: [
      <h1 key={1}>Слайд 1</h1>,
      <Table
        data={data}
        head={['Электронная почта', 'Баланс', 'Скидка', 'Стоимость']}
        renderCell={({ email, balance, discount, price }) => [
          email,
          `${balance}`,
          `${discount}`,
          `${price}`,
        ]}
        key={2}
      />,
      <h1 key={3}>Слайд 3</h1>,
    ],
  },
};
