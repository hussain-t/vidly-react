import React, { Component } from 'react';
import MoviesTables from './MoviesTables';
import Pagination from './common/Pagination';
import ListGroup from './common/ListGroup';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import { paginate } from '../utils/paginate';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: ''
  }

  componentDidMount() {
    const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()]
    this.setState({ movies: getMovies(), genres, })
  }

  handleDelete = id => {
    const movies = this.state.movies.filter(m => m._id !== id);
    this.setState({ movies })
  }

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  }

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1, })
  }

  handleSort = path => {
    console.log(path);
  }

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, selectedGenre, movies: allMovies, genres } = this.state;

    if (count === 0) return <p>There are no movies in the collection!</p>

    const filtered = selectedGenre && selectedGenre._id ? 
      allMovies.filter(m => m.genre._id === selectedGenre._id) 
      : allMovies;

    const movies = paginate(filtered, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={this.state.selectedGenre}
          />
        </div>
        <div className="col">
          <p>Showing {filtered.length} movies from the collection</p>
          <MoviesTables 
            movies={movies}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;