import React, { useEffect, useState } from "react";
import { BiInfoCircle, BiPlay } from "react-icons/bi";
import useSWR from "swr";
import { fetcher } from "../config";
import { SwiperSlide, Swiper } from "swiper/react";
import { useNavigate } from "react-router-dom";

const Banner = ({ type = "popular" }) => {
  const [movies, setMovies] = useState([]);
  // const { title, release_date } = movies;

  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${type}?api_key=a604f410165b50edcde91d2a945a01ba`,
    fetcher
  );

  useEffect(() => {
    if (data && data.results) setMovies(data.results);
  }, [data]);
  return (
    <div className="page-container banner w-full">
      <Swiper
        grabCursor={"true"}
        slidesPerView={"auto"}
        navigation={true}
        loop={true}
      >
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

function BannerItem({ item }) {
  const { title, release_date, poster_path, id } = item;
  const navigate = useNavigate();
  return (
    <section className="banner my-12 w-full h-[550px] page-container">
      <div className="w-full h-full relative  bg-gradient-to-b from-transparent via-transparent via-70% to-black from-10% opacity-90">
        <img
          src={`http://image.tmdb.org/t/p/original/${poster_path}`}
          alt=""
          className="absolute object-cover w-full h-full mix-blend-overlay object-top  rounded-lg"
        />
        <div className="banner-meta absolute bottom-5 left-5 flex flex-col gap-2">
          <div className="banner-desc flex flex-row gap-4">
            <span className="text-white text-sm opacity-90">
              {new Date(release_date).getFullYear()}
            </span>
            <span className="text-white text-sm opacity-90">|</span>
            <span className="text-white text-sm opacity-90">Comedy/Family</span>
            <span className="text-white text-sm opacity-90">|</span>
            <span className="text-white text-sm opacity-90">2h 30m</span>
          </div>
          <h2 className="banner-movie-name text-white text-4xl font-bold">
            {title}
          </h2>
          <div className="banner-button-wrap flex flex-row gap-4">
            <div className="banner-button flex flex-row justify-center gap-2 rounded-lg py-3 bg-white cursor-pointer w-[155px] mt-4">
              <div className="banner-icon-play flex items-center justify-center ">
                <BiPlay className="text-2xl text-black"></BiPlay>
              </div>
              <button
                className="text-black font-semibold text-base"
                onClick={() => navigate(`/movies/${id}`)}
              >
                Play now
              </button>
            </div>
            <div className="banner-button flex flex-row justify-center gap-2 rounded-lg py-3 bg-none border-[2px] border-white cursor-pointer w-[155px] mt-4">
              <div className="banner-icon-info flex items-center justify-center ">
                <BiInfoCircle className="text-2xl text-white"></BiInfoCircle>
              </div>
              <button className="text-white font-semibold text-base">
                More info
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
