import {
  SET_FRIENDS,
  SET_LOGIN,
  SET_LOGOUT,
  SET_MODE,
  SET_POST,
  SET_POSTS,
} from "./actionTypes";

const initialState = {
  user: null,
  token: null,
  posts: [],
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
    case SET_POST: {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === payload.post._id) return payload.post;
        return post;
      });
      return { ...state, posts: updatedPosts };
    }
    default: {
      return state;
    }
  }
};
