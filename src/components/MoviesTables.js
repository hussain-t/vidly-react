import React, { Component } from 'react';
import Table from './common/Table';
import Like from './common/Like';

class MoviesTables extends Component {
  columns = [
    { path: 'title', label: 'Title' },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    { 
      key: 'like',
      content: movie => <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />,
    },
    { 
      key: 'delete',
      content: movie => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => this.props.onDelete(movie._id)}
        >Delete
        </button>
      )
    },
  ]

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return <Table columns={this.columns} sortColumn={sortColumn} onSort={onSort} data={movies} />
  }
}

export default MoviesTables;
