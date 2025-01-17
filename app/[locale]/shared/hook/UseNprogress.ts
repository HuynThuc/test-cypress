import { useEffect } from 'react';
import NProgress from 'nprogress';
import { usePathname, useSearchParams } from 'next/navigation';

const useRouteChangeNProgress = () => {
  const pathname = usePathname(); // Hook to detect pathname change
  const searchParams = useSearchParams(); // Hook to detect query params change

  useEffect(() => {
    // Start the progress bar when route change begins
    NProgress.start();

    // Stop the progress bar after a small delay (for smooth transition)
    const timer = setTimeout(() => {
      NProgress.done();
    }, 250); // Adjust this delay as needed for smooth transitions

    return () => {
      clearTimeout(timer); // Clear the timer to avoid memory leaks
    };
  }, [pathname, searchParams]); // Re-run effect when pathname or searchParams change
};

export default useRouteChangeNProgress;
