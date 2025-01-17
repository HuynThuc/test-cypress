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
import { helenSpeakingDefaultValue } from '../../../constants';
import { HelenSpeakingSchema, useFormHelenSpeaking } from '../../../schema';
import { useGetAllHelenSpeakingCategory } from '../../../api';
import { helenSpeakingModes, helenSpeakingTargetAudiences } from '../data';

interface HelenSpeakingFormDialogProps {
  btnLabel: string | ReactElement;
  isLoading: boolean;
  onClickBtn: (value: HelenSpeakingSchema) => void;

  isOpenDialog: boolean;
  toggleDialog: (value: boolean) => void;

  defaultValue?: HelenSpeakingSchema;
  backgroundBtnColor?: string;
}

export const HelenSpeakingFormDialog = ({
  btnLabel,
  isLoading,
  isOpenDialog,
  onClickBtn,
  toggleDialog,
  defaultValue,
  backgroundBtnColor,
}: HelenSpeakingFormDialogProps): ReactElement => {
  const [data, setData] = useState<HelenSpeakingSchema>();

  // const [currYoutubeUrl, setCurrYoutubeUrl] = useState<string>('');
  const {
    form: { control, register, handleSubmit, reset },
    isError,
    getErrorMessage,
  } = useFormHelenSpeaking();

  useEffect(() => {
    reset(data);
    setData(defaultValue ?? helenSpeakingDefaultValue);
  }, [isOpenDialog]);

  const { data: listCategories } = useGetAllHelenSpeakingCategory(isOpenDialog);

  return (
    <DialogLayout
      isOpenDialog={isOpenDialog}
      btnLabel={btnLabel}
      toggleDialog={toggleDialog}
      backgroundBtnColor={backgroundBtnColor}
      width={'max-w-[70%]'}
    >
      <>
        <form
          onSubmit={handleSubmit(onClickBtn)}
          className="grid grid-cols-4 gap-4 lg:gap-x-10"
        >
          <div className="col-span-4 grid grid-cols-2">
            <FormControl label="Youtube URL" required>
              <Input
                {...register('youtubeUrl')}
                isError={isError('youtubeUrl')}
                errorMessage={getErrorMessage('youtubeUrl')}
                className="col-span-1"
              />
            </FormControl>
          </div>
          <FormControl label="Title" className="col-span-2" required>
            <Input
              {...register('title')}
              isError={isError('title')}
              errorMessage={getErrorMessage('title')}
              className="col-span-2"
            />
          </FormControl>
          <FormControl label="Script URL" className="col-span-2" required>
            <Input
              {...register('scriptUrl')}
              isError={isError('scriptUrl')}
              errorMessage={getErrorMessage('scriptUrl')}
              disabled
            />
          </FormControl>
          <FormControl label="Thumbnail URL" className="col-span-2" required>
            <Input
              {...register('thumbnailUrl')}
              isError={isError('thumbnailUrl')}
              errorMessage={getErrorMessage('thumbnailUrl')}
              disabled
            />
          </FormControl>
          <FormControl
            label="Blur Thumbnail URL"
            className="col-span-2"
            required
          >
            <Input
              {...register('blurThumbnailUrl')}
              isError={isError('blurThumbnailUrl')}
              errorMessage={getErrorMessage('blurThumbnailUrl')}
              disabled
            />
          </FormControl>

          <FormControl label="Target audience" required>
            <Controller
              render={({ field: { value, onChange, name } }) => {
                return (
                  <CustomSelect
                    options={helenSpeakingTargetAudiences}
                    value={value?.toString()}
                    onChange={onChange}
                    isError={isError(name)}
                    errorMessage={getErrorMessage(name)}
                    disabled
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

          <FormControl label="Tags">
            <Input
              {...register('tags')}
              isError={isError('tags')}
              errorMessage={getErrorMessage('tags')}
              disabled
            />
          </FormControl>

          <FormControl label="Mode" required>
            <Controller
              render={({ field: { value, onChange, name } }) => {
                return (
                  <CustomSelect
                    options={helenSpeakingModes}
                    value={value?.toString()}
                    onChange={onChange}
                    isError={isError(name)}
                    errorMessage={getErrorMessage(name)}
                    disabled
                  />
                );
              }}
              name="mode"
              control={control}
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
