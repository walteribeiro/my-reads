import React from 'react';
import {Link} from "react-router-dom"
import {DebounceInput} from "react-debounce-input";
import Bookshelf from './Bookshelf'
import * as BooksAPI from '../api/BooksAPI'

class Search extends React.Component {
    state = {
        searchedBooks: []
    }

    searchBooks = (evt) => {
        if (evt.target.value !== '') {
            BooksAPI
                .search(evt.target.value)
                .then(response => {
                    if (response.hasOwnProperty('error')) {
                        this.setState({searchedBooks: []})
                    } else {
                        this.setState({searchedBooks: response})
                    }
                })
        } else {
            this.setState({searchedBooks: []})
        }
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <DebounceInput
                            debounceTimeout={1000}
                            onChange={event => this.searchBooks(event)}
                            placeholder="Search by title or author"/>
                    </div>
                </div>
                <div className="search-books-results">
                    <Bookshelf
                        title="Search Results"
                        updateBookshelf={this.props.updateBookshelf}
                        books={this.state.searchedBooks}/>
                </div>
            </div>
        );
    }
}

export default Search;
