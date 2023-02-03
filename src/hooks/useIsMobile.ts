import { useEffect, useState } from 'react';

const useIsMobile = () => {
  const [size, setSize] = useState([0, 0]);

  useEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return size[0] < 768; // Match md tag from tailwindcss: https://tailwindcss.com/docs/responsive-design
};

export default useIsMobile;
