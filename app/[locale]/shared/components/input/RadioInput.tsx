import * as React from 'react';

import { ListOption } from '../../types';

export interface RadioInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  options: ListOption[];
  isError?: boolean;
  errorMessage?: string;
}

const RadioInput = React.forwardRef<HTMLInputElement, RadioInputProps>(
  ({ options, isError, errorMessage, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-5">
          {options.map((option) => {
            return (
              <span
                key={option.value}
                className="flex flex-row items-center gap-2"
              >
                <input ref={ref} type="radio" value={option.value} {...props} />
                <label>{option.title}</label>
              </span>
            );
          })}
        </div>
        {isError && <div className="text-sm text-error">{errorMessage}</div>}
      </div>
    );
  },
);
RadioInput.displayName = 'RadioInput';

export { RadioInput };
