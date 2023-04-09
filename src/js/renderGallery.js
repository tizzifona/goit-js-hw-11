const gallery = document.querySelector('.gallery');

export function renderGallery(images) {
    const markup = images
        .map(image => {
    return `
        <a class="gallery-link" href="${image.largeImageURL}">
        <div class="gallery-item" id="${image.id}">
            <img class="gallery-item__img" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
            <div class="info">
                <p class="gallery-item__info"><b>Likes</b>${image.likes}</p>
                <p class="gallery-item__info"><b>Views</b>${image.views}</p>
                <p class="gallery-item__info"><b>Comments</b>${image.comments}</p>
                <p class="gallery-item__info"><b>Downloads</b>${image.downloads}</p>
            </div>
            </div>
        </a>
        `;
    })
    .join('');

    gallery.insertAdjacentHTML('beforeend', markup);
}