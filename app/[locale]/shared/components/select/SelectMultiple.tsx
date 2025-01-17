/* eslint-disable no-unused-vars */
import React from 'react';
import Select, { MultiValue } from 'react-select';
import makeAnimated from 'react-select/animated';

import { SelectMultipleBody } from '../../types/SelectMultiple.types';

interface SelectMultipleComponentProps {
  values: SelectMultipleBody[];
  options: SelectMultipleBody[];
  onSelected: (listValues: number[]) => void;
  label?: string;
  placeholder?: string;
}
const animatedComponents = makeAnimated();
const SelectMultipleComponent = ({
  values,
  options,
  onSelected,
}: SelectMultipleComponentProps) => {
  const onSelectChange = (newValue: MultiValue<SelectMultipleBody>) => {
    const ids = newValue.map((item) => item.value);
    onSelected(ids);
  };
  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      onChange={onSelectChange}
      defaultValue={values}
      isMulti
      options={options}
    />
  );
};

export default SelectMultipleComponent;
