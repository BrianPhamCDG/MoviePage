import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { apiKey, fetcher } from "../config";
import { tmdbAPI } from "../config";

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieDetail(movieId), fetcher);
  if (!data) return null;
  const { backdrop_path, poster_path, title, genres, overview } = data;
  // console.log(data);
  return (
    <div className="page-container">
      <div className="relative w-full">
        <div className="w-full h-full absolute  bg-gradient-to-b from-transparent via-transparent via-10% to-black from-30% opacity-100"></div>
        <div
          className="w-full h-[600px] bg-cover bg-no-repeat bg-center mt-[48px] rounded-lg"
          style={{
            backgroundImage: `url(http://image.tmdb.org/t/p/original/${backdrop_path})`,
          }}
        ></div>
      </div>
      <div className="details-info w-full block px-[62px] -mb-[96px] h-full">
        <div className="flex flex-row gap-[62px] w-full h-full">
          <div className="w-full max-w-[314px] max-h-[450px] -translate-y-2/4">
            <img
              src={`http://image.tmdb.org/t/p/original/${poster_path}`}
              alt=""
              className="rounded-lg w-full h-full min-w-[235.5px] min-h-[337.5px] object-cover"
            />
          </div>
          <div className="movie-detail-info flex flex-col gap-4 w-full h-full">
            <h1 className="movie-detail-heading text-white text-4xl font-semibold w-full">
              {title}
            </h1>
            {genres.length > 0 && (
              <div className="movie-detail-genres flex gap-x-5 w-full">
                {genres.map((item) => (
                  <div
                    key={item.id}
                    className="text-[#9ca3af] border-[1px] border-[#9ca3af] rounded-full px-4 py-1 w-full text-center"
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            )}
            <span className="movie-detail-desc text-white mt-4 w-full h-full">
              {overview}
            </span>
          </div>
        </div>
      </div>
      <MovieCredit></MovieCredit>
      <MovieVideos></MovieVideos>
    </div>
  );
};

function MovieCredit() {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieCredit(movieId), fetcher);
  if (!data) return null;
  const { cast } = data;
  if (!cast || cast.length <= 0) return null;
  return (
    <>
      <div className="text-center">
        <h1 className="movie-detail-heading text-white text-3xl font-semibold mb-[32px]">
          Cast
        </h1>
      </div>
      <div className="grid grid-cols-6 gap-7 w-full">
        {cast.slice(0, 6).map((item) => (
          <div key={item.id} className="cast-item flex flex-col text-center">
            <img
              src={`http://image.tmdb.org/t/p/original/${item.profile_path}`}
              alt=""
              className="w-full max-h-[180px]: rounded-full aspect-square object-cover object-top"
            />
            <h3 className="text-white text-xl font-normal mt-4">{item.name}</h3>
          </div>
        ))}
      </div>
    </>
  );
}

function MovieVideos() {
  const { movieId } = useParams();
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`,
    fetcher
  );
  if (!data) return null;
  console.log(data);
  const { results } = data;
  if (!results || results.length <= 0) return null;
  return (
    <>
      <div className="pt-[129px] text-center mb-[32px]">
        <h1 className="movie-detail-heading text-white text-3xl font-semibold">
          Trailer
        </h1>
      </div>
      <iframe
        src={`https://www.youtube.com/embed/${results[0].key}`}
        title="The Punch that Changed Ryu"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full aspect-video object-fill rounded-lg"
      ></iframe>
    </>
  );
}
export default MovieDetailPage;
