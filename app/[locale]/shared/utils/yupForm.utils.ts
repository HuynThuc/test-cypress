import { FieldValues, UseFormReturn } from 'react-hook-form';

export const isError =
  <T>(form: UseFormReturn<T & FieldValues>) =>
  (field: keyof T): boolean | undefined => {
    return !!form.formState.errors[field];
  };

export const getErrorMessage =
  <T>(form: UseFormReturn<T & FieldValues>) =>
  (field: keyof T): string | undefined => {
    return form.formState.errors[field]?.message as string;
  };

export const transformNumberValidation = (value: number) =>
  isNaN(value) ? undefined : value;
