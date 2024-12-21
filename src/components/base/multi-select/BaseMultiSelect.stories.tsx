import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { MOCK_USERS_DATA } from '@/constants/mockData';

import BaseMultiSelect from './BaseMultiSelect';

const meta: Meta<typeof BaseMultiSelect> = {
  title: 'Components/Selects/MultiSelect',
  component: BaseMultiSelect,
  args: {
    options: MOCK_USERS_DATA.map(({ email }) => ({
      key: email,
      value: email,
    })),
    checkedKeys: [MOCK_USERS_DATA[0].email, MOCK_USERS_DATA[5].email, MOCK_USERS_DATA[8].email],
    onChange: fn(),
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
type Story = StoryObj<typeof BaseMultiSelect>;

export const Primary: Story = {
  args: {
    title: 'Primary',
    placeholder: 'Placeholder',
  },
};

export const Secondary: Story = {
  args: {
    ...Primary.args,
    title: 'Secondary',
    error: true,
    disabled: true,
  },
};
