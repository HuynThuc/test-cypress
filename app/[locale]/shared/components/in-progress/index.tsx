import Link from 'next/link';

export const InProgressComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 pt-24">
      <p className="text-2xl font-semibold">
        EngWays development team announced
      </p>

      <p className="max-w-screen-md px-4 text-center md:text-lg">
        We are working on the integration, if you have any questions feel free
        to contact us...
      </p>

      <Link
        href="/"
        scroll={false}
        className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold outline-none hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 md:text-base"
      >
        Back to Home
      </Link>
    </div>
  );
};
