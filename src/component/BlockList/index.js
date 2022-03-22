import React, { useState } from "react";
import store from "../../utils/actionCreator";
import Detail from "./Detail";
import "./index.css";

export default function BlockList({ movie, isBlocked }) {
  const data = store.getState();
  const [isShow, setIsShow] = useState(isBlocked);
  const [showDetail, setShowDetail] = useState(false);

  const buttonsHandler = (event) => {
    const movieFound = data.find(
      (element) => element.id === Number(event.target.parentNode.id)
    );
    console.log(movieFound);
    if (event.target.name === "unblock" || event.target.name === "like") {
      if (event.target.name === "like") {
        store.dispatch({
          type: "IS_LIKE",
          text: movieFound,
        });
      }
      store.dispatch({
        type: "UNBLOCK",
        text: movieFound,
      });
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
          <div className="buttons" id={movie.id}>
            <button name="unblock">Delete</button>
            <button name="like">Like</button>
            <button name="detail">Detail</button>
          </div>
        </div>
      </div>
    )
  );
}
