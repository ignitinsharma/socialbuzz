import {
  GET_ALL_USERS,
  GET_POSTS,
  GET_SINGLE_USER_POST,
  SET_FRIENDS,
  SET_LOGIN,
  SET_LOGOUT,
  SET_POST,
  SET_POSTS,
} from "./actionTypes";
import axios from "axios";

export const setLogin = (user, token) => (dispatch) => {
  dispatch({ type: SET_LOGIN, payload: { user, token } });
};

export const setLogout = () => (dispatch) => {
  dispatch({ type: SET_LOGOUT });
};

export const setFriends = (friends) => (dispatch) => {
  dispatch({ type: SET_FRIENDS, payload: { friends } });
};

export const setPosts = (posts) => (dispatch) => {
  dispatch({ type: SET_POSTS, payload: { posts } });
};

export const setFetchAllPosts = (headers) => (dispatch) => {
  axios.get(`http://localhost:8080/posts`, { headers }).then((res) => {
    dispatch({ type: GET_POSTS, payload: res.data });
  });
};
export const setFetchAllUsers = (headers) => (dispatch) => {
  axios.get(`http://localhost:8080/user/allusers`, { headers }).then((res) => {
    dispatch({ type: GET_ALL_USERS, payload: res.data });
  });
};

export const setSingleUserPost = (headers, userId) => (dispatch) => {
  axios
    .get(`http://localhost:8080/posts/profile/${userId}`, { headers })
    .then((res) => {
      dispatch({ type: GET_SINGLE_USER_POST, payload: res.data });
    });
};

export const setPost = (post) => (dispatch) => {
  dispatch({ type: SET_POST, payload: { post } });
};
