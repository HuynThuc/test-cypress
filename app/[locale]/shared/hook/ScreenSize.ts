import { useMediaQuery } from '@react-hook/media-query';

/**
 * Custom hook for determining the screen size based on media queries.
 * @returns An object containing boolean values for different screen sizes.
 */
export const useScreenSize = () => {
  const sm = useMediaQuery('(min-width: 640px)');
  const md = useMediaQuery('(min-width: 768px)');
  const lg = useMediaQuery('(min-width: 1024px)');
  const xl = useMediaQuery('(min-width: 1280px)');
  const twoxl = useMediaQuery('(min-width: 1536px)');

  return { sm, md, lg, xl, twoxl };
};
