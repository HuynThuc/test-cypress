import React from 'react';
interface MenuItemProps {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}
export const MenuItemContent: React.FC<MenuItemProps> = ({
  onClick,
  icon,
  label,
}) => (
  <li
    className="hover:bg-[#7e3aaf33] duration-200 flex flex-col items-center gap-3 px-2 py-3 text-center select-none"
    onClick={onClick}
  >
    {icon}
    <h1>{label}</h1>
  </li>
);
