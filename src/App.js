import React from 'react'
import {Link, Route} from "react-router-dom"
import Bookshelf from './components/Bookshelf'
import Search from './components/Search'
import * as BooksAPI from './api/BooksAPI'
import './App.css'

class BooksApp extends React.Component {
    state = {
        currentlyReading: [],
        wantToRead: [],
        read: []
    }

    componentDidMount() {
        this.loadBooks()
    }

    loadBooks = () => {
        BooksAPI.getAll()
                .then(response => {
                    this.setState({ currentlyReading: response.filter(book => book.shelf === "currentlyReading") })
                    this.setState({ wantToRead: response.filter(book => book.shelf === "wantToRead") })
                    this.setState({ read: response.filter(book => book.shelf === "read") })
                })
    }

    updateBook = (shelf, book) => {
        BooksAPI.update(book, shelf)
                .then(response => this.loadBooks())
    }

    render() {
        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                <Bookshelf books={this.state.currentlyReading} title="Currently Reading" updateBookshelf={this.updateBook} />
                                <Bookshelf books={this.state.wantToRead} title="Want to Read" updateBookshelf={this.updateBook} />
                                <Bookshelf books={this.state.read} title="Read" updateBookshelf={this.updateBook} />
                            </div>
                        </div>
                        <div className="open-search">
                            <Link to="/search">Add a book</Link>
                        </div>
                    </div>
                )}/>

                <Route path="/search" render={() => (
                    <Search updateBookshelf={this.updateBook} />
                )}/>
            </div>
        )
    }
}

export default BooksApp
