import React from "react";
import { BiLike, BiPlay, BiPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import RoundButton from "./buttons/RoundButton";

const MovieCard = ({ item }) => {
  const { title, vote_average, release_date, poster_path, id } = item;
  const navigate = useNavigate();
  return (
    <div className="movie-list-card">
      <div className="movie-list-image-wrapper  w-full h-[260px] relative  bg-gradient-to-b from-transparent via-transparent via-70% to-black from-10% opacity-90 cursor-pointer">
        <img
          src={`http://image.tmdb.org/t/p/w500/${poster_path}`}
          alt=""
          className="w-full h-full object-cover rounded-lg mb-4 absolute mix-blend-overlay object-top"
          onClick={() => navigate(`movies/${id}`)}
        />
      </div>

      <div className="movie-list-card-bottom flex flex-row justify-between items-center gap-2">
        <div className="movie-list-meta">
          <h3 className="text-white font-medium text-xl">{title}</h3>
          <div className="flex flex-row items-center gap-2">
            <div className="movie-list-card-like flex flex-row items-center">
              <span className="movie-list-card-vote text-white text-sm opacity-90">
                {vote_average}
              </span>
              <div className="movie-list-card-icon-like flex items-center justify-center h-[32px] w-[32px]">
                <div className="text-white">
                  <BiLike></BiLike>
                </div>
              </div>
            </div>
            <span className="movie-list-card-release-date text-white text-sm opacity-90">
              {new Date(release_date).getFullYear()}
            </span>
          </div>
        </div>
        <div className="movie-list-card-icons flex flex-row gap-3 ">
          <RoundButton
            className={"movie-list-card-icon-play"}
            onClick={() => navigate(`movies/${id}`)}
            children={
              <BiPlay className="bg-white h-[32px] w-[32px] pl-1 rounded-full"></BiPlay>
            }
          ></RoundButton>
          <RoundButton
            className={`movie-list-card-icon-bookmard`}
            children={
              <BiPlus className="border-2 border-gray-400 stroke-2 stroke-white h-[32px] w-[32px] p-[5px] rounded-full"></BiPlus>
            }
          ></RoundButton>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
