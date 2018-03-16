import React from 'react'
import {Link, Route} from "react-router-dom"
import Bookshelf from './components/Bookshelf'
import Search from './components/Search'
import * as BooksAPI from './api/BooksAPI'
import { filterBooks } from "./utils";
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

    loadBooks = async () => {
        const books = await BooksAPI.getAll()
        const filterBy = filterBooks(books)
        this.setState({
            currentlyReading: filterBy("currentlyReading"),
            wantToRead: filterBy("wantToRead"),
            read: filterBy("read")
        })
    }

    updateBook = (shelf, book) => {
        BooksAPI.update(book, shelf)
                .then(response => this.loadBooks())
    }

    render() {
        const { currentlyReading, wantToRead, read } = this.state
        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                <Bookshelf books={currentlyReading} title="Currently Reading" updateBookshelf={this.updateBook} />
                                <Bookshelf books={wantToRead} title="Want to Read" updateBookshelf={this.updateBook} />
                                <Bookshelf books={read} title="Read" updateBookshelf={this.updateBook} />
                            </div>
                        </div>
                        <div className="open-search">
                            <Link to="/search">Add a book</Link>
                        </div>
                    </div>
                )}/>

                <Route path="/search" render={() => (
                    <Search updateBookshelf={this.updateBook} bookshelfBooks={currentlyReading.concat(wantToRead, read)}/>
                )}/>
            </div>
        )
    }
}

export default BooksApp
