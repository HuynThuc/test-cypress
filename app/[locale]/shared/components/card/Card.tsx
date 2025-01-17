import classNames from 'classnames';
import { ReactElement } from 'react';

import { CardHeader, CardBody } from '.';
import { ExtendableComponentProps } from '../../types/ExtendComponentProps.types';
import classes from './Card.module.scss';

type CardNode = typeof CardHeader | typeof CardBody;

type Props = ExtendableComponentProps<
  'div',
  { children: ReactElement | ReactElement<CardNode>[] }
>;

export function Card({ children, className, ...props }: Props): ReactElement {
  if (Array.isArray(children)) {
    const header = children.find((el) => el.type === CardHeader);
    const body = children.find((el) => el.type === CardBody);

    return (
      <div className={classNames(classes['root'], className)} {...props}>
        {header}
        {body}
      </div>
    );
  }

  return (
    <div className={classNames(classes['root'], className)} {...props}>
      {children}
    </div>
  );
}
