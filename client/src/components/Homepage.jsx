import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsController, BsBootstrapReboot, BsTools } from 'react-icons/bs';
import {
  fetchVideogames,
  filterVideogamesByCreation,
  filterVideogamesByGenre,
  sortByName,
  sortByRating,
  sortByRating4,
} from '../store/actions/index';
import { Link } from 'react-router-dom';
import Videogame from './Videogame';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import '../Sass/Styles/Homepage.scss';

export default function Videogames() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);
  const allGenres = useSelector((state) => state.genres);
  const [order, setOrder] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [videogamesPerPage, setVideogamesPerPage] = useState(15);
  const lastVideogamesIndex = currentPage * videogamesPerPage;
  const firstVideogamesIndex = lastVideogamesIndex - videogamesPerPage;
  const currentVideogames = allVideogames.slice(
    firstVideogamesIndex,
    lastVideogamesIndex
  );

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  function clickHandler(event) {
    event.preventDefault();
    dispatch(fetchVideogames());
  }

  function creationFilterHandler(event) {
    dispatch(filterVideogamesByCreation(event.target.value));
  }

  function genreFilterHandler(event) {
    dispatch(filterVideogamesByGenre(event.target.value));
  }

  function ratingFilterHandler(event) {
    dispatch(sortByRating4(event.target.value));
  }

  function sortByNameHandler(event) {
    event.preventDefault();
    dispatch(sortByName(event.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${event.target.value}`);
  }

  function sortByRatingHandler(event) {
    event.preventDefault();
    dispatch(sortByRating(event.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${event.target.value}`);
  }

  return (
    <div className="Homepage">
      <h1>
        <BsController /> Videogame App - Mateo Filip
      </h1>

      <div className="buttons">
        <button
          onClick={(event) => {
            clickHandler(event);
          }}
        >
          <BsBootstrapReboot /> Refresh
        </button>
        <Link to="/videogame">
          <button>
            <BsTools /> Create
          </button>
        </Link>
      </div>

      <SearchBar />

      <div>
        <select
          className="selectsHomepage"
          onChange={(event) => sortByNameHandler(event)}
        >
          <option value="" selected>
            Sort by alphabet!
          </option>
          <option value="ASCENDING">⬆ Ascending</option>
          <option value="DESCENDING">⬇ Descending</option>
        </select>

        <select
          className="selectsHomepage"
          onChange={(event) => sortByRatingHandler(event)}
        >
          <option value="" selected>
            Sort by rating!
          </option>
          <option value="ASCENDING">⬆ Ascending</option>
          <option value="DESCENDING">⬇ Descending</option>
        </select>

        <select
          className="selectsHomepage"
          onChange={(event) => creationFilterHandler(event)}
        >
          <option value="All" selected>
            All Videogames
          </option>
          <option value="Created">Created</option>
          <option value="Existing">Existing</option>
        </select>

        <select
          className="selectsHomepage"
          onChange={(event) => genreFilterHandler(event)}
        >
          <option value="All" selected>
            All Genres
          </option>
          {allGenres?.map((genre) => {
            return <option value={genre.name}>{genre.name}</option>;
          })}
        </select>

        <div className="cardsContainer">
          {currentVideogames?.map((videogame) => {
            return (
              <section>
                <Link to={'/videogame/' + videogame.id}>
                  <Videogame
                    name={videogame.name}
                    image={videogame.image}
                    genres={videogame.genres}
                    key={videogame.id}
                  />
                </Link>
              </section>
            );
          })}
        </div>

        <Pagination
          videogamesPerPage={videogamesPerPage}
          allVideogames={allVideogames.length}
          pagination={pagination}
        />
      </div>
    </div>
  );
}
