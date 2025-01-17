import { useRouter } from 'next/navigation';

import { ISideNav } from '@/modules/learners/types';

export const ListSideNavItem = ({
  listItem,
  pathRouter,
}: {
  listItem: ISideNav[];
  pathRouter: string;
}) => {
  const router = useRouter();
  return (
    <ul>
      {listItem.map((item: ISideNav) => (
        <li
          key={item.value}
          className="hover:bg-[#7e3aaf33] pr-4 pl-[72px] py-3 text-base select-none transition-height duration-300 ease-in-out h-[52px]"
          onClick={() => router.push(`${pathRouter}/${item.value}`)}
        >
          {item.title}
        </li>
      ))}
    </ul>
  );
};
