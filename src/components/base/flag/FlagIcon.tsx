import { FC, SVGProps, useLayoutEffect, useState } from 'react';

import { FlagCodes } from './flagCodes';

const loadFlagIcon = async (code: FlagCodes) => {
  try {
    const { ReactComponent } = await import(`@images/flags/${code.toLowerCase()}.svg`);
    return ReactComponent;
  } catch {
    return null;
  }
};

type FlagIconProps = {
  code: FlagCodes;
} & React.SVGProps<SVGSVGElement>;

const FlagIcon: FC<FlagIconProps> = ({ code, ...props }): JSX.Element | null => {
  const [IconComponent, setIconComponent] = useState<FC<SVGProps<SVGSVGElement>> | null>();

  useLayoutEffect(() => {
    loadFlagIcon(code).then((Component) => {
      if (Component) setIconComponent(() => Component);
    });
  }, [code]);

  return IconComponent ? <IconComponent {...props} /> : null;
};

export default FlagIcon;
