import { LAYOUT_CONTENT } from '@/constants/locales/layout';
import { useAppSelector } from '@/store/redux/hooks';
import { getLanguage } from '@/store/redux/slice/user.slice';
import { UserLanguage } from '@/types/user';

const TEXT = {
  LAYOUT_CONTENT,
};

export type TextKeys = keyof typeof TEXT;
export type TextValue<T extends TextKeys> = (typeof TEXT)[T][keyof (typeof TEXT)[T]];

export const useText = <T extends TextKeys = 'LAYOUT_CONTENT'>(
  dictionary: T = 'LAYOUT_CONTENT' as T
): TextValue<T> => {
  const language: UserLanguage = useAppSelector(getLanguage);

  return TEXT[dictionary][language] as TextValue<T>;
};
