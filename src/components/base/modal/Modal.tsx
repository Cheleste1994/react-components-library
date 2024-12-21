import { CSSProperties, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import styles from './modal.module.scss';

type MaxWidth = number | string;

interface ModalProps {
  open: boolean;
  handleClose?: () => void;
  maxWidth?: MaxWidth;
}

export default function Modal(props: React.PropsWithChildren<ModalProps>) {
  const { children, open, handleClose, maxWidth } = props;

  const refModal = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = document.getElementById('root');

    if (open && root) {
      root.ariaHidden = 'true';
    }

    return () => {
      if (open && root) {
        root.ariaHidden = null;
      }
    };
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        handleClose?.();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (open) {
        document.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [refModal, open]);

  return (
    <>
      {open &&
        createPortal(
          <div
            className={styles.wrapper}
            aria-labelledby="modal"
            role="presentation"
            ref={refModal}
          >
            <div className={styles.wrapper__bg} aria-hidden="true" onClick={handleClose} />
            <div
              className={styles.modal}
              style={
                {
                  '--modal-max-width': typeof maxWidth === 'number' ? maxWidth + 'px' : maxWidth,
                } as CSSProperties
              }
            >
              {children}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
