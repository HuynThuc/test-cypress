import classNames from 'classnames';
import { ReactElement } from 'react';

import classes from './Card.module.scss';
import { ExtendableComponentProps } from '../../types/ExtendComponentProps.types';

type Props = ExtendableComponentProps<'div', { children: ReactElement }>;

export function CardBody({ children, className, ...props }: Props) {
  return (
    <div className={classNames(classes['body'], className)} {...props}>
      {children}
    </div>
  );
}
