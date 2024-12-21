import { useAppSelector } from '@/store/redux/hooks';
import { getUser } from '@/store/redux/slice/user.slice';

import FlagIcon from '@components/base/flag/FlagIcon';
import { FlagCodes } from '@components/base/flag/flagCodes';

import { ReactComponent as CloseIcon } from '@icons/close.svg';

import { UsersState } from '../..';

import AddUserForm, { AddUserFormState } from './AddUserForm';
import styles from './style.module.scss';

type AddUserProps = {
  handleRemove: (index: number) => void;
  state: UsersState;
  countries: {
    countryCode: FlagCodes;
    name: string;
  }[];
  onSubmit: (data: AddUserFormState) => void;
};

export default function AddUser(props: AddUserProps) {
  const { state, countries, handleRemove, onSubmit } = props;
  const { isUserRole } = useAppSelector(getUser);

  return (
    <div className={styles.wrapper}>
      <AddUserForm
        handleSubmit={onSubmit}
        countriesOptions={countries.map(({ name, countryCode }) => ({
          key: countryCode,
          value: name,
          Icon: <FlagIcon code={countryCode} width={24} height={24} />,
        }))}
        usersState={state}
        disabled={isUserRole}
      />
      <ul className={styles.users}>
        {state.map(({ email, countryCode }, index) => (
          <li key={email} className={styles.user}>
            <span>{email}</span>
            <div>
              <FlagIcon code={countryCode} width={24} height={24} />
              {!isUserRole && (
                <button
                  type="button"
                  className={styles.user__remove}
                  onClick={() => handleRemove(index)}
                >
                  <CloseIcon />
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
