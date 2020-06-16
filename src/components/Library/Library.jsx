import React from "react";

import styles from "./Library.module.css";

function Library({showLibrary, setContent}) {
    return(
        <button className={styles.myLibrary} onClick={() => setContent(true)}>{showLibrary ? 'HOME' : 'MY LIBRARY'}</button>
    )
}

export default Library;