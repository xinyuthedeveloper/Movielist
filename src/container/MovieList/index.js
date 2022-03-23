import React from "react";
import "./style.css";
import { useState, useEffect } from "react";
import store from "../../utils/actionCreator.js";
import SingleMovieView from "../../component/SingleMovieView";

// [ 'Use Redux', 'Read the docs' ]
export default function MovieList() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const initialStatus = {
    isTitleAZ: false,
    isTitleZA: false,
    isCountMax: false,
    isCountMin: false,
    isScoreMax: false,
    isScoreMin: false,
    isDateOld: false,
    isDateNew: false,
  };
  const [sortStatus, setSortStatus] = useState(initialStatus);
  const baseUrl =
    "https://api.themoviedb.org/3/movie/popular?api_key=ec90af707a599c7b1267e264bad8a7b7&language=en-US&page=";

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        const res = await (await fetch(`${baseUrl}${page}`)).json();
        const modifiedData = res.results.map((element) => {
          element.page = page;
          element.isBlock = false;
          element.isLike = false;
          return element;
        });

        setData([...modifiedData]);
        store.dispatch({ type: "ADD_LIST", payload: modifiedData });
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }

    const { movies } = store.getState();

    const pageFound = movies.find((element) => element.page == page);
    pageFound
      ? setData(movies.filter((element) => element.page === page))
      : fetchMovies();
  }, [page]);

  const pageSwitchHandler = (e) => {
    if (e.target.name === "prev") {
      if (page > 1) {
        setPage(page - 1);
      } else {
        setPage(1);
      }
    }

    if (e.target.name === "next") {
      setPage(page + 1);
    }
  };

  const sortButtonsHandler = (e) => {
    e.target.name === "title" &&
      setSortStatus({
        ...initialStatus,
        isTitleAZ: !sortStatus.isTitleAZ,
        isTitleZA: sortStatus.isTitleAZ,
      });

    e.target.name === "count" &&
      setSortStatus({
        ...initialStatus,
        isCountMax: !sortStatus.isCountMax,
        isCountMin: sortStatus.isCountMax,
      });

    e.target.name === "score" &&
      setSortStatus({
        ...initialStatus,
        isScoreMax: !sortStatus.isScoreMax,
        isScoreMin: sortStatus.isScoreMax,
      });

    e.target.name === "date" &&
      setSortStatus({
        ...initialStatus,
        isDateNew: !sortStatus.isDateNew,
        isDateOld: sortStatus.isDateNew,
      });
  };

  const mapped = sortStatus.isTitleZA
    ? data.sort((a, b) => a.original_title.localeCompare(b.original_title))
    : sortStatus.isTitleAZ
    ? data.sort((a, b) => b.original_title.localeCompare(a.original_title))
    : sortStatus.isCountMin
    ? data.sort((a, b) => a.vote_count - b.vote_count)
    : sortStatus.isCountMax
    ? data.sort((a, b) => b.vote_count - a.vote_count)
    : sortStatus.isScoreMax
    ? data.sort((a, b) => b.vote_average - a.vote_average)
    : sortStatus.isScoreMin
    ? data.sort((a, b) => a.vote_average - b.vote_average)
    : sortStatus.isDateNew
    ? data.sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
    : sortStatus.isDateOld
    ? data.sort((a, b) => new Date(a.release_date) - new Date(b.release_date))
    : data;

  return loading ? (
    <h6>loading</h6>
  ) : (
    <div className="wrapper">
      <div className="sort-buttons" onClick={(e) => sortButtonsHandler(e)}>
        {sortStatus.isTitleAZ ? (
          <button name="title">Title &uarr;</button>
        ) : (
          <button name="title">Title &darr;</button>
        )}
        {sortStatus.isCountMax ? (
          <button name="count">Vote Count &uarr;</button>
        ) : (
          <button name="count">Vote Count &darr;</button>
        )}
        {sortStatus.isScoreMax ? (
          <button name="score">Vote Average &uarr;</button>
        ) : (
          <button name="score">Vote Average &darr;</button>
        )}
        {sortStatus.isDateNew ? (
          <button name="date">Release Date &uarr;</button>
        ) : (
          <button name="date">Release Date &darr;</button>
        )}
      </div>

      <div className="toggle-page" onClick={(e) => pageSwitchHandler(e)}>
        <button name="prev">prev</button>
        <span>page {page}</span>
        <button name="next">next</button>
      </div>

      <div className="movies-grid">
        {mapped.map((movie) => {
          return <SingleMovieView movie={movie} key={movie.id} />;
        })}
      </div>
    </div>
  );
}
