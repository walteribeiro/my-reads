import React from 'react'
import Book from './Book'

class Bookshelf extends React.Component {
    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        { this.props.books && this.props.books.map(book => (
                            <li key={book.id}>
                                <Book updateBookshelf={this.props.updateBookshelf} book={book}/>
                            </li>
                        ))}
                        { !this.props.books && <li>Estante sem livros...</li>}
                    </ol>
                </div>
            </div>
        );
    }
}

export default Bookshelf;
