import clsx from 'clsx';
import { CSSProperties, useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';

import { useDynamicDropdown } from '@/hooks/useDinamicDropdown';

import { ReactComponent as ArrowDown } from '@icons/arrowDown.svg';
import { ReactComponent as CloseIcon } from '@icons/close.svg';

import AutocompleteDropdown from './AutocompleteDropdown';
import Option from './Option';
import styles from './autocomplete.module.scss';

type InputHeight = 'sm' | 'md' | 'lg';
type InputMaxWidth = 'md' | 'full';
type TextAlign = 'center' | 'left' | 'right';

export type Option = {
  key: string;
  value: string;
  Icon?: React.ReactNode | JSX.Element;
};

export type Options = (Option & { options?: Option[] })[];

export type TypeOptions = 'radio' | 'none';

interface AutocompleteProps {
  title?: string;
  height?: InputHeight;
  maxWidth?: InputMaxWidth;
  textAlign?: TextAlign;
  options?: Options;
  placeholder?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  notFound?: string;
  checkedKey?: Option['key'];
  onChecked?: (option: Omit<Option, 'Icon'> | null) => void;
  disabled?: boolean;
  type?: TypeOptions;
  error?: boolean;
  textUpperCase?: boolean;
  withPortal?: boolean;
  portalRef?: React.RefObject<HTMLElement>;
}

export default function Autocomplete(props: AutocompleteProps) {
  const { title, options = [], placeholder, inputProps, disabled, ...rest } = props;
  const { height, maxWidth, textAlign = 'left', notFound, checkedKey, ...r } = rest;
  const { type, onChecked, error, textUpperCase, withPortal, portalRef } = r;

  const checkedOption = useMemo(() => {
    if (!options[0]?.options) {
      return options.find(({ key }) => checkedKey === key) || null;
    }

    let option: Option | null = null;

    options.forEach((o) => {
      if (!option) {
        option = o.options?.find(({ key }) => checkedKey === key) || null;
      }
    });

    return option;
  }, [checkedKey, options]);

  const [inputValue, setIputValue] = useState(checkedOption?.value || '');

  useEffect(() => {
    setIputValue(checkedOption?.value || inputValue);
  }, [checkedOption]);

  useEffect(() => {
    if (inputValue !== checkedOption?.value && !(inputValue === '' && checkedOption === null)) {
      onChecked?.(null);
    }
  }, [inputValue]);

  const refLabel = useRef<HTMLLabelElement | null>(null);

  const dropdownState = useDynamicDropdown(refLabel, portalRef);

  const optionsFilter = useMemo(() => {
    if (!inputValue || checkedOption) {
      return options;
    }

    if (!options[0]?.options) {
      return options.filter(({ value }) =>
        value.toLowerCase().startsWith(inputValue.toLowerCase())
      );
    }

    return options
      .map(({ options, ...rest }) => ({
        ...rest,
        options: options?.filter(({ value }) =>
          value.toLowerCase().startsWith(inputValue.toLowerCase())
        ),
      }))
      .filter((s) => s.options?.length);
  }, [inputValue, options]);

  const dataDeferred = useDeferredValue(optionsFilter);

  const handleClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIputValue(() => '');
    refLabel.current?.focus();
  };

  return (
    <label
      className={clsx(styles.label, styles[`height_${height}`], styles[`max-width_${maxWidth}`], {
        [styles.title]: Boolean(title),
        [styles.error]: error,
        [styles.upperCase]: textUpperCase,
      })}
      data-title={title}
      aria-label={title}
      style={
        {
          '--input-text-align': textAlign,
        } as CSSProperties
      }
      ref={refLabel}
      onBlur={() => !checkedOption && setIputValue('')}
    >
      {checkedOption?.Icon && (
        <div className={styles.icon__start} key={checkedOption.key}>
          {checkedOption.Icon}
        </div>
      )}
      <input
        value={inputValue}
        onChange={(e) => setIputValue(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        {...inputProps}
      />
      <div className={styles.icon__end}>
        {checkedOption && type !== 'radio' && (
          <button type="button" className={styles.icon__end_close} onMouseDown={handleClose}>
            <CloseIcon />
          </button>
        )}
        <ArrowDown className={styles.icon__end_arrow} />
      </div>

      <AutocompleteDropdown
        data={dataDeferred}
        checkedOption={checkedOption}
        onChecked={onChecked}
        type={type}
        notFound={notFound}
        dropdownState={dropdownState}
        isActive={Boolean(options.length)}
        withPortal={withPortal}
      />
    </label>
  );
}
