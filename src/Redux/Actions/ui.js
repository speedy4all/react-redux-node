export const SHOW_SPINNER = "[ui] show spinner";
export const HIDE_SPINNER = "[ui] hide spinner";
export const MENU_CHANGED = "[ui] menu changed";
export const NEW_MENU_ACTIVE = "[ui] new menu active";
export const SEARCH_TRIGGERED = "[ui] search event";

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

export const createSearchAction = searchParam => ({
  type: SEARCH_TRIGGERED,
  payload: searchParam
});
