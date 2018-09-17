export const SHOW_SPINNER = "[ui] show spinner";
export const HIDE_SPINNER = "[ui] hide spinner";
export const MENU_CHANGED = "[ui] menu changed";
export const NEW_MENU_ACTIVE = "[ui] new menu active";

export const showSpinner = () => ({
  type: SHOW_SPINNER
});

export const hideSpinner = () => ({
  type: HIDE_SPINNER
});

export const menuClicked = index => ({
  type: MENU_CHANGED,
  payload: index
});

export const newMenuActive = data => ({
  type: NEW_MENU_ACTIVE,
  payload: data
});
