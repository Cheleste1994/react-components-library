import clsx from 'clsx';
import React, { FC } from 'react';

import { FontStyle } from '@/constants/fonts';

import styles from './base-button.module.scss';

interface ClassNamesProps {
  button?: string;
  title?: string;
}

type ButtonColors = 'primary' | 'secondary' | 'none';
type ButtonHeight = 'sm' | 'md' | 'lg';
type ButtonPadding = 'sm' | 'md' | 'lg';
type ButtonMaxWidth = 'md' | 'lg' | 'full';
type AlignItems = 'center' | 'left' | 'right';

type Icon = React.ReactNode | { icon: React.ReactNode; size: 'sm' | 'md' | 'lg' };

interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  Icon?: React.FunctionComponent;
  title: string;
  color?: ButtonColors;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  classNames?: ClassNamesProps;
  height?: ButtonHeight;
  maxWidth?: ButtonMaxWidth;
  alignItems?: AlignItems;
  padding?: ButtonPadding;
  IconStart?: Icon;
  IconEnd?: Icon;
  fontStyle?: FontStyle;
}

const BaseButton: FC<BaseButtonProps> = (props) => {
  const { Icon, title, onClick, color = 'primary', padding = 'lg', classNames, ...rest } = props;
  const { height = 'md', maxWidth = 'md', alignItems = 'center', ...r } = rest;
  const { IconStart, IconEnd, fontStyle, ...btnProps } = r;

  return (
    <button
      onClick={onClick}
      className={clsx(
        styles.btn,
        styles[color],
        classNames?.button,
        styles[`height_${height}`],
        styles[`max-width_${maxWidth}`],
        styles[`padding_${padding}`]
      )}
      type="button"
      {...btnProps}
      style={{
        justifyContent: alignItems,
        ...btnProps.style,
      }}
    >
      {typeof IconStart === 'object' && IconStart !== null && 'size' in IconStart ? (
        <div className={clsx(styles.icon__end, styles[`size_${IconStart.size}`])}>
          {IconStart.icon}
        </div>
      ) : IconStart ? (
        <div className={styles.icon__end}>{IconStart}</div>
      ) : null}
      {Icon && <Icon />}
      <span className={clsx(classNames?.title, fontStyle)}>{title}</span>
      {typeof IconEnd === 'object' && IconEnd !== null && 'size' in IconEnd ? (
        <div className={clsx(styles.icon__end, styles[`size_${IconEnd.size}`])}>{IconEnd.icon}</div>
      ) : IconEnd ? (
        <div className={styles.icon__end}>{IconEnd}</div>
      ) : null}
    </button>
  );
};

export default BaseButton;
