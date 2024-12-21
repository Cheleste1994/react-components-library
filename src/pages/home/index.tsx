import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { getCountriesList } from '@/utils/getCountriesList';

import { FlagCodes, FlagCodesArray } from '@components/base/flag/flagCodes';
import TabsContainer from '@components/base/tabs/TabsContainer';
import Tab from '@components/base/tabs/components/Tab';

import { getUserList } from '@api/index';

import styles from './style.module.scss';
import AddUser from './tabs/add-user';
import { AddUserFormState } from './tabs/add-user/AddUserForm';
import ViewUser from './tabs/view-user';

export type UsersState = { email: string; countryCode: FlagCodes }[];

const countries = Object.entries(getCountriesList('all'))
  .filter(([key]) => FlagCodesArray.includes(key.toLowerCase()))
  .map(([key, value]) => ({ countryCode: key as FlagCodes, name: value.name }));

export default function HomePage() {
  const [usersState, setUsersState] = useState<UsersState>([]);

  const { data: dataUsers } = useQuery({
    queryKey: ['get_users'],
    queryFn: () => getUserList(),
  });

  useEffect(() => {
    if (dataUsers) {
      const initialState: UsersState = dataUsers.map(({ email }, index) => ({
        email,
        countryCode: countries[index]?.countryCode,
      }));

      setUsersState(initialState);
    }
  }, [dataUsers]);

  const handleAddUser = ({ email, country }: AddUserFormState) => {
    setUsersState([...usersState, { email, countryCode: country as FlagCodes }]);
  };

  const handleRemoveUser = (index: number) => {
    setUsersState((s) => {
      const newState = [...s];
      newState.splice(index, 1);
      return newState;
    });
  };

  return (
    <main className={styles.page}>
      <h2 className={styles.title}>Главная страница</h2>
      <TabsContainer
        tabTitles={[
          <Tab title="Добавить пользователя" key={'add-users'} />,
          <Tab title="Просмотр пользователя" key={'view-user'} />,
        ]}
      >
        <AddUser
          handleRemove={handleRemoveUser}
          onSubmit={handleAddUser}
          countries={countries}
          state={usersState}
        />

        <ViewUser state={usersState} />
      </TabsContainer>
    </main>
  );
}
