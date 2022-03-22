import { createStore } from "redux";

const initialState = {
  movies: [],
  blocked: [],
  liked: [],
};

const reducer = (state = initialState, action) => {
  const modifiedMovies = state.movies.map((element) => {
    if (element.id === action.payload.id) {
      element = action.payload;
    }
    return element;
  });

  switch (action.type) {
    case "ADD_LIST":
      return { ...state, movies: [...state.movies, ...action.payload] };

    case "IS_LIKE":
      console.log({
        ...state,
        movies: modifiedMovies,
        liked: [...state.liked, action.payload],
      });
      return {
        ...state,
        movies: modifiedMovies,
        liked: [...state.liked, action.payload],
      };

    case "IS_BLOCK":
      return {
        ...state,
        movies: modifiedMovies,
        blocked: [...state.blocked, action.payload],
      };

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
