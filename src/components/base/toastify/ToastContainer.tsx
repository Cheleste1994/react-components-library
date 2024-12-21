import clsx from 'clsx';
import { useContext } from 'react';
import { createPortal } from 'react-dom';
import { ToastContainer as Toastify, TypeOptions as TypeOptionsDefault } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { MobileContext } from '@/store/contexts/MobileContext';
import { TabletContext } from '@/store/contexts/TabletContext';

import ToastStylesReset from './ToastStylesReset';
import styles from './toast-container.module.scss';

type TypeOptions<T> = { [key in TypeOptionsDefault]: T };

const contextClass: Partial<TypeOptions<string>> = {
  success: styles.toastify__toast_success,
  error: styles.toastify__toast_error,
};

export default function ToastContainer() {
  const isMobile = useContext(MobileContext);
  const isTablet = useContext(TabletContext);

  return (
    <>
      {createPortal(
        <Toastify
          position={isMobile || isTablet ? 'top-center' : 'top-right'}
          autoClose={5000}
          closeOnClick
          hideProgressBar
          stacked
          rtl={false}
          pauseOnHover
          draggable="mouse"
          className={styles.toastify}
          toastClassName={(context) =>
            clsx(styles.toastify__toast, contextClass[context?.type || 'default'])
          }
          bodyClassName={styles.toastify__body}
          closeButton={false}
        />,
        document.body
      )}
      <ToastStylesReset />
    </>
  );
}
