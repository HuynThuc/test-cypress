import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// eslint-disable-next-line no-unused-vars
const useTrackRouteChange = (pageview: (url: string) => void) => {
  const pathname = usePathname(); // Detects path changes
  const searchParams = useSearchParams(); // Detects query parameter changes

  useEffect(() => {
    const url = `${pathname}?${searchParams}`; // Construct URL with search params

    // Call the pageview function when route changes
    pageview(url);
  }, [pathname, searchParams]); // Trigger whenever the pathname or search params change
};

export default useTrackRouteChange;
