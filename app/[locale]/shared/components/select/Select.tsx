/* eslint-disable no-unused-vars */
import { useMemo } from 'react';

import classes from './Select.module.scss';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../shacdn-ui/Select.components';
import { ListOption } from '../../types';

type CustomSelectProps = {
  options: ListOption[];
  onChange: (value: string) => void;
  isLoading?: boolean;
  label?: string;
  placeholder?: string;
  value?: string;
  isError?: boolean;
  errorMessage?: string;
  disabled?: boolean;
};

export const CustomSelect = ({
  options,
  onChange,
  isLoading,
  label,
  placeholder,
  value,
  isError,
  errorMessage,
  disabled,
}: CustomSelectProps) => {
  const selectContent = useMemo(() => {
    if (isLoading) {
      return <SelectLabel>Loading...</SelectLabel>;
    }

    if (!options.length) {
      return <SelectLabel>No data.</SelectLabel>;
    }

    return (
      <>
        {label ? <SelectLabel>{label}</SelectLabel> : <></>}
        {options.map((item) => (
          <SelectItem value={item.value} key={item.value}>
            {item.title}
          </SelectItem>
        ))}
      </>
    );
  }, [isLoading, options, label, value]);

  return (
    <>
      <Select
        defaultValue={value}
        value={value}
        onValueChange={onChange}
        disabled={disabled}
      >
        <SelectTrigger className={classes['form-input']}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-white max-h-[200px]">
          <SelectGroup>{selectContent}</SelectGroup>
        </SelectContent>
      </Select>
      {isError && <div className="text-sm text-error">{errorMessage}</div>}
    </>
  );
};
