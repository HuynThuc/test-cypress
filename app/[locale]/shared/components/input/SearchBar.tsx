/* eslint-disable no-unused-vars */
'use client';
import React, { useState } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string, type: string) => void;
  resetValue: () => void;
  defaultValue?: string;
}

const dropdownText = {
  maTenDuAn: 'Tìm theo mã hoặc tên dự án',
  nghiQuyet: 'Tìm theo nghị quyết',
};

export default function SearchBar({
  value,
  onChange,
  resetValue,
}: SearchBarProps) {
  const [selectedOption, setSelectedOption] = useState<string>('maTenDuAn');
  const [isDropdownActive, setDropdownActive] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownActive(!isDropdownActive);
  };

  const handleDropdownItemClick = (text: string) => {
    setSelectedOption(text);
    setDropdownActive(false);
    resetValue();
  };

  return (
    <div className="font-montserrat flex items-center justify-center">
      <div className="wrapper">
        <div className="search_box bg-white rounded-md shadow-md flex p-2">
          <div className="dropdown border-r-2 border-gray-300 text-gray-600 relative cursor-pointer">
            <div
              className="selected_option text-uppercase py-2 px-4"
              onClick={handleDropdownToggle}
            >
              {
                dropdownText[
                  selectedOption as unknown as keyof typeof dropdownText
                ]
              }
            </div>
            <ul
              className={`absolute top-14 left-0 bg-white w-150px rounded-md p-4 ${
                isDropdownActive ? 'block' : 'hidden'
              }`}
            >
              <li onClick={() => handleDropdownItemClick('maTenDuAn')}>
                Tìm theo mã hoặc tên dự án
              </li>
              <li onClick={() => handleDropdownItemClick('nghiQuyet')}>
                Tìm theo nghị quyết
              </li>
            </ul>
          </div>
          <div className="search_field flex items-center relative w-350px">
            <input
              type="text"
              className="input w-full h-full border-none text-gray-600 text-lg pl-4 pr-12"
              placeholder="Tìm kiếm"
              value={value}
              onChange={(e) => onChange(e.target.value, selectedOption)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-500 right-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
