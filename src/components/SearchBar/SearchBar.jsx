import React from "react";

import styles from "./SearchBar.module.css"

function SearchBar({ title, setTitle, author, setAuthor, category, setCategory, search }) {
    return (
        <div className={styles.searchBox}>
            <input value={title} className={styles.searchBar} type="text" onChange={event => setTitle(event.target.value)} placeholder="Title"/>
            <input value={author} className={styles.searchBar} type="text" onChange={event => setAuthor(event.target.value)} placeholder="Author"/>
            <input value={category} className={styles.searchBar} type="text" onChange={event => setCategory(event.target.value)} placeholder="Category"/>
            <button className={styles.button} onClick={search}><i className="fas fa-search"></i></button>
        </div>
    )
}

export default SearchBar;