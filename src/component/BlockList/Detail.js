import React from "react";
import { Modal } from "react-bootstrap";

export default function Detail({ movie, showDetail, setShowDetail }) {
  return (
    <Modal
      show={showDetail}
      onHide={() => setShowDetail(!showDetail)}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{movie.original_title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt="{movie.original_title}"
        />
        <p>{movie.release_date}</p>
        <p>Rating: {movie.vote_average}</p>
        <p>{movie.overview}</p>
      </Modal.Body>
    </Modal>
  );
}
