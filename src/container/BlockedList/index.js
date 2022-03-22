import React from "react";
import BlockList from "../../component/BlockList";
import store from "../../utils/actionCreator";
// import "./index.css";

export default function BlockedList() {
  const movies = store.getState();
  return (
    <>
      <h1>Movie List of Blocked</h1>
      <div className="blocked-grid">
        {movies.map(({ movie, isBlocked }) => {
          return <BlockList movie={movie} isBlocked={isBlocked} />;
        })}
      </div>
    </>
  );
}
