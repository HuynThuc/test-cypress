/* eslint-disable no-unused-vars */
'use client';
import React, { ReactElement, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';

import {
  FormControl,
  Input,
  ConfirmButton,
  DialogLayout,
  CustomSelect,
} from '../../../../../shared/components';
import { helenShortSpeakingDefaultValue } from '../../../constants';
import {
  HelenShortSpeakingSchema,
  useFormHelenShortSpeaking,
} from '../../../schema';
import { useGetAllHelenShortSpeakingCategory } from '../../../api';
import { helenShortSpeakingTargetAudiences } from '../data';

interface HelenShortSpeakingFormDialogProps {
  btnLabel: string | ReactElement;
  isLoading: boolean;
  onClickBtn: (value: HelenShortSpeakingSchema) => void;

  isOpenDialog: boolean;
  toggleDialog: (value: boolean) => void;

  defaultValue?: HelenShortSpeakingSchema;
  backgroundBtnColor?: string;
}

export const HelenShortSpeakingFormDialog = ({
  btnLabel,
  isLoading,
  isOpenDialog,
  onClickBtn,
  toggleDialog,
  defaultValue,
  backgroundBtnColor,
}: HelenShortSpeakingFormDialogProps): ReactElement => {
  const [data, setData] = useState<HelenShortSpeakingSchema>(
    defaultValue ?? helenShortSpeakingDefaultValue,
  );
  const {
    form: { control, register, handleSubmit, reset },
    isError,
    getErrorMessage,
  } = useFormHelenShortSpeaking();

  const handleOnClick = (data: HelenShortSpeakingSchema) => {
    onClickBtn(data);
  };

  useEffect(() => {
    reset(data);
    setData(defaultValue ?? helenShortSpeakingDefaultValue);
  }, [isOpenDialog]);

  const { data: listCategories } =
    useGetAllHelenShortSpeakingCategory(isOpenDialog);

  return (
    <DialogLayout
      isOpenDialog={isOpenDialog}
      btnLabel={btnLabel}
      toggleDialog={toggleDialog}
      backgroundBtnColor={backgroundBtnColor}
    >
      <>
        <form
          onSubmit={handleSubmit(handleOnClick)}
          className="grid gap-4 lg:gap-x-10"
        >
          <FormControl label="Target Audience" required>
            <Controller
              render={({ field: { value, onChange, name } }) => {
                return (
                  <CustomSelect
                    options={helenShortSpeakingTargetAudiences}
                    value={value?.toString()}
                    onChange={onChange}
                    isError={isError(name)}
                    errorMessage={getErrorMessage(name)}
                  />
                );
              }}
              name="targetAudience"
              control={control}
            />
          </FormControl>
          <FormControl label="Category" required>
            <Controller
              render={({ field: { value, onChange, name } }) => {
                return (
                  <CustomSelect
                    options={listCategories}
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
          <FormControl label="Image URL" required>
            <Input
              {...register('imageUrl')}
              isError={isError('imageUrl')}
              errorMessage={getErrorMessage('imageUrl')}
            />
          </FormControl>
          <FormControl label="Title" required>
            <Input
              {...register('title')}
              isError={isError('title')}
              errorMessage={getErrorMessage('title')}
            />
          </FormControl>
          <FormControl label="Script URL" required>
            <Input
              {...register('scriptUrl')}
              isError={isError('scriptUrl')}
              errorMessage={getErrorMessage('scriptUrl')}
            />
          </FormControl>
          <FormControl label="Mp3 URL" required>
            <Input
              {...register('mp3Url')}
              isError={isError('mp3Url')}
              errorMessage={getErrorMessage('mp3Url')}
            />
          </FormControl>
          <FormControl label="Ref URL" required>
            <Input
              {...register('refUrl')}
              isError={isError('refUrl')}
              errorMessage={getErrorMessage('refUrl')}
            />
          </FormControl>

          <div className="col-span-2">
            <h2>confirm: </h2>
            <ConfirmButton isLoading={isLoading} />
          </div>
        </form>
      </>
    </DialogLayout>
  );
};
