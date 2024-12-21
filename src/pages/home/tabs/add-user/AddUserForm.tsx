import { Controller, useForm } from 'react-hook-form';

import { useModal } from '@/hooks/useModal';

import Autocomplete, { Options } from '@components/base/autocomplete/Autocomplete';
import BaseButton from '@components/base/buttons/BaseButton';
import Modal from '@components/base/modal/Modal';
import ModalTemplate from '@components/base/modal/ModalTemplate';
import BaseTextInput from '@components/base/text-input/BaseTextInput';

import { UsersState } from '../..';

import styles from './style.module.scss';

const USER_FORM_NAME = 'userForm';
const EMAIL_REGEXP =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

export type AddUserFormState = {
  email: string;
  country: string;
};

type AddUserFormProps = {
  handleSubmit: (data: AddUserFormState) => void;
  countriesOptions: Options;
  usersState: UsersState;
  disabled: boolean;
};

export default function AddUserForm(props: AddUserFormProps) {
  const [open, toogleModal] = useModal();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddUserFormState>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const onSubmit = (data: AddUserFormState) => {
    props.handleSubmit(data);
    toogleModal();
  };

  return (
    <div>
      <BaseButton title="Добавить" onClick={toogleModal} disabled={props.disabled} />
      <Modal open={open} handleClose={toogleModal}>
        <ModalTemplate
          title={'Добавить пользователя'}
          titleAlign="center"
          btnCancel={{ title: 'Закрыть', onChange: toogleModal }}
          btnConfirm={{
            title: 'Добавить',
            type: 'submit',
            form: USER_FORM_NAME,
            onChange: () => {},
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)} id={USER_FORM_NAME} className={styles.form}>
            <BaseTextInput
              title="Email"
              {...register('email', {
                required: true,
                pattern: EMAIL_REGEXP,
                validate: (value) => !props.usersState.some(({ email }) => value === email),
              })}
              error={Boolean(errors.email)}
              autoComplete="email"
            />
            <Controller
              control={control}
              name={`country`}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value }, fieldState: { invalid } }) => (
                <Autocomplete
                  title="Страна"
                  placeholder="Выберите страну"
                  options={props.countriesOptions}
                  checkedKey={value}
                  onChecked={(o) => onChange(o?.key || '')}
                  withPortal
                  error={invalid}
                />
              )}
            />
          </form>
        </ModalTemplate>
      </Modal>
    </div>
  );
}
