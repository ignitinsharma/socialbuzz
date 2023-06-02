import {
  GET_ALL_USERS,
  GET_FOLLOW_USER,
  GET_POSTS,
  GET_SINGLE_USER,
  GET_SINGLE_USER_POST,
  GET_UNFOLLOW_USER,
  SET_FRIENDS,
  SET_LOGIN,
  SET_LOGOUT,
  SET_POSTS,
} from "./actionTypes";

const initialState = {
  user: null,
  token: null,
  posts: [],
  allusers: [],
  singleUserPost: [],
  singleUser: null,
  isFollowUser: false,
};

export const mainReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOGIN: {
      return {
        ...state,
        user: payload.user,
        token: payload.token,
      };
    }
    case SET_LOGOUT: {
      return { ...state, user: null, token: null };
    }
    case SET_FRIENDS: {
      if (state.user) {
        state.user.friends = payload.friends;
        return { ...state };
      } else {
        console.error("user friends non-existent :(");
        return state;
      }
    }
    case SET_POSTS: {
      return { ...state, posts: payload.posts };
    }

    case GET_POSTS: {
      return {
        ...state,
        posts: payload,
      };
    }
    case GET_ALL_USERS: {
      return {
        ...state,
        allusers: payload,
      };
    }
    case GET_SINGLE_USER_POST: {
      return {
        ...state,
        singleUserPost: payload,
      };
    }
    case GET_SINGLE_USER: {
      return {
        ...state,
        singleUser: payload,
      };
    }
    case GET_FOLLOW_USER: {
      return {
        ...state,
        isFollowUser: true,
      };
    }
    case GET_UNFOLLOW_USER: {
      return {
        ...state,
        isFollowUser: false,
      };
    }
    default: {
      return state;
    }
  }
};
