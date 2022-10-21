import {
  LOAD_ALL_DATA_SUCCESS,
  LOAD_ALL_DATA_FAILED,
  LOAD_PROFILE_SUCCESS,
  LOAD_PROFILE_FAILED,
  LOAD_MY_PROFILE_SUCCESS,
  LOAD_MY_PROFILE_FAILED,
  LOAD_A_DATA_SUCCESS,
  LOAD_A_DATA_FAILED,
  LOAD_COMMENTS_SUCCESS,
  LOAD_COMMENTS_FAILED,
  DO_COMMENTS_SUCCESS,
  DO_COMMENTS_FAILED,
  LOAD_PROFILE_POST_SUCCESS,
  LOAD_PROFILE_POST_FAILED,
  LOAD_TOP_PROFILE_SUCCESS,
  LOAD_TOP_PROFILE_FAILED,
  UPDATE_A_DATA_SUCCESS,
  UPDATE_A_DATA_FAILED,
  LIKE_UNLIKE_SUCCESS,
  LIKE_UNLIKE_FAILED,
} from "../actions/apitype";

const initialState = {
  posts: [],
  profile: null,
  post: null,
  comments: [],
  topProfiles: [],
  myprofile: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_ALL_DATA_SUCCESS:
      return {
        ...state,
        posts: payload,
      };

    case LOAD_MY_PROFILE_SUCCESS:
      return {
        ...state,
        profile: payload,
        myprofile: payload,
      };

    case LOAD_PROFILE_SUCCESS:
      return {
        ...state,
        profile: payload,
      };
    case LOAD_TOP_PROFILE_SUCCESS:
      return {
        ...state,
        topProfiles: payload,
      };
    case LOAD_A_DATA_SUCCESS:
      return {
        ...state,
        post: payload,
      };

    case LOAD_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: payload,
      };

    case DO_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: state.comments.concat(payload),
      };

    case LOAD_PROFILE_POST_SUCCESS:
      state.posts = [];
      return {
        ...state,
        posts: payload,
      };

    case LOAD_ALL_DATA_FAILED:
    case LOAD_PROFILE_FAILED:
    case LOAD_A_DATA_FAILED:
    case LOAD_MY_PROFILE_FAILED:
    case LOAD_COMMENTS_FAILED:
    case DO_COMMENTS_FAILED:
    case LOAD_PROFILE_POST_FAILED:
    case LOAD_TOP_PROFILE_FAILED:
    case UPDATE_A_DATA_SUCCESS:
    case UPDATE_A_DATA_FAILED:
    case LIKE_UNLIKE_SUCCESS:
    case LIKE_UNLIKE_FAILED:
      return {
        ...state,
      };

    default:
      return state;
  }
}
