import {
  SET_FRIENDS,
  SET_LOGIN,
  SET_LOGOUT,
  SET_POST,
  SET_POSTS,
  SET_SINGLE_USER_POSTS,
} from "./actionTypes";

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

// export const setSingleUserPosts = (posts) => (dispatch) => {
//   dispatch({ type: SET_SINGLE_USER_POSTS, payload: { posts } });
// };

export const setPost = (post) => (dispatch) => {
  dispatch({ type: SET_POST, payload: { post } });
};
