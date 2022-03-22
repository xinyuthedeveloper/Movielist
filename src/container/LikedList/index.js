import React from "react";
import LikeList from "../../component/Likelist";
import store from "../../utils/actionCreator";

export default function LikedList() {
  const { movies } = store.getState();

  return (
    <>
      <h1>Movie List of Blocked</h1>
      <div className="blocked-grid">
        {movies.map((movie) => {
          return <LikeList movie={movie} key={movie.id} />;
        })}
      </div>
    </>
  );
}
