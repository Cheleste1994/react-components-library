import { useState } from 'react';

export const useModal = (
  initialState = false
): readonly [boolean, (isOpenModal?: boolean | unknown) => void] => {
  const [isOpen, setOpen] = useState(initialState);

  const handleModal = (isOpenModal?: boolean | unknown) => {
    setOpen((s) => (typeof isOpenModal === 'boolean' ? isOpenModal : !s));
  };

  return [isOpen, handleModal] as const;
};
