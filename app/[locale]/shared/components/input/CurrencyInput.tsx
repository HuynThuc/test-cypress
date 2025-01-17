import * as React from 'react';
import classNames from 'classnames';
import CurrencyInputLib, {
  CurrencyInputProps as CurrencyInputLibProps,
} from 'react-currency-input-field';

import classes from './Input.module.scss';

export interface CurrencyInputProps extends CurrencyInputLibProps {
  isError?: boolean;
  errorMessage?: string;
}

const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ className, isError, errorMessage, ...props }, ref) => {
    return (
      <>
        <CurrencyInputLib
          ref={ref}
          decimalsLimit={2}
          decimalScale={2}
          {...props}
          className={classNames(classes['form-input'], className)}
        />
        {isError && <div className="text-sm text-error">{errorMessage}</div>}
      </>
    );
  },
);
CurrencyInput.displayName = 'CurrencyInput';

export { CurrencyInput };
