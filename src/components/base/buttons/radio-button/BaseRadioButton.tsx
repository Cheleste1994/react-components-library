import clsx from 'clsx';

import styles from './base-radio-button.module.scss';

interface ClassNamesProps {
  label?: string;
  title?: string;
}

type RadioSizes = 'sm' | 'md' | 'lg';
type RadioGap = 'none' | 'sm' | 'md' | 'lg';
type AlignTitle = 'start' | 'end';

interface BaseRadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  classNames?: ClassNamesProps;
  sizeRadio?: RadioSizes;
  alignTitle?: AlignTitle;
  gap?: RadioGap;
}
export default function BaseRadioButton(props: BaseRadioButtonProps) {
  const { title, classNames, sizeRadio, ...rest } = props;
  const { alignTitle = 'end', gap = 'md', ...inputProps } = rest;

  return (
    <label className={clsx(styles.label, classNames?.label, styles[`gap_${gap}`])}>
      {title && alignTitle === 'start' && <span className={clsx(classNames?.title)}>{title}</span>}
      <div className={clsx(styles.container, styles[`size_${sizeRadio}`])}>
        <input type="radio" {...inputProps} />
        <span className={styles.checkmark} />
      </div>

      {title && alignTitle === 'end' && <span className={clsx(classNames?.title)}>{title}</span>}
    </label>
  );
}
