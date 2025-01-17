'use client';

import { usePathname, useRouter } from 'next/navigation';
import classNames from 'classnames';

import { ScrollArea, ScrollBar } from '../shacdn-ui/ScrollArea.components';

interface Item {
  name: string;
  href: string;
}
interface HorizontalNavigationProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items: Item[];
}

export function HorizontalNavigation({
  items,
  className,
  ...props
}: HorizontalNavigationProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigate = (href: string) => {
    router.push(`/${href}`);
  };
  return (
    <div className="relative">
      <ScrollArea className="p-2 lg:max-w-none ">
        <div
          className={classNames('mb-4 flex items-center gap-2', className)}
          {...props}
        >
          {items.map((item) => (
            <div
              key={item.href}
              className={classNames(
                'flex items-center rounded-full bg-red-100 py-1 px-4 text-sm',
                pathname == `/${item.href}`
                  ? ' font-medium text-primary'
                  : ' font-light text-muted-foreground cursor-pointer text-black',
              )}
              onClick={() => handleNavigate(item.href)}
            >
              {item.name}
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  );
}
