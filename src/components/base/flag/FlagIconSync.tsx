import React, { Fragment } from 'react';

import { ReactComponent as UAEIcon } from '@images/flags/ae.svg';
import { ReactComponent as BulgariaIcon } from '@images/flags/bg.svg';
import { ReactComponent as BelarusIcon } from '@images/flags/by.svg';
import { ReactComponent as FranceIcon } from '@images/flags/fr.svg';
import { ReactComponent as CroatiaIcon } from '@images/flags/hr.svg';
import { ReactComponent as IndiaIcon } from '@images/flags/in.svg';
import { ReactComponent as PolandIcon } from '@images/flags/pl.svg';
import { ReactComponent as RussiaIcon } from '@images/flags/ru.svg';
import { ReactComponent as USAIcon } from '@images/flags/us.svg';

import { FlagCodes } from './flagCodes';

export const NameToFlag: { [key in FlagCodes]: React.FunctionComponent } = {
  by: BelarusIcon,
  fr: FranceIcon,
  in: IndiaIcon,
  pl: PolandIcon,
  ru: RussiaIcon,
  hr: CroatiaIcon,
  ae: UAEIcon,
  bg: BulgariaIcon,
  us: USAIcon,
  ab: Fragment,
  ad: Fragment,
  af: Fragment,
  ag: Fragment,
  ai: Fragment,
  al: Fragment,
  am: Fragment,
  ao: Fragment,
  ar: Fragment,
  at: Fragment,
  au: Fragment,
  aw: Fragment,
  az: Fragment,
  bh: Fragment,
  bs: Fragment,
  kz: Fragment,
  li: Fragment,
  lr: Fragment,
  lu: Fragment,
  md: Fragment,
  mg: Fragment,
  mo: Fragment,
  mw: Fragment,
  my: Fragment,
  bd: Fragment,
  mh: Fragment,
  ml: Fragment,
  mq: Fragment,
  mr: Fragment,
  mt: Fragment,
  mu: Fragment,
  mv: Fragment,
  mx: Fragment,
};

interface FlagProps {
  code: FlagCodes;
}

const FlagIconSync = ({ code }: FlagProps): React.ReactNode => {
  if (code in NameToFlag) {
    return NameToFlag[code]({});
  }

  return null;
};

export default FlagIconSync;
