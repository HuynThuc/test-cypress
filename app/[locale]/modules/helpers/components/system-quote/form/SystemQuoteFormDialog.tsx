/* eslint-disable no-unused-vars */
'use client';

import React, { ReactElement, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';

import { CustomSelect } from '@/app/[locale]/shared/components/select/Select';

import { systemQuoteDefaultValue } from '../../../constants';
import { SystemQuoteSchema, useFormSystemQuote } from '../../../schema';
import { FormControl } from '../../../../../shared/components/form-control';
import { Input } from '../../../../../shared/components/input';
import { ConfirmButton } from '../../../../../shared/components/button';
import { DialogLayout } from '../../../../../shared/components/dialog';
import { categoryList } from '../data/SystemQuote.data';

interface SystemQuoteFormDialogProps {
  btnLabel: string | ReactElement;
  isLoading: boolean;
  onClickBtn: (value: SystemQuoteSchema) => void;

  isOpenDialog: boolean;
  toggleDialog: (value: boolean) => void;

  defaultValue?: SystemQuoteSchema;
  backgroundBtnColor?: string;
}

export const SystemQuoteFormDialog = ({
  btnLabel,
  isLoading,
  isOpenDialog,
  onClickBtn,
  toggleDialog,
  defaultValue,
  backgroundBtnColor,
}: SystemQuoteFormDialogProps): ReactElement => {
  // const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<SystemQuoteSchema>(
    defaultValue ?? systemQuoteDefaultValue,
  );

  const {
    form: { control, register, handleSubmit, reset },
    isError,
    getErrorMessage,
  } = useFormSystemQuote();

  // const handleOnClickConfirmButton = async (data: SystemQuoteSchema) => {
  //   setIsLoading(true);
  //   onClickBtn(data);
  // };

  // const onReset = () => {
  //   setIsLoading(false);
  //   reset(data);
  // };

  // useEffect(() => {
  //   if (data) {
  //     reset(data);
  //   }
  // }, []);

  useEffect(() => {
    reset(data);
    setData(defaultValue ?? systemQuoteDefaultValue);
  }, [isOpenDialog]);

  // const { data: listCategories } = useGetAllSystemQuoteCategory(isOpenDialog);

  return (
    <DialogLayout
      isOpenDialog={isOpenDialog}
      btnLabel={btnLabel}
      toggleDialog={toggleDialog}
      backgroundBtnColor={backgroundBtnColor}
    >
      <>
        <form
          onSubmit={handleSubmit(onClickBtn)}
          className="grid gap-4 lg:gap-x-10"
        >
          <FormControl label="Category" required>
            <Controller
              render={({ field: { value, onChange, name } }) => {
                return (
                  <CustomSelect
                    options={categoryList}
                    value={value?.toString()}
                    onChange={onChange}
                    isError={isError(name)}
                    errorMessage={getErrorMessage(name)}
                  />
                );
              }}
              name="category"
              control={control}
            />
          </FormControl>
          <FormControl label="Quote" required>
            <Input
              {...register('quote')}
              isError={isError('quote')}
              errorMessage={getErrorMessage('quote')}
            />
          </FormControl>
          <FormControl label="Author" required>
            <Input
              {...register('author')}
              isError={isError('author')}
              errorMessage={getErrorMessage('author')}
            />
          </FormControl>

          <div className="col-span-2">
            <ConfirmButton isLoading={isLoading} />
          </div>
        </form>
      </>
    </DialogLayout>
  );
};
