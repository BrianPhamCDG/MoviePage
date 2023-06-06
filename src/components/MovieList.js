import React, { useEffect, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "./MovieCard";
import useSWR from "swr";
import { fetcher } from "../config";

const MovieList = ({ type = "now_playing", heading }) => {
  const [movies, setMovies] = useState([]);
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${type}?api_key=a604f410165b50edcde91d2a945a01ba`,
    fetcher
  );

  useEffect(() => {
    if (data && data.results) setMovies(data.results);
  }, [data]);

  return (
    <>
      <section className="movie-list-wrapper page-container mt-3 flex flex-col w-full mb-24">
        <h2 className="movie-list-heading font-semibold text-3xl text-white pb-6">
          {heading}
        </h2>
        <div className="swiper-wrapper w-auto h-auto">
          <Swiper
            grabCursor={"true"}
            spaceBetween={32}
            slidesPerView={"auto"}
            navigation={true}
            loop={true}
          >
            {movies.length > 0 &&
              movies.map((item) => (
                <SwiperSlide key={item.id}>
                  <MovieCard item={item}></MovieCard>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default MovieList;
