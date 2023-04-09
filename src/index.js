import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import './css/common.css';
import { fetchImages } from './js/fetchImages.js';
import { renderGallery } from "./js/renderGallery";


const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');
const formInput = document.querySelector('.form-input');

let lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});

let searchQuery = '';
const perPage = 40;
let page = 1;
let totalPages = 0;

searchForm.addEventListener('submit', onSearch);
loadBtn.addEventListener('click', loadMore);

async function onSearch(e) {
    e.preventDefault();
    resetPage();
    clearGallery();
    searchQuery = e.currentTarget.elements.searchQuery.value
        .trim()
        .toLowerCase();
    if (!searchQuery) {
        Notiflix.Notify.failure('Please, enter your search query!');
        return;
    }
    try {
        const searchData = await fetchImages(searchQuery, page, perPage);
        if (searchData.hits.length === 0) {
            Notiflix.Notify.failure(
                'Sorry, there are no images matching your search query. Please try again.'
            );
            return;
        }
        totalPages = Math.ceil(searchData.totalHits / perPage);
        renderGallery(searchData.hits);
        lightbox.refresh();
        Notiflix.Notify.success(`Hooray! We found ${searchData.totalHits} images!`);
        loadBtn.classList.remove('load-more__hidden');
    } catch (error) {
        Notiflix.Notify.failure('Something went wrong! Please retry');
        console.log(error);
    }
    clearInput();
}

async function loadMore() {
    try {
        const searchData = await fetchImages(searchQuery, ++page, perPage);
        renderGallery(searchData.hits);
        lightbox.refresh();
        if (page >= totalPages) {
            loadBtn.classList.add('load-more__hidden');
            Notiflix.Notify.info(
                "We're sorry, but you've reached the end of search results."
            );
        }
    } catch (error) {
        Notiflix.Notify.failure('Something went wrong! Please retry');
        console.log(error);
    }
}

function resetPage(){
    page = 1;
    totalPages = 0;
}

function clearGallery() {
    gallery.innerHTML = "";
};

function clearInput() {
    formInput.value = '';
}