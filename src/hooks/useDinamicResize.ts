import { SetStateAction, useEffect, useState } from 'react';

export const useDinamicResize = (ref: React.RefObject<HTMLElement>, enabled?: boolean) => {
  const [isClick, setIsClick] = useState<{ isActive: boolean; direction: 'left' | 'right' }>({
    isActive: false,
    direction: 'left',
  });

  const [resize, setResize] = useState(0);

  const onMouseDown = () => {
    if (!isClick.isActive) return;

    setIsClick({ ...isClick, isActive: false });
  };

  useEffect(() => {
    if (!isClick.isActive) {
      setResize(0);
    }
  }, [isClick.isActive]);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isClick.isActive || !ref.current) return;
      const { width } = ref.current.getBoundingClientRect();
      const x = e.layerX;

      if (x < width / 2 && isClick.direction === 'left') {
        setResize(x);
      }
      if (x > width / 2 && isClick.direction === 'right') {
        setResize(width - x);
      }
    };

    const container = ref?.current;

    if (container) {
      if (isClick.isActive) {
        container.addEventListener('mousemove', onMouseMove);
      }
    }
    window.addEventListener('mouseup', onMouseDown);

    return () => {
      if (container) {
        container.removeEventListener('mousemove', onMouseMove);
      }
      window.removeEventListener('mouseup', onMouseDown);
    };
  }, [isClick, ref, enabled]);

  const handleSetIsClick = (
    state: SetStateAction<{ isActive: boolean; direction: 'left' | 'right' }>
  ) => {
    if (enabled) {
      setIsClick(state);
    }
  };

  return [resize, handleSetIsClick] as const;
};
