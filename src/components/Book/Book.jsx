import React, {useState} from "react";


import styles from "./Book.module.css"
import cx from "classnames";

function Book({addFavourite, book}) {
    const [favourite, setFavourite] = useState(localStorage.getItem(book.id) ? {isFavourite: true, icon: 'fas fa-times'} : {isFavourite: false, icon: 'fas fa-plus'});

    const favouriteButtonClickHandler = () => {
        addFavourite(book.id);
        if (localStorage.getItem(book.id)) {
            setFavourite({isFavourite: true, icon: 'fas fa-times'});
        } else {
            setFavourite({isFavourite: false, icon: 'fas fa-plus'});
        }
    }

    return (
        <div className={styles.bookCard}>
            <div className={styles.bookImg}>
                <img src={ typeof book.volumeInfo.imageLinks != "undefined" ? book.volumeInfo.imageLinks.thumbnail : '' }/>
            </div>
            <div className={styles.bookCategory}>
                { typeof book.volumeInfo.categories != "undefined" && (<span>{book.volumeInfo.categories[0]}</span>)}
            </div>
            <div className={styles.bookInfo}>
                <h3 style={{color: '#9e633c'}}>{book.volumeInfo.title} <small>({new Date(book.volumeInfo.publishedDate).getFullYear()})</small></h3>
                <h4>{ typeof book.volumeInfo.subtitle != "undefined" && book.volumeInfo.subtitle}</h4>
                <h5>{ typeof book.volumeInfo.authors != "undefined" && book.volumeInfo.authors.join(', ')}</h5>
                <p><i>{ typeof book.volumeInfo.description != "undefined" && book.volumeInfo.description.substring(0,150) + '...'}</i></p>
            </div>
            <button onClick={favouriteButtonClickHandler}><i className={cx(favourite.icon, (favourite.isFavourite ? styles.red : styles.green))}/></button>
        </div>
    )
}

export default Book;