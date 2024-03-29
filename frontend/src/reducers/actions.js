import { ACTION } from "../utils/consts";

export const customerLogin = (payload) => (dispatch) => {
  dispatch({ type: ACTION.CUSTOMER_SIGIN, payload });
};

export const carOwnerLogin = (payload) => (dispatch) => {
  dispatch({ type: ACTION.CAR_OWNER_SIGNIN, payload });
};

export const adminLogin = (payload) => (dispatch) => {
  dispatch({ type: ACTION.ADMIN_SIGIN, payload });
};

export const logout = (payload) => (dispatch) => {
  dispatch({ type: ACTION.RESET, payload });
};

export const showError = (payload) => (dispatch) => {
  dispatch({ type: ACTION.SHOWERROR, payload });
};

export const showMessage = (payload) => (dispatch) => {
  dispatch({ type: ACTION.MESSAGE, payload });
};
