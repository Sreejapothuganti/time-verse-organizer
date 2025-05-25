import { useEffect, useState } from 'react';

export const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    checkSize();

    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, [breakpoint]);

  return isMobile;
};
