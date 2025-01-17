import React, { ReactElement } from 'react';
import classNames from 'classnames';

import classes from './Dialog.module.scss';
import { ExtendableComponentProps } from '../../types/ExtendComponentProps.types';

type Props = ExtendableComponentProps<'div', { children: ReactElement }>;

const DialogCustomTrigger = ({ children, className, ...props }: Props) => {
  return (
    <div className={classNames(classes['trigger'], className)} {...props}>
      {children}
    </div>
  );
};

export default DialogCustomTrigger;
