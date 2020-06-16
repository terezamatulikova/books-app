import React, {useEffect, useState} from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import Books from "./components/Books/Books";
import Library from "./components/Library/Library";

import './App.css';
import {GetBooks, GetBook} from "./api";


export default function App(){
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');

    const [searchTerm, setSearchTerm] = useState('');
    const [showLibrary, setShowLibrary] = useState(false);


    const searchedTerm = () => {
        let input = [];
        if(title.length > 0){
            input.push(title);
        }
        if(author.length > 0){
            input.push(author);
        }
        if(category.length > 0){
            input.push(category);
        }

        let searchedTerm = input.join(' ');

        setTitle('');
        setAuthor('');
        setCategory('');
        
        return searchedTerm;
    }

    useEffect(() => {
        let term = searchedTerm();
        setSearchTerm(term);
    }, [books]);

    const search = async () => {
        let fetchedBooks = await GetBooks(title, author, category);
        setBooks(fetchedBooks);
    }

    const addFavourite = (id) => {
        if (localStorage.getItem(id)) localStorage.removeItem(id);
        else localStorage.setItem(id,id);
    }

    const setContent = async (clicked) => {
        if(clicked){
            setShowLibrary(prevState => !prevState);
            setBooks([]);
            if(!showLibrary) {
                if (localStorage.length > 0) {
                    let favouriteBooks = [];
                    let ids = [];

                    Object.keys(localStorage).forEach(key => ids.push(key));

                    await Promise.all(ids.map(async (id) => {
                        let book = await GetBook(id);
                        favouriteBooks.push(book.data);
                    }))
                    setBooks({data: {items: favouriteBooks, totalItems: favouriteBooks.length}});
                }
            }
        }
    }

    return (
        <div>
            <Library showLibrary={showLibrary} setContent={setContent}/>
            { !showLibrary && <SearchBar title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} category={category} setCategory={setCategory} search={search}/>}
            { typeof books.data != "undefined" && books.data.totalItems > 0 ? (
                <Books addFavourite={addFavourite} books={books.data.items} searchedTerm={searchTerm}/>
            ) : (
                <div style={{textAlign:'center', fontSize:'90px', fontWeight:'bold', marginTop:'12%', color:'white', letterSpacing:'10px', textShadow:'-1px 0 10px #a2836e, 0 1px 10px #a2836e, 1px 0 10px #a2836e, 0 -1px 10px #a2836e'}}>
                    { showLibrary ?
                        (
                            <>
                            MY<br />
                            LIBRARY
                            </>
                        ) :
                        (
                            <>
                            BOOK<br />
                            DATABASE
                            </>
                        )
                    }
                </div>
            )}
        </div>
    )
};