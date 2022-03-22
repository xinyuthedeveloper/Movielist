import React from "react";
import "./style.css";
import { useState, useEffect } from "react";
import store from "../../utils/actionCreator.js";

// [ 'Use Redux', 'Read the docs' ]
export default function MovieList() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const baseUrl =
    "https://api.themoviedb.org/3/movie/popular?api_key=ec90af707a599c7b1267e264bad8a7b7&language=en-US&page=";
  const { movies } = store.getState();
  console.log(movies);
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
        console.log(modifiedData);
        setData([...modifiedData]);
        store.dispatch({ type: "ADD_LIST", payload: modifiedData });
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }

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
    } else {
      setPage(page + 1);
    }
  };

  return loading ? (
    <h6>loading</h6>
  ) : (
    <div className="movies">
      <div className="toggle-page" onClick={(e) => pageSwitchHandler(e)}>
        <button name="prev">prev</button>
        <button name="next">next</button>
      </div>
      <div className="wrapper">
        {data.map((element) => {
          return <li>{element.original_title}</li>;
        })}
      </div>
    </div>
  );
}
