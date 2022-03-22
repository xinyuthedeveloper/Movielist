import React, { useState } from "react";
import store from "../../utils/actionCreator";
import "./index.css";

const SingleMovieView = ({ movie }) => {
  const [isBlock, setIsBlock] = useState(movie.isBlock);
  const [isLike, setIsLike] = useState(movie.isLike);

  const handleClick = (e) => {
    if (e.target.name === "block") {
      setIsBlock(true);
      store.dispatch({
        type: "IS_BLOCK",
        payload: { ...movie, isBlock: true },
      });
    }

    if (e.target.name === "like") {
      const isExistInLiked = store
        .getState()
        .liked.find((element) => element.id === movie.id);

      if (!isLike) {
        if (!isExistInLiked) {
          store.dispatch({
            type: "IS_LIKE",
            payload: { ...movie, isLike: true },
          });
          setIsLike(true);
        }
      }
    }
  };

  return (
    !isBlock && (
      <div className="movie">
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt=""
        />
        {movie.original_title}
        <br />
        {movie.release_date}
        <br />
        Score: {movie.vote_average}
        <br />
        {movie.overview}
        <div
          className="buttons-wrapper"
          id={movie.id}
          onClick={(e) => handleClick(e)}
        >
          <button name="like">{isLike ? "Liked" : "Like"}</button>
          <button name="block">block</button>
        </div>
      </div>
    )
  );
};

export default SingleMovieView;
