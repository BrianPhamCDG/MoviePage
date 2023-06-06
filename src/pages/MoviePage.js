import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import ReactPaginate from "react-paginate";
import useSWR from "swr";
import MovieCard from "../components/MovieCard";
import { fetcher } from "../config";
import useDebounce from "../hooks/useDebounce";
import { tmdbAPI } from "../config";

const itemsPerPage = 20;

const TvShow = () => {
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [url, setUrl] = useState(
    `${tmdbAPI.getMovieList("popular", nextPage)}`
  );
  const filterDebounce = useDebounce(filter, 500);
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  const [movies, setMovies] = useState([]);
  const { data, error } = useSWR(url, fetcher);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_results;
    setItemOffset(newOffset);
    setNextPage(event.selected + 1);
  };
  const loading = !data && !error;

  useEffect(() => {
    if (data && data.results) setMovies(data.results);
  }, [data]);

  useEffect(() => {
    if (!data || !data.total_results) return;
    setPageCount(Math.ceil(data.total_results / itemsPerPage));
  }, [data, itemOffset]);

  useEffect(() => {
    if (filterDebounce) {
      setUrl(tmdbAPI.getMovieSearch(filterDebounce, nextPage));
    } else {
      setUrl(`${tmdbAPI.getMovieList("popular", nextPage)}`);
    }
    console.log(data);
  }, [data, filterDebounce, nextPage, url]);

  return (
    <div className="w-full page-container">
      <div className="w-full text-center">
        <div className="mt-[48px] px-8 py-4 bg-white mb-12 rounded-full inline-flex">
          <h2 className=" movie-list-heading font-semibold text-3xl text-black">
            Recent Movies
          </h2>
        </div>
      </div>
      <div className="w-full pb-12 flex items-center justify-center">
        <button>
          <BiSearch className="py-4 px-6 text-2xl text-black bg-white no-border-box rounded-tl-full rounded-bl-full" />
        </button>
        <input
          type="text"
          className="bg-[#161616] outline-none text-white w-full p-4 rounded-md mx-2"
          placeholder="Type here to search..."
          onChange={handleFilterChange}
        />
      </div>

      {loading && (
        <div className=" flex items-center justify-center mb-6">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] text-white"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)] ">
              Loading...
            </span>
          </div>
        </div>
      )}

      <div className="py-3 grid grid-cols-4 gap-6">
        {movies.length > 0 &&
          movies.map((item) => (
            <MovieCard key={item.id} item={item}></MovieCard>
          ))}
      </div>

      <div className="mt-10 flex items-center justify-center">
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="Previous"
          renderOnZeroPageCount={null}
          className="pagination"
        />
      </div>

      {/* <nav aria-label="" className="flex items-center justify-center mt-8">
        <ul className="list-style-none flex gap-4">
          <li>
            <a
              className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white font-body"
              href="#!"
              onClick={() => setNextPage(nextPage - 1)}
            >
              Previous
            </a>
          </li>
          {new Array(pageCount).fill(0).map((item, index) => (
            <a
              className="relative block rounded bg-white px-3 py-1.5 text-sm font-medium text-primary-700 transition-all duration-300"
              href="#!"
              key={index}
              onClick={() => setNextPage(index + 1)}
            >
              {index + 1}
              <span className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]">
                (current)
              </span>
            </a>
          ))}
          <li>
            <a
              className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white font-body"
              href="#!"
              onClick={() => setNextPage(nextPage + 1)}
            >
              Next
            </a>
          </li>
        </ul>
      </nav> */}
    </div>
  );
};

export default TvShow;
