/* eslint-disable no-unused-vars */
import * as React from 'react';
import { useEffect } from 'react';
import classNames from 'classnames';

import { Checkbox } from '../shacdn-ui/Checkbox.components';
import { MultipleSelectOption } from '../../types/MultipleSelectOption.types';

interface MultipleChoiceProps {
  options: MultipleSelectOption[];
  defaultOptions: number[];
  onSelected: (listValues: number[]) => void;
}

export function MultipleSelect({
  options,
  defaultOptions,
  onSelected,
}: MultipleChoiceProps) {
  const [selectedValues, setSelectedValues] = React.useState(defaultOptions);

  useEffect(() => {
    onSelected(selectedValues);
  }, [selectedValues]);

  useEffect(() => {
    setSelectedValues(defaultOptions);
  }, [defaultOptions]);

  return (
    <div className="grid grid-cols-3 gap-4">
      {options.map((option) => (
        <MultipleSelectInput
          key={option.value}
          option={option}
          selectedValues={selectedValues}
          setSelectedValues={setSelectedValues}
        />
      ))}
    </div>
  );
}

function MultipleSelectInput({
  option,
  selectedValues,
  setSelectedValues,
}: {
  option: MultipleSelectOption;

  selectedValues: number[];
  setSelectedValues: (selectedValues: number[]) => void;
}) {
  const isSelected = selectedValues.includes(option.value);

  const handleOnClick = (isSelected: boolean, value: number) => {
    if (isSelected) {
      const newSelected = selectedValues.filter((e) => e != value);
      setSelectedValues(newSelected);
      return;
    }

    const newSelected = [...selectedValues, value];
    setSelectedValues(newSelected);
  };

  return (
    <div className="flex items-center justify-start gap-1 text-center">
      <Checkbox
        checked={isSelected}
        onClick={() => handleOnClick(isSelected, option.value)}
      />

      <span
        className={classNames(
          'text-center text-sm',
          isSelected ? 'text-black' : 'text-gray-400',
        )}
      >
        {option.label}
      </span>
    </div>
  );
}
