/* eslint-disable no-unused-vars */
'use client';

import { ReactElement } from 'react';
import classNames from 'classnames';

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '../shacdn-ui/Dialog.components';
import { ExtendableComponentProps } from '../../types/ExtendComponentProps.types';
import classes from './Dialog.module.scss';
import DialogCustomContent from './DialogCustomContent';
import DialogCustomTrigger from './DialogCustomTrigger';

type CardNode = typeof DialogCustomTrigger | typeof DialogCustomContent;

type Props = ExtendableComponentProps<
  'div',
  {
    children: ReactElement | ReactElement<CardNode>[];
    isOpenDialog: boolean;
    width: string;
    toggleDialog: (value: boolean) => void;
  }
>;

export function DialogCustom({
  children,
  className,
  isOpenDialog,
  width,
  toggleDialog,
  ...props
}: Props): ReactElement {
  if (Array.isArray(children)) {
    const content = children.find((el) => el.type === DialogCustomContent);
    const trigger = children.find((el) => el.type === DialogCustomTrigger);
    const dialogContentClassname = classNames(
      'bg-white max-h-[720px] overflow-auto',
      width,
    );
    return (
      <div className={classNames(classes['root'], className)} {...props}>
        <Dialog
          open={isOpenDialog}
          modal={isOpenDialog}
          onOpenChange={toggleDialog}
        >
          <DialogTrigger asChild>{trigger}</DialogTrigger>
          <DialogContent className={dialogContentClassname}>
            {content}
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className={classNames(classes['root'], className)} {...props}>
      {children}
    </div>
  );
}
