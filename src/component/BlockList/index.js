import React, { useState } from "react";
import store from "../../utils/actionCreator";
import Detail from "./Detail";
import "./index.css";

export default function BlockList({ movie }) {
  const { movies } = store.getState();
  const [isShow, setIsShow] = useState(movie.isBlock);
  const [showDetail, setShowDetail] = useState(false);

  const buttonsHandler = (event) => {
    const movieFound = movies.find((element) => element.id === movie.id);

    if (event.target.name === "unblock" || event.target.name === "like") {
      store.dispatch({
        type: "UNBLOCK",
        payload: { ...movieFound, isBlock: false },
      });

      if (event.target.name === "like") {
        !movieFound &&
          store.dispatch({
            type: "IS_LIKE",
            payload: { ...movieFound, isLike: true, isBlock: false },
          });
      }
      setIsShow(!isShow);
    }

    if (event.target.name === "detail") {
      setShowDetail(true);
    }
  };

  return (
    isShow && (
      <div
        className="blocked-movie"
        id={movie.id}
        onClick={(e) => buttonsHandler(e)}
      >
        {showDetail && (
          <Detail
            movie={movie}
            showDetail={showDetail}
            setShowDetail={setShowDetail}
          />
        )}
        <div className="image-wrapper" id={movie.id}>
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.original_title}
          />
          <div className="buttons">
            <button name="unblock">Delete</button>
            <button name="like">Like</button>
            <button name="detail">Detail</button>
          </div>
        </div>
      </div>
    )
  );
}
