import clsx from 'clsx';
import { CSSProperties, forwardRef } from 'react';

import { FontStyle } from '@/constants/fonts';

import { ReactComponent as SuccessIcon } from '@icons/tickCircle.svg';
import { ReactComponent as WarningIcon } from '@icons/timer.svg';

import styles from './base-text-input.module.scss';

type InputHeight = 'sm' | 'sm-30' | 'md' | 'lg' | 'full';
type Padding = 'sm' | 'md' | 'lg' | 'none';
type Gap = 'none' | 'sm' | 'md' | 'lg';
type Radius = 'sm' | 'md' | 'lg';
type InputMaxWidth = 'md' | 'lg' | 'full';
type TextAlign = 'center' | 'left' | 'right';
type Border = 'none';
type IconEnd = React.ReactNode | { icon: React.ReactNode; size: 'sm' | 'md' | 'lg' };

export interface BaseTextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  error?: string | boolean;
  warning?: string | boolean;
  success?: string | boolean;
  IconStart?: React.ReactNode;
  IconEnd?: IconEnd;
  height?: InputHeight;
  maxWidth?: InputMaxWidth;
  textAlign?: TextAlign;
  padding?: Padding;
  radius?: Radius;
  fontStyle?: FontStyle;
  gap?: Gap;
  border?: Border;
  textUpperCase?: boolean;
}

const BaseTextInput = forwardRef(
  (props: BaseTextInputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const { title, error, warning, success, IconEnd, IconStart, gap, ...rest } = props;
    const { height, maxWidth, textAlign = 'left', padding, radius, ...r } = rest;
    const { fontStyle = 'body-text-regular', border, textUpperCase, ...inputProps } = r;

    return (
      <label
        className={clsx(
          styles.label,
          styles[`padding_${padding}`],
          styles[`radius_${radius}`],
          styles[`height_${height}`],
          styles[`max-width_${maxWidth}`],
          styles[`gap_${gap}`],
          styles[`border_${border}`],
          {
            [styles.title]: Boolean(title),
            [styles.error]: Boolean(error),
            [styles.warning]: Boolean(warning),
            [styles.success]: Boolean(success),
            [styles.upperCase]: textUpperCase,
          },
          fontStyle
        )}
        data-title={title}
        aria-label={title}
        style={
          {
            '--input-text-align': textAlign,
          } as CSSProperties
        }
      >
        {IconStart && <div className={styles.icon__start}>{IconStart}</div>}
        <input {...inputProps} ref={ref} />
        {warning || success ? (
          <div className={styles.icon__end}>
            {warning && !success && <WarningIcon />}
            {success && !warning && <SuccessIcon />}
          </div>
        ) : typeof IconEnd === 'object' && IconEnd !== null && 'size' in IconEnd ? (
          <div className={clsx(styles.icon__end, styles[`size_${IconEnd.size}`])}>
            {IconEnd.icon}
          </div>
        ) : IconEnd ? (
          <div className={styles.icon__end}>{IconEnd}</div>
        ) : null}
      </label>
    );
  }
);

BaseTextInput.displayName = 'BaseTextInput';

export default BaseTextInput as typeof BaseTextInput;
