import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="h-full w-full flex items-center justify-center dark:bg-white dark:text-whit text-black bg-white">
      <div className="text-center 2xl:text-2xl xl:text-xl md:text-md">
        <div className="text-gray-700 2xl:text-[40px] ">Page not found</div>
        <Link
          href="/"
          className="mt-4 inline-block dark:bg-purple-600 dark:text-white border border-purple-600 text-purple-600 hover:bg-purple-500 hover:text-white py-2 px-4 rounded-full dark:hover:bg-purple-700"
        >
          Go to homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
