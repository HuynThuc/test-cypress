import React, { ReactElement } from 'react';
import classNames from 'classnames';

import classes from './Dropdown.module.scss';
import { ExtendableComponentProps } from '../../types/ExtendComponentProps.types';

type Props = ExtendableComponentProps<'div', { children: ReactElement }>;

export const Icon = ({ children, className, ...props }: Props) => {
  return (
    <div className={classNames(classes['dropdown-icon'], className)} {...props}>
      {children}
    </div>
  );
};
