import type { Meta, StoryObj } from '@storybook/react';

import { ReactComponent as FolderCloud } from '@icons/folderCloud.svg';
import { ReactComponent as ReceiptSearch } from '@icons/receiptSearch.svg';
import { ReactComponent as WalletSearch } from '@icons/walletSearch.svg';

import TabsContainer from './TabsContainer';
import Tab from './components/Tab';

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
    children: [<h1 key={1}>Слайд 1</h1>, <h1 key={2}>Слайд 2</h1>, <h1 key={3}>Слайд 3</h1>],
  },
};
