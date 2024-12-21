import { Link, useOutlet } from 'react-router-dom';

import FlagIcon from '@components/base/flag/FlagIcon';

import { UsersState } from '../..';

import styles from './style.module.scss';

type ViewUserProps = {
  state: UsersState;
};

export default function ViewUser(props: ViewUserProps) {
  const { state } = props;
  const Outlet = useOutlet();

  if (Outlet) return Outlet;

  return (
    <div className={styles.wrapper}>
      {state.map(({ countryCode, email }) => (
        <Link to={email} key={email} className={styles.card}>
          <div>{email}</div>
          <div className={styles.card__flag}>
            <FlagIcon code={countryCode} />
          </div>
        </Link>
      ))}
    </div>
  );
}
