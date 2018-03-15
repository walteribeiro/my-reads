import React from 'react';

class Book extends React.Component {
    handleChange = (evt, book) => {
        this.props.updateBookshelf(evt.target.value, book)
    }

    render() {
        const { book } = this.props;
        return (
            <div className="book">
                <div className="book-top">
                    <div
                        className="book-cover"
                        style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${book.imageLinks ? book.imageLinks.smallThumbnail : ''})`
                    }}></div>
                    <div className="book-shelf-changer">
                        <select value={book.shelf ? book.shelf : 'none'} onChange={(e) => this.handleChange(e, book)}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none" default>None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book ? book.title : ""}</div>
                <div className="book-authors">{book && book.authors ? book.authors[0] : ""}</div>
            </div>
        );
    }
}

export default Book;
