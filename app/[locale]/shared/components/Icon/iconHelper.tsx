/* eslint-disable no-unused-vars */
import React, { ComponentType, FC } from 'react';

import * as S from './styles';
import { IconName } from '.';

type IconSet = { [key in IconName]: ComponentType };

export interface IconProps {
  name: IconName;
  className?: string;
  size?: string;
  /** If true, replaces the icon fill with currentcolor, so the color can be changed as if it were text */
  useCurrentColor?: boolean;
  /** Helps with icon alignment in some cases (e.g. when the icon is placed independently). */
  altAlignment?: boolean;
  children?: never;
}

type IconHelper = (iconSet: IconSet) => FC<IconProps>;
const iconHelper: IconHelper = (iconSet) =>
  function Icon({
    name,
    useCurrentColor,
    altAlignment,
    className,
    size,
  }: IconProps) {
    const IconSVG: React.ComponentType = iconSet[name];
    return (
      <S.Root
        data-testid={name}
        className={className}
        $size={size}
        $useCurrentColor={useCurrentColor}
        $altAlignment={altAlignment}
      >
        <IconSVG />
      </S.Root>
    );
  };

export default iconHelper;
