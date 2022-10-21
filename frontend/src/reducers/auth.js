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
} from "../actions/types";


const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: null,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("access", payload.access);
      return {
        ...state,
        isAuthenticated: true,
        access: payload.access,
        refresh: payload.refresh,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
      };
    case USER_LOADED_SUCCESS:
      return {
        ...state,
        user: payload,
      };
    case USER_LOADED_FAILD:
      return {
        ...state,
        user: null,
      };

    case AUTHENTICATED_FAILED:
      return {
        ...state,
        isAuthenticated: false,
      };
    case LOGIN_FAILD:
    case SIGNUP_FAILED:
    case LOGOUT:
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: null,
      };

    case PASSWORD_RESET_SUCCESS:
    case PASSWORD_RESET_FAILED:
    case PASSWORD_RESET_CONFIRM_SUCCESS:
    case PASSWORD_RESET_CONFIRM_FAILED:
    case ACTIVATION_SUCCESS:
    case ACTIVATION_FAILED:
    
    
          return {
            ...state,
          };
      return {
        ...state,
      };
    default:
      return state;
  }
}
