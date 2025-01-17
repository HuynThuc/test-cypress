/* eslint-disable no-unused-vars */
import React, { useCallback } from 'react';
import classNames from 'classnames';
import { UploadIcon } from '@radix-ui/react-icons';
import { Accept, useDropzone } from 'react-dropzone';

import classes from './Input.module.scss';
import { Label } from '../shacdn-ui/Label.components';
import { DEFAULT_UPLOAD_FILE_ACCEPT } from '../../constants';

interface FileInputProps {
  onFileUpload: (files: File[]) => void;
  title?: string;
  disabled?: boolean;
  accept?: Accept;
}

export const FileInput = ({
  onFileUpload,
  title,
  disabled,
  accept = DEFAULT_UPLOAD_FILE_ACCEPT,
}: FileInputProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Do something with the files, e.g., upload to a server or process locally
      onFileUpload(acceptedFiles);
    },
    [onFileUpload],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    disabled,
  });

  return (
    <div className="mb-4">
      {title && (
        <Label
          htmlFor="fileInput"
          className="block mb-2 text-sm font-semibold "
        >
          {title}
        </Label>
      )}

      <div
        className={classNames(
          classes['form-input'],
          disabled && classes['disabled'],
        )}
      >
        <div className={classes['upload-file-body']} {...getRootProps()}>
          <UploadIcon />
          <input {...getInputProps()} name="fileInput" />
          <p>Kéo và thả hoặc chọn file pdf</p>
        </div>
      </div>
    </div>
  );
};
