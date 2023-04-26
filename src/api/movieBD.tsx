import  axios  from 'axios';

const movieDB = axios.create ({

 baseURL: 'https://api.themoviedb.org/3/movie',
 params: {
    api_key: 'dbe5a15b800d38c8f7c5839d34dc308b',
    language: 'es-ES'
    }

});

export default movieDB