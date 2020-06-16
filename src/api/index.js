import axios from "axios";

const api = {
    url: 'https://www.googleapis.com/books/v1/volumes?q=',
    APPID: 'AIzaSyAMrciX7Z1c6l9hz-g1A9Kpsna6EX966KE'
}

export const GetBooks = async (titleQuery, authorQuery, categoryQuery) => {
    let url = `${api.url}`;

    if (titleQuery.length > 0){
        url += `intitle:${titleQuery}+`
    }
    if (authorQuery.length > 0){
        url += `inauthor:${authorQuery}+`
    }
    if (categoryQuery.length > 0){
        url += `subject:${categoryQuery}+`
    }

    let data = axios.get(`${url}&key=${api.APPID}`);
    return data;
}

export const GetBook = async (id) => {
    let url = `https://www.googleapis.com/books/v1/volumes/${id}?key=${api.APPID}`;

    let data = axios.get(url);
    return data;
};