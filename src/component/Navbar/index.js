import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

export default function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/movie">Movie list</Link>
      <Link to="/liked">Liked List</Link>
      <Link to="/blocked">Blocked List</Link>
    </nav>
  );
}
