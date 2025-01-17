export type PopupState = {
  isOpen: boolean;
  content: React.ReactNode | null;
};

export type PopupAction =
  | { type: 'OPEN_POPUP'; content: React.ReactNode }
  | { type: 'CLOSE_POPUP' };

export function popupReducer(
  state: PopupState,
  action: PopupAction,
): PopupState {
  switch (action.type) {
    case 'OPEN_POPUP':
      return {
        content: action.content,
        isOpen: true,
      };
    case 'CLOSE_POPUP':
      return {
        content: null,
        isOpen: false,
      };
    default:
      return { ...state };
  }
}
