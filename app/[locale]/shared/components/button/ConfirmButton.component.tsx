import React from 'react';
import classNames from 'classnames';
import Lottie from 'lottie-react';

import LoadingLottie from '../../../../../public/lottie/loading.json';
import { Button } from '../shacdn-ui/Button.components';

interface Props {
  handleClickBtn?: () => void;

  isLoading?: boolean;
  isDisable?: boolean;
  backgroundBtnColor?: string;
}

export const ConfirmButton = ({
  isLoading,
  isDisable,
  handleClickBtn,
  backgroundBtnColor,
}: Props) => {
  return (
    <>
      <div className="flex-center-end">
        <div className="rounded w-28">
          <Button
            type="submit"
            size="sm"
            className={classNames(
              backgroundBtnColor ? backgroundBtnColor : 'bg-primary',
              'mx-auto w-full text-white',
            )}
            onClick={handleClickBtn}
            disabled={isDisable || isLoading}
          >
            {isLoading ? (
              <Lottie
                className="mx-auto w-7 scale-150"
                animationData={LoadingLottie}
              />
            ) : (
              <span className="">Confirm</span>
            )}
          </Button>
        </div>
      </div>
    </>
  );
};
