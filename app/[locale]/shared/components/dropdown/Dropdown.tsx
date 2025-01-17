import React, { JSXElementConstructor, ReactElement } from 'react';
import classNames from 'classnames';
import { createPopper } from '@popperjs/core';

import { Icon } from './Icon';

interface Props {
  children: ReactElement | ReactElement[];
  iconContent: ReactElement<string, string | JSXElementConstructor<string>>;
}

const Dropdown = ({ children, ...props }: Props): ReactElement => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef: React.RefObject<HTMLAnchorElement> = React.createRef();
  const popoverDropdownRef: React.RefObject<HTMLDivElement> = React.createRef();

  const openDropdownPopover = () => {
    createPopper(
      btnDropdownRef.current as HTMLAnchorElement,
      popoverDropdownRef.current as HTMLDivElement,
      {
        placement: 'bottom-end',
      },
    );
    setDropdownPopoverShow(true);
  };

  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const dropdownClasses = classNames(
    'bg-white',
    'text-base',
    'z-50',
    'float-left',
    'py-2',
    'list-none',
    'text-left',
    'rounded',
    'shadow-lg',
    'min-w-48',
    {
      block: dropdownPopoverShow,
      hidden: !dropdownPopoverShow,
    },
  );

  return (
    <>
      <a
        className="text-slate-500 block"
        href="@/app/components/Dropdowns/UserDropdown#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <Icon>{props?.iconContent}</Icon>
      </a>
      <div ref={popoverDropdownRef} className={dropdownClasses}>
        {children}
      </div>
    </>
  );
};

export default Dropdown;
