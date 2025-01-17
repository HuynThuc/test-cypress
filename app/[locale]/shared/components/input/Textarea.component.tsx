import * as React from 'react';
import classNames from 'classnames';

import { Textarea } from '../shacdn-ui/Textarea.components';
import classes from './Input.module.scss';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  isError?: boolean;
  errorMessage?: string;
}

const TextareaCustom = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, isError, errorMessage, ...props }, ref) => {
    return (
      <>
        <Textarea
          ref={ref}
          className={classNames(classes['form-textarea'], className)}
          {...props}
        ></Textarea>
        {isError && <div className="text-sm text-error">{errorMessage}</div>}
      </>
    );
  },
);
TextareaCustom.displayName = 'Textarea';

export { TextareaCustom as Textarea };
