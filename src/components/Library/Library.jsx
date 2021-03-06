import React from "react";

import styles from "./Library.module.css";

export default function Library({showLibrary, setContent}) {
    return(
        <button className={styles.myLibrary} onClick={() => setContent(true)}>{showLibrary ? 'HOME' : 'MY LIBRARY'}</button>
    )
};