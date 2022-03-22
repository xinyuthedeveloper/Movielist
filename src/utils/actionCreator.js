import { createStore } from "redux";

const initialState = {
  movies: [],
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
      });
      return {
        ...state,
        movies: modifiedMovies,
      };

    case "UNLIKE":
      return { ...state, movies: modifiedMovies };

    case "IS_BLOCK":
      return {
        ...state,
        movies: modifiedMovies,
      };

    case "UNBLOCK":
      return { ...state, movies: modifiedMovies };

    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
