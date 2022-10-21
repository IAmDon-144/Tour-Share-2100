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
  LOAD_PROFILE_POST_FAILED,
  LOAD_PROFILE_POST_SUCCESS,
  LOAD_TOP_PROFILE_SUCCESS,
  LOAD_TOP_PROFILE_FAILED,
  UPDATE_A_DATA_SUCCESS,
  UPDATE_A_DATA_FAILED,
  LIKE_UNLIKE_SUCCESS,
  LIKE_UNLIKE_FAILED,
} from "./apitype";
import axios from "axios";

//============================Load All Post=========================

export const loadAllData = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  try {
    const res = await axios.get(`http://127.0.0.1:8000/get/`, config);
    dispatch({
      type: LOAD_ALL_DATA_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOAD_ALL_DATA_FAILED,
    });
  }
};

//============================Load Profile Post=========================

export const loadProfilePost = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  try {
    const res = await axios.get(
      `http://127.0.0.1:8000/get-profile-data/${id}/`,
      config
    );
    dispatch({
      type: LOAD_PROFILE_POST_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOAD_PROFILE_POST_FAILED,
    });
  }
};
//============================Load Top Profile =========================

export const loadTopProfile = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  try {
    const res = await axios.get(
      `http://127.0.0.1:8000/get-top-profile/`,
      config
    );
    dispatch({
      type: LOAD_TOP_PROFILE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOAD_TOP_PROFILE_FAILED,
    });
  }
};

//============================Load Single Post=========================

export const loadSingleData = (id) => async (dispatch) => {
  console.log(id);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  try {
    const res = await axios.get(`http://127.0.0.1:8000/get/${id}/`, config);
    dispatch({
      type: LOAD_A_DATA_SUCCESS,
      payload: res.data[0],
    });
    console.log(res.data);
  } catch (err) {
    dispatch({
      type: LOAD_A_DATA_FAILED,
    });
  }
};
//============================Load Comments of a Post=========================

export const loadComments = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  try {
    const res = await axios.get(
      `http://127.0.0.1:8000/get-comments/${id}/`,
      config
    );
    dispatch({
      type: LOAD_COMMENTS_SUCCESS,
      payload: res.data,
    });
    console.log(res.data);
  } catch (err) {
    dispatch({
      type: LOAD_COMMENTS_FAILED,
    });
  }
};

//============================Load Any Profile=========================

export const loadProfile = (id) => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/get-profile/${id}/`,
        config
      );
      dispatch({
        type: LOAD_PROFILE_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: LOAD_PROFILE_FAILED,
      });
    }
  } else {
  }
};
//============================Load My Profile=========================
export const loadMyProfile = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/get-my-profile/`,
        config
      );
      dispatch({
        type: LOAD_MY_PROFILE_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: LOAD_MY_PROFILE_FAILED,
      });
    }
  } else {
  }
};

//============================Do Comment =========================

export const createComment = (post, user, comBody) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  const body = JSON.stringify({ post, user, comBody });
  try {
    const res = await axios.post(
      `http://127.0.0.1:8000/post-comment/`,
      body,
      config
    );

    dispatch({
      type: DO_COMMENTS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: DO_COMMENTS_FAILED,
    });
  }
};
//============================Do LIKE =========================

export const likeUnlike = (post, user, likeVal) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  const body = JSON.stringify({ post, user, likeVal });
  try {
    const res = await axios.post(
      `http://127.0.0.1:8000/post-like/`,
      body,
      config
    );

    dispatch({
      type: LIKE_UNLIKE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LIKE_UNLIKE_FAILED,
    });
  }
};

//============================Update Post=========================

export const updatePost = (dataBody, id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };




  try {
    const res = await axios.put(
      `http://127.0.0.1:8000/update-post/${id}/`,
      dataBody,
      config
    );

    dispatch({
      type: UPDATE_A_DATA_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: UPDATE_A_DATA_FAILED,
    });
  }
};
