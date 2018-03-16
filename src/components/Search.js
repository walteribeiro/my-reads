import React from 'react';
import {Link} from "react-router-dom"
import {DebounceInput} from "react-debounce-input";
import Bookshelf from './Bookshelf'
import * as BooksAPI from '../api/BooksAPI'
import { updateBooks } from "../utils";


class Search extends React.Component {
    state = {
        searchedBooks: []
    }

    searchBooks = async evt => {
        let searchedBooks = [];

        if (evt.target.value) {
            const books = await BooksAPI.search(evt.target.value)
            searchedBooks = books && !books.hasOwnProperty('error') ? books : []

            const updateBookState = updateBooks(searchedBooks)
            this.props.bookshelfBooks.forEach(book => {
                updateBookState(book)
            })

            this.setState({ searchedBooks })
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
