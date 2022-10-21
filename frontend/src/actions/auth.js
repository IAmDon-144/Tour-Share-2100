import {
  LOGIN_SUCCESS,
  LOGIN_FAILD,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAILED,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAILD,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAILED,
  LOGOUT,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILED,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAILED,
} from "./types";
import axios from "axios";
import { loadMyProfile } from "./api";

export const checkAuthenticated = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    const body = JSON.stringify({ token: localStorage.getItem("access") });
    try {
      const res = await axios.post(
        `http://127.0.0.1:8000/auth/jwt/verify/`,
        body,
        config
      );

      if (res.data.code !== "token_not_valid") {
        dispatch({
          type: AUTHENTICATED_SUCCESS,
        });
      } else {
        dispatch({
          type: AUTHENTICATED_FAILED,
        });
      }
    } catch (err) {
      dispatch({
        type: AUTHENTICATED_FAILED,
      });
    }
  } else {
    dispatch({
      type: AUTHENTICATED_FAILED,
    });
  }
};

export const laodUser = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/auth/users/me/`,
        config
      );
      // console.log(res.data);
      dispatch({
        type: USER_LOADED_SUCCESS,
        payload: res.data,
      });
      dispatch(loadMyProfile());
    } catch (err) {
      dispatch({
        type: USER_LOADED_FAILD,
      });
    }
  } else {
    dispatch({
      type: USER_LOADED_FAILD,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post(
      `http://127.0.0.1:8000/auth/jwt/create/`,
      body,
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(laodUser());
  } catch (err) {
    dispatch({
      type: LOGIN_FAILD,
    });
  }
};

export const signup =
  (username, email, password, re_password) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ username, email, password, re_password });
    try {
      const res = await axios.post(
        `http://127.0.0.1:8000/auth/users/`,
        body,
        config
      );

      dispatch({
        type: SIGNUP_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: SIGNUP_FAILED,
      });
    }
  };

export const verify = (uid, token) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ uid, token });

  try {
    await axios.post(
      "http://127.0.0.1:8000/auth/users/activation/",
      body,
      config
    );
    dispatch({
      type: ACTIVATION_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: ACTIVATION_FAILED,
    });
  }
};
export const reset_password = (email) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email });

  try {
    await axios.post(
      `http://127.0.0.1:8000/auth/users/reset_password/`,
      body,
      config
    );
    dispatch({
      type: PASSWORD_RESET_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PASSWORD_RESET_FAILED,
    });
  }
};

export const reset_password_confirm =
  (uid, token, new_password, re_new_password) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
      await axios.post(
        `http://127.0.0.1:8000/auth/users/reset_password_confirm/`,
        body,
        config
      );
      dispatch({
        type: PASSWORD_RESET_CONFIRM_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: PASSWORD_RESET_CONFIRM_FAILED,
      });
    }
  };

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
