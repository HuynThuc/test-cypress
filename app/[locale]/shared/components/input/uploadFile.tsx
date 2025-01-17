/* eslint-disable no-unused-vars */
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadIcon, Cross1Icon } from '@radix-ui/react-icons';

import classes from './Input.module.scss';
interface ChooseFileProps {
  title: string;
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
  defaultName: string | null;
  setDefaultNameFile: (name: string | null) => void;
  accept?: string;
}

export const UploadFile: React.FC<ChooseFileProps> = ({
  title,
  selectedFile,
  setSelectedFile,
  defaultName,
  setDefaultNameFile,
  accept,
}: ChooseFileProps) => {
  const handleRemoveFile = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setSelectedFile(null);
    setDefaultNameFile(null);
  };

  const handleDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setSelectedFile(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: {
      'file/*': accept ? [accept] : ['.pdf'],
    },
  });

  return (
    <div className="mb-4">
      <label
        htmlFor="imageUpload"
        className="mb-2 block text-sm font-semibold "
      >
        {title}
      </label>
      <div className={classes['upload-file-root']}>
        <div className={classes['upload-file-body']} {...getRootProps()}>
          <UploadIcon />
          <input {...getInputProps()} />
          <p>Kéo và thả hoặc chọn file pdf</p>
        </div>

        {(selectedFile ?? defaultName) && (
          <div className="mt-2 flex items-center gap-2">
            <p className="w-[15rem] truncate text-sm font-semibold">
              {selectedFile?.name ?? defaultName}
            </p>
            <button
              className="text-red-500"
              onClick={(e) => handleRemoveFile(e)}
            >
              <Cross1Icon />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
