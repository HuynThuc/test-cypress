import * as React from 'react';

import classes from './LoadingIndicator.module.scss';

export function LoadingIndicator(): React.ReactElement {
  return (
    <div className={classes['loading-overlay']} data-cy="loading-indicator">
      <div className={classes['loading-indicator']}>
        <div className={classes['spinnerContainer']}>
          <svg
            version="1.1"
            id="L2"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 100 100"
            enableBackground="new 0 0 100 100"
            xmlSpace="preserve"
          >
            <circle
              fill="none"
              stroke="#e74c3c"
              strokeWidth="4"
              strokeMiterlimit="10"
              cx="50"
              cy="50"
              r="48"
            />
            <line
              fill="none"
              strokeLinecap="round"
              stroke="#e74c3c"
              strokeWidth="4"
              strokeMiterlimit="10"
              x1="50"
              y1="50"
              x2="85"
              y2="50.5"
            >
              <animateTransform
                attributeName="transform"
                dur="2s"
                type="rotate"
                from="0 50 50"
                to="360 50 50"
                repeatCount="indefinite"
              />
            </line>
            <line
              fill="none"
              strokeLinecap="round"
              stroke="#e74c3c"
              strokeWidth="4"
              strokeMiterlimit="10"
              x1="50"
              y1="50"
              x2="49.5"
              y2="74"
            >
              <animateTransform
                attributeName="transform"
                dur="15s"
                type="rotate"
                from="0 50 50"
                to="360 50 50"
                repeatCount="indefinite"
              />
            </line>
          </svg>
          <div>In progress...</div>
        </div>
      </div>
    </div>
  );
}
