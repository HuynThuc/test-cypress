import classNames from 'classnames';
import { ReactElement } from 'react';

import classes from './Card.module.scss';
import { ExtendableComponentProps } from '../../types/ExtendComponentProps.types';

type Props = ExtendableComponentProps<'div', { children: ReactElement }>;

export function CardHeader({ children, className, ...props }: Props) {
  return (
    <div className={classNames(classes['header'], className)} {...props}>
      {children}
    </div>
  );
}
