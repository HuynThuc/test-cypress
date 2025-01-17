import React, { ReactElement } from 'react';
import classNames from 'classnames';

import classes from './Dialog.module.scss';
import { ExtendableComponentProps } from '../../types/ExtendComponentProps.types';

type Props = ExtendableComponentProps<'div', { children: ReactElement }>;

const DialogCustomContent = ({ children, className, ...props }: Props) => {
  return (
    <div className={classNames(classes['content'], className)} {...props}>
      {children}
    </div>
  );
};

export default DialogCustomContent;
