import { useDeferredValue } from 'react';

import BaseTextInput from '@components/base/text-input/BaseTextInput';
import Filters from '@components/custom/filters/Filters';
import { Direction, StatusesData } from '@components/custom/filters/FiltersDropdown';

import { ReactComponent as SearchIcon } from '@icons/searchNormal.svg';

import styles from './users-filter.module.scss';

type UsersFilterProps = {
  state: {
    currentPage: number;
    currentSearch: string;
    currentStatus: string[];
    currentRoute: string[];
  };
  setState: {
    handleSearch: (search: string) => void;
    handleStatuses: (code: string) => void;
    handleDirection: (routeId: string) => void;
    handleResetFilter: () => void;
    handlePagination: (value: number) => void;
  };
  statuses: StatusesData[];
  directions: Direction[];
  isFIlterModal?: boolean;
};

export default function UsersFilter(props: UsersFilterProps) {
  const { state, setState, directions, statuses, isFIlterModal } = props;

  const { currentSearch } = state;
  const { handleDirection, handleResetFilter, handleSearch, handleStatuses } = setState;

  const currentSearchDeferred = useDeferredValue(currentSearch);

  return (
    <div className={styles.filters}>
      <div>
        <Filters
          isModal={isFIlterModal}
          directions={directions}
          statuses={statuses}
          onDirecion={handleDirection}
          onStatus={handleStatuses}
          onReset={handleResetFilter}
        />
      </div>
      <BaseTextInput
        height="sm-30"
        placeholder="Искать по пользователям"
        IconEnd={{ icon: <SearchIcon />, size: 'sm' }}
        value={currentSearchDeferred}
        onChange={(e) => handleSearch(e.target.value)}
        maxWidth="lg"
      />
    </div>
  );
}
