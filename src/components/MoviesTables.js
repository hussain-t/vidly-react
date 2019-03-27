import React from 'react'
import Like from './common/Like'

const MoviesTables = ({ movies, onDelete, onLike, onSort }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={() => onSort('title')} scope="col">Title</th>
          <th onClick={() => onSort('genre.name')} scope="col">Genre</th>
          <th onClick={() => onSort('numberInStock')} scope="col">Stock</th>
          <th onClick={() => onSort('dailyRentalRate')} scope="col">Rate</th>
          <th />
          <th />
        </tr>
      </thead>
      <tbody>
        {movies.map(movie => (
          <tr key={movie._id}>
            <th scope="row">{movie.title}</th>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td>{movie.dailyRentalRate}</td>
            <td><Like liked={movie.liked} onClick={() => onLike(movie)} /></td>
            <td>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => onDelete(movie._id)}
              >Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MoviesTables;