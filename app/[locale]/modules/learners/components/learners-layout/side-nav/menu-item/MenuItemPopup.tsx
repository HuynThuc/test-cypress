import { Dispatch, SetStateAction } from 'react';
import { FaAngleDown } from 'react-icons/fa';

import { MenuSide } from '@/modules/learners/constants';

export const MenuItemPopup = ({
  menuItem,
  content,
  indexSetected,
  setIndexSelectedMenu,
}: {
  menuItem: MenuSide;
  content: React.ReactNode;
  stringHeightChildMenu: string;
  indexSetected: number;
  setIndexSelectedMenu: Dispatch<SetStateAction<number>>;
}) => {
  let isCheckOut = false;
  if (menuItem.indexOf === indexSetected) {
    isCheckOut = true;
  }
  return (
    <div className="w-full">
      <div
        className={`flex items-center hover:bg-[#7e3aaf33] p-4 ${isCheckOut ? 'bg-[#7e3aaf33]' : ''}`}
        onClick={() => setIndexSelectedMenu(isCheckOut ? -1 : menuItem.indexOf)}
      >
        <div className="flex gap-3 flex-auto pl-5 select-none text-base">
          {menuItem.icon}
          <h1>{menuItem.label}</h1>
        </div>
        {menuItem.isIconAngle && (
          <FaAngleDown
            className={`w-4 h-4 items-end flex-initial duration-300 transform ${isCheckOut ? '-rotate-180' : 'rotate-0'}`}
          />
        )}
      </div>
      <div
        className={`transition-height duration-500 ease-in-out overflow-hidden ${isCheckOut && content ? menuItem.heightChildItem : 'h-[0px]'}`}
      >
        {isCheckOut && content}
      </div>
    </div>
  );
};
