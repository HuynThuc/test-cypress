import * as React from 'react';

import { PopupAction, popupReducer, PopupState } from './PopUpReducer';

type Props = {
  children: React.ReactNode;
};

const initialState: PopupState = {
  isOpen: false,
  content: null,
};

export type PopupContextType = {
  state: PopupState;
  dispatch: React.Dispatch<PopupAction>;
};

export const PopupContext = React.createContext<PopupContextType>({
  state: initialState,
  dispatch: () => {},
});

export function PopupContextProvider({ children }: Props): React.ReactElement {
  const [state, dispatch] = React.useReducer(popupReducer, initialState);
  const popup = state.isOpen && state.content ? state.content : null;

  return (
    <PopupContext.Provider value={{ state, dispatch }}>
      {popup}
      {children}
    </PopupContext.Provider>
  );
}
