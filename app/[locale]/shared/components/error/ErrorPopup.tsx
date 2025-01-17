import { ReactElement, ReactNode } from 'react';

import usePopUp from '../../hook/UsePopUp';
import { Button } from '../shacdn-ui/Button.components';
import useLogoutUser from '../../hook/UseLogoutUser';

type Props = {
  header?: ReactNode;
  message?: ReactNode;
};

export function ErrorPopup({ message }: Props): ReactElement {
  const { isOpenPopUp } = usePopUp();
  const { logoutUser } = useLogoutUser();

  return (
    <>
      {isOpenPopUp && (
        <div className="fixed z-50 top-0 right-0 w-full h-full bg-opacity-50 bg-white">
          <div className="w-[400px] mx-auto my-32 bg-white p-5 border-[1px] rounded">
            <div>{message}</div>
            <div>Về trang chủ?</div>
            <Button className="text-white" onClick={logoutUser}>
              OK
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
