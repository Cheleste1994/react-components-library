import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import styles from './base-checkbox.module.scss';

interface ClassNamesProps {
  label?: string;
  title?: string;
}

type CheckboxSizes = 'sm' | 'md' | 'lg';
type CheckboxGap = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
type AlignTitle = 'start' | 'end';
type AlignItems = 'top' | 'center';
type CheckboxMaxWidth = 'full';

interface BaseCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  classNames?: ClassNamesProps;
  sizeCheckbox?: CheckboxSizes;
  alignTitle?: AlignTitle;
  gap?: CheckboxGap;
  alignItems?: AlignItems;
  maxWidth?: CheckboxMaxWidth;
}

export default function BaseCheckbox({ children, ...props }: PropsWithChildren<BaseCheckboxProps>) {
  const { title, classNames, sizeCheckbox, alignItems = 'center', ...rest } = props;
  const { alignTitle = 'end', gap = 'md', maxWidth, ...inputProps } = rest;

  return (
    <label
      className={clsx(
        styles.label,
        classNames?.label,
        styles[`gap_${gap}`],
        styles[`items_${alignItems}`],
        styles[`max-width_${maxWidth}`]
      )}
    >
      {title && alignTitle === 'start' && <span className={clsx(classNames?.title)}>{title}</span>}
      <div className={clsx(styles.container, styles[`size_${sizeCheckbox}`])}>
        <input type="checkbox" {...inputProps} />
        <span className={styles.checkmark} />
      </div>

      {title && alignTitle === 'end' && <span className={clsx(classNames?.title)}>{title}</span>}
      {children}
    </label>
  );
}
