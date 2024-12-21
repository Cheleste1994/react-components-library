import { ReactComponent as CloseIcon } from '@/assets/images/icons/closeCircle.svg';

import styles from './toast-container.module.scss';

type ToastProps = {
  title?: string;
  description?: string;
};

export default function Toast({ title, description }: ToastProps) {
  return (
    <div className={styles.toast}>
      {title && (
        <h2 className={styles.toast__title}>
          {title} <CloseIcon className={styles.toast__close} />
        </h2>
      )}
      {description && (
        <span className={styles.toast__description}>
          {description}
          {!title && <CloseIcon className={styles.toast__close} />}
        </span>
      )}
    </div>
  );
}
