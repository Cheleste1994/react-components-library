import { useEffect, useState } from 'react';

const DROPDOWN_HEIGHT = 400;
const HEADER_HEIGHT = 100;
const MIN_DROPDOWN_HEIGHT = 170;

function throttle(func: (...args: unknown[]) => void, limit: number) {
  let lastCall = 0;

  return (...args: unknown[]) => {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func(...args);
    }
  };
}

export type DropdownState = {
  align: 'top' | 'bottom';
  height: number;
  refRect: DOMRect | null;
  scrollTop: number;
};

export const useDynamicDropdown = (
  ref: React.RefObject<HTMLElement>,
  portalRef?: React.RefObject<HTMLElement>
) => {
  const [dropdownState, setDropdownState] = useState<DropdownState>({
    align: 'bottom',
    height: DROPDOWN_HEIGHT,
    refRect: null,
    scrollTop: 0,
  });

  const checkDropdownPosition = (scrollTop = 0) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const isTablet = window.innerWidth < 990;

      const spaceAbove = rect.top;
      const spaceBelow = windowHeight - rect.bottom;

      const calculateState = (align: 'top' | 'bottom', space: number) => ({
        align,
        height: Math.max(Math.min(DROPDOWN_HEIGHT, space - HEADER_HEIGHT), MIN_DROPDOWN_HEIGHT),
        refRect: rect,
        scrollTop,
      });

      if (isTablet) {
        if (
          spaceBelow < DROPDOWN_HEIGHT - HEADER_HEIGHT &&
          spaceAbove > spaceBelow &&
          spaceAbove > DROPDOWN_HEIGHT - HEADER_HEIGHT
        ) {
          setDropdownState(calculateState('top', spaceAbove));
        } else {
          if (spaceBelow < DROPDOWN_HEIGHT && spaceAbove > spaceBelow) {
            setDropdownState(calculateState('top', spaceAbove));
          } else {
            setDropdownState(calculateState('bottom', spaceBelow));
          }
        }
      }
      setDropdownState(calculateState('bottom', spaceBelow));
    }
    return;
  };

  const handleScroll = () => {
    const container = portalRef?.current;

    if (container) {
      const scrollTop = container.scrollTop;
      checkDropdownPosition(scrollTop);
    }
  };

  useEffect(() => {
    const container = portalRef?.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [portalRef]);

  useEffect(() => {
    const throttledCheckDropdownPosition = throttle(() => {
      checkDropdownPosition();
    }, 100);

    checkDropdownPosition();

    window.addEventListener('scroll', throttledCheckDropdownPosition);
    window.addEventListener('resize', throttledCheckDropdownPosition);

    return () => {
      window.removeEventListener('scroll', throttledCheckDropdownPosition);
      window.removeEventListener('resize', throttledCheckDropdownPosition);
    };
  }, [ref, portalRef]);

  return dropdownState;
};
