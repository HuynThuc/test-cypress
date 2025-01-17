import * as React from 'react';
import classNames from 'classnames';

import classes from './Input.module.scss';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
  errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isError, errorMessage, ...props }, ref) => {
    return (
      <>
        <input
          type={type}
          className={classNames(classes['form-input'], className)}
          ref={ref}
          {...props}
        />
        {isError && <div className="text-sm text-error">{errorMessage}</div>}
      </>
    );
  },
);
Input.displayName = 'Input';

export { Input };
