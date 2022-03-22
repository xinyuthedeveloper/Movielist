import { createStore } from "redux";

const initialState = {
  movies: [],
  block: [],
  liked: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_LIST":
      return { ...state, movies: [...state.movies, ...action.payload] };

    case "IS_LIKE":
      const likeIndex = state.findIndex(
        (element) => element.id === action.text.id
      );
      state[likeIndex].isLiked = true;
      return state;

    case "IS_BLOCK":
      const blockIndex = state.findIndex(
        (element) => element.id === action.text.id
      );
      state[blockIndex].isBlocked = true;
      return state;

    case "UNBLOCK":
      const unblockIndex = state.findIndex(
        (element) => element.id === action.text.id
      );
      state[unblockIndex].isBlocked = false;
      return state;

    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
