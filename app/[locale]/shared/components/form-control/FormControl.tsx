'use client';

import classNames from 'classnames';

import { ExtendableComponentProps } from '../../types';
import classes from './FormControl.module.scss';

type FormControlProps = ExtendableComponentProps<
  'div',
  {
    children: React.ReactNode;
    required?: boolean;
    label?: string;
    name?: string;
  }
>;

export function FormControl({
  children,
  required,
  label,
  name,
  ...rest
}: FormControlProps) {
  return (
    <div {...rest} className={classNames(classes['root'], rest.className)}>
      {label && (
        <label className={classes['label']} htmlFor={name}>
          {label} {required && <span className="text-error">*</span>}
        </label>
      )}

      {children}
    </div>
  );
}
