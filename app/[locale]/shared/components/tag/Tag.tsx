import classNames from 'classnames';

import classes from './Tag.module.scss';

interface TagProps {
  label: string;
  bgColor: string;
}

export function Tag({ label, bgColor }: TagProps) {
  return (
    <span
      // className={`max-w-[500px] text-black truncate px-2 py-1 font-medium rounded-lg border bg-[${bgColor}]`}
      className={classNames(
        classes['tag'],
        `max-w-[500px] text-black truncate px-2 py-1 font-medium rounded-lg border bg-[${bgColor}]`,
      )}
    >
      {label}
    </span>
  );
}
