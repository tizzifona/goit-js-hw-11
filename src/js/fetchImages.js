import axios from 'axios';

const url = 'https://pixabay.com/api/';
const key = '35150720-b15f0fa2c687c3d3761b15b78';

export async function fetchImages(searchQuery, page, perPage) {
    return await axios.get(`${url}?key=${key}&q=${searchQuery}$&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`)
        .then(response => response.data)
        .then (console.log());
}