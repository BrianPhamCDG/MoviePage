import React from "react";
import Banner from "../components/Banner";
import MovieList from "../components/MovieList";

const HomePage = () => {
  return (
    <>
      <Banner></Banner>
      <MovieList heading={"Now Playing"}></MovieList>
      <MovieList type="top_rated" heading={"Top Rated"}></MovieList>
      <MovieList type="upcoming" heading={"Upcoming Movies"}></MovieList>
    </>
  );
};

export default HomePage;
