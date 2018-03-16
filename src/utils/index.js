
export const updateBooks = searchedBooks => book => searchedBooks.forEach(b => {
    if (b.id === book.id) {
        b.shelf = book.shelf
    }
});

export const filterBooks = books => shelf => books.filter(b => b.shelf === shelf);
