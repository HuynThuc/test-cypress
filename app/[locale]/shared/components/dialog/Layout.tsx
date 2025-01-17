/* eslint-disable no-unused-vars */
'use client';

import { ReactElement } from 'react';
import classNames from 'classnames';

import { DialogCustom } from './Dialog';
import DialogCustomTrigger from './DialogCustomTrigger';
import DialogCustomContent from './DialogCustomContent';
import { ButtonVariant } from '../../types/Button.types';
import { Button } from '../shacdn-ui/Button.components';
import TooltipCustom from '../tooltip/Tooltip.component';

interface Props {
  isOpenDialog: boolean;
  btnLabel: string | ReactElement;
  children: ReactElement;
  toggleDialog: (value: boolean) => void;

  width?: string;
  btnVariant?: ButtonVariant;
  backgroundBtnColor?: string;
  icon?: () => string | React.ReactElement;
}

export function DialogLayout({
  isOpenDialog,
  btnLabel,
  children,
  toggleDialog,

  width,
  btnVariant,
  backgroundBtnColor,
  icon,
}: Props): ReactElement {
  return (
    <DialogCustom
      isOpenDialog={isOpenDialog}
      toggleDialog={toggleDialog}
      width={width || 'w-[1000px]'}
    >
      <DialogCustomTrigger>
        {icon ? (
          <TooltipCustom title={icon} content={btnLabel} />
        ) : (
          <Button
            variant={btnVariant}
            onClick={() => toggleDialog(!isOpenDialog)}
            className={classNames(backgroundBtnColor, 'text-white')}
          >
            {btnLabel}
          </Button>
        )}
      </DialogCustomTrigger>

      <DialogCustomContent>{children}</DialogCustomContent>
    </DialogCustom>
  );
}
