import { Routes, Route } from "react-router-dom";
import Home from "../container/Home/index";
import Navbar from "../component/Navbar";
import MovieList from "../container/MovieList";
import LikedList from "../container/LikedList";
import BlockedList from "../container/BlockedList";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie" element={<MovieList />} />
        <Route path="/liked" element={<LikedList />} />
        <Route path="/blocked" element={<BlockedList />} />
      </Routes>
    </>
  );
}
