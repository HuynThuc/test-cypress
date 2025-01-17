import React, { useCallback, useContext } from 'react';

import { PopupContext } from '../context/pop-up/PopUpContext';

function usePopUp() {
  const { state, dispatch } = useContext(PopupContext);

  const openPopUp = useCallback(
    ({ content }: { content: React.ReactNode }) => {
      dispatch({
        type: 'OPEN_POPUP',
        content,
      });
    },
    [dispatch],
  );

  const closePopUp = () => {
    dispatch({
      type: 'CLOSE_POPUP',
    });
  };

  return { openPopUp, closePopUp, isOpenPopUp: state.isOpen };
}

export default usePopUp;
