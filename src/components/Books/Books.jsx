import React from "react";
import Book from "../Book/Book";

import styles from "./Books.module.css";

function Books({ addFavourite, books, searchedTerm }) {
    return (
        <div className={styles.bookContainer}>
            { searchedTerm && <div className={styles.searchedTerm}>We found these results for your searched term <span>"{searchedTerm}"</span>.</div>}
            { books.map(book => (
                <Book addFavourite={addFavourite} book={book}/>
            ))}
        </div>
    )
}

export default Books;