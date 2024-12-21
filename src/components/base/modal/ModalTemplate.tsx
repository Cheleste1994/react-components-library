import clsx from 'clsx';
import { forwardRef } from 'react';

import { ReactComponent as Close } from '@assets/images/icons/closeCircle.svg';

import BaseButton from '../buttons/BaseButton';

import styles from './modal.module.scss';

type ButtonProps = {
  title: string;
  onChange: () => void;
  disabled?: boolean;
  type?: HTMLButtonElement['type'];
  form?: HTMLFormElement['form'];
};

type TitleProps = { title: string; caption: string };
type Gap = 'none' | 'sm' | 'md' | 'lg';

interface ModalTemplateProps {
  title?: string | TitleProps;
  titleAlign?: 'left' | 'center';
  btnClose?: () => void;
  btnCancel?: ButtonProps;
  btnConfirm?: ButtonProps;
  gap?: Gap;
}

const ModalTemplate = forwardRef(
  (props: React.PropsWithChildren<ModalTemplateProps>, ref: React.ForwardedRef<HTMLDivElement>) => {
    const { children, title, titleAlign = 'left', btnClose, ...rest } = props;
    const { btnCancel, btnConfirm, gap } = rest;

    const TitleWithoutClose = () =>
      !title ? (
        <></>
      ) : typeof title === 'string' ? (
        <div className={clsx(styles.template__title, styles[titleAlign])}>
          <h3>{title}</h3>
        </div>
      ) : (
        <div className={clsx(styles.template__title, styles[titleAlign])}>
          <h3>{title.title}</h3>
          <h4>{title.caption}</h4>
        </div>
      );

    return (
      <div className={clsx(styles.template, styles[`gap_${gap}`])} ref={ref}>
        {btnClose && typeof title === 'string' ? (
          <div className={clsx(styles.template__title, styles[titleAlign])}>
            <h3>{title}</h3>
            <button type="button" onClick={btnClose}>
              <Close />
            </button>
          </div>
        ) : (
          <TitleWithoutClose />
        )}

        {children}

        {(btnCancel || btnConfirm) && (
          <div className={styles.template__control}>
            {btnCancel && (
              <BaseButton
                title={btnCancel.title}
                onClick={btnCancel.onChange}
                maxWidth="full"
                color="secondary"
                disabled={btnCancel.disabled}
                type={btnCancel.type || 'button'}
                form={btnCancel.form}
              />
            )}
            {btnConfirm && (
              <BaseButton
                title={btnConfirm.title}
                onClick={btnConfirm.onChange}
                maxWidth="full"
                disabled={btnConfirm.disabled}
                type={btnConfirm.type || 'button'}
                form={btnConfirm.form}
              />
            )}
          </div>
        )}
      </div>
    );
  }
);

ModalTemplate.displayName = 'ModalTemplate';

export default ModalTemplate as typeof ModalTemplate;
