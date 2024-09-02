const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const closeLightbox = document.getElementById('closeLightbox');
const prevPhoto = document.getElementById('prevPhoto');
const nextPhoto = document.getElementById('nextPhoto');
const filterButtons = document.querySelectorAll('.filter-btn');
const tagButtons = document.querySelectorAll('.tag-btn');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

const photos = [
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2ITKdVJAiCC5P9lUIN--dP9rNlqnUsQ0PAQ&s', category: 'people', tags: ['portrait'] },
    { src: 'https://asset.gecdesigns.com/img/wallpapers/beautiful-magical-misty-mountains-reflection-river-ultra-hd-wallpaper-4k-sr10012420-1706505766369-cover.webp', category: 'nature', tags: ['landscape', 'water'] },
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-bLwfhvuqABUzTtL4hPm8ejZlRssD6yxtTA&s', category: 'architecture', tags: ['urban'] },
    { src: 'https://play-lh.googleusercontent.com/BpZW3-Loxcv_DY3RX8bmVGzPl6d4NXPe5gOUg2MgYa8WJWD8vd1Y9T2EsQvDVuqvpTQM', category: 'people', tags: ['portrait'] },
    { src: 'https://cdn.pixabay.com/photo/2021/11/13/23/06/tree-6792528_640.jpg', category: 'nature', tags: ['landscape', 'water'] },
    { src: 'https://w0.peakpx.com/wallpaper/620/896/HD-wallpaper-konoha-hokage-monument-after-fourth-shinobi-world-war-naruto-anime-sky-manga-boruto-the-next-generations-konohagakure-clouds-boruto-new-era-ninja-village-day.jpg', category: 'architecture', tags: ['urban'] },
    { src: 'https://wallpaperaccess.com/full/5244015.jpg', category: 'people', tags: ['portrait'] },
    { src: 'https://img.freepik.com/free-photo/japan-background-digital-art_23-2151546131.jpg', category: 'nature', tags: ['landscape'] },
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBIvi-DVPFvR3R2TdisAwdxNYcmw2SPTbTIQ&s', category: 'architecture', tags: ['urban'] },
    { src: 'https://w0.peakpx.com/wallpaper/153/240/HD-wallpaper-alone-boy-exploring-city-ai-art.jpg', category: 'people', tags: ['portrait'] },
    { src: 'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg', category: 'nature', tags: ['landscape', 'water'] },
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJhkU2DY16-aSHjPP5XSoVJp3RxJ0BCt5Ouw&s', category: 'architecture', tags: ['urban'] },
    { src: 'https://i.pinimg.com/474x/71/a6/4e/71a64ef2a5017c4d68c2cf096d6ceca1.jpg', category: 'people', tags: ['portrait'] },
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPoAm5lYkb4mUAmtpGdLlz45FbPylugNRgCqNchkJ-UzD1RDxI_7bbZRvoJ46vFWw0aOc&usqp=CAU', category: 'nature', tags: ['landscape'] },
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSYjtHLW5151nTWtSWuuzWCjvkzY0GGis8WA&s', category: 'architecture', tags: ['urban'] },
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk7L-Nydy-e9o-c-5LyN-GylwKhCAq-pd8pQ&s', category: 'people', tags: ['portrait'] },
    { src: 'https://wallpapershome.com/images/pages/ico_h/26026.jpeg', category: 'architecture', tags: ['urban'] },
    { src: 'https://wallpapers.com/images/hd/4k-mountain-l3f04sogeaabr5h0.jpg', category: 'nature', tags: ['landscape'] },
    
   
];

let currentCategory = 'all';
let currentTags = [];
let currentPhotoIndex = 0;
let filteredPhotos = [...photos];

function renderGallery() {
    gallery.innerHTML = '';
    filteredPhotos = photos.filter(photo => 
        (currentCategory === 'all' || photo.category === currentCategory) &&
        (currentTags.length === 0 || currentTags.every(tag => photo.tags.includes(tag)))
    );

    filteredPhotos.forEach((photo, index) => {
        const item = document.createElement('div');
        item.classList.add('gallery-item');
        item.innerHTML = `
            <img src="${photo.src}" alt="Photo ${index + 1}" loading="lazy">
            <div class="rating">
                ${[...Array(5)].map((_, i) => 
                    `<span class="star" data-index="${i + 1}" data-photo-index="${index}">&#9733;</span>`).join('')}
            </div>
        `;
        item.addEventListener('click', (event) => {
            if (!event.target.classList.contains('star')) {
                openLightbox(index);
            }
        });
        gallery.appendChild(item);
    });

    initMasonry();
    addRatingListeners();
}

function initMasonry() {
    imagesLoaded(gallery, function() {
        new Masonry(gallery, {
            itemSelector: '.gallery-item',
            columnWidth: '.gallery-item',
            percentPosition: true
        });
    });
}

function openLightbox(index) {
    currentPhotoIndex = index;
    updateLightboxImage();
    lightbox.style.display = 'flex';
    initZoom();
}

function updateLightboxImage() {
    lightboxImage.src = filteredPhotos[currentPhotoIndex].src;
    lightboxImage.alt = `Photo ${currentPhotoIndex + 1}`;
}

function initZoom() {
    mediumZoom('#lightboxImage', {
        background: '#000',
        scrollOffset: 0,
        container: '#lightbox'
    });
}

function closeLightboxHandler() {
    lightbox.style.display = 'none';
}

function prevPhotoHandler() {
    currentPhotoIndex = (currentPhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    updateLightboxImage();
}

function nextPhotoHandler() {
    currentPhotoIndex = (currentPhotoIndex + 1) % filteredPhotos.length;
    updateLightboxImage();
}

function filterGallery(category) {
    currentCategory = category;
    renderGallery();
    filterButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.category === category));
}

function toggleTag(tag) {
    if (currentTags.includes(tag)) {
        currentTags = currentTags.filter(t => t !== tag);
    } else {
        currentTags.push(tag);
    }
    renderGallery();
    tagButtons.forEach(btn => btn.classList.toggle('active', currentTags.includes(btn.dataset.tag)));
}

function addRatingListeners() {
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.addEventListener('click', handleRatingClick);
    });
}

function handleRatingClick(event) {
    const star = event.target;
    const rating = parseInt(star.dataset.index);
    const photoIndex = parseInt(star.dataset.photoIndex);

    filteredPhotos[photoIndex].rating = rating;
    updateStarRating(photoIndex, rating);
}

function updateStarRating(photoIndex, rating) {
    const stars = document.querySelectorAll(`.star[data-photo-index="${photoIndex}"]`);
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('rated');
        } else {
            star.classList.remove('rated');
        }
    });
}

function searchGallery() {
    const searchTerm = searchInput.value.toLowerCase();
    filteredPhotos = photos.filter(photo => 
        photo.category.toLowerCase().includes(searchTerm) ||
        photo.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
    renderGallery();
}

searchButton.addEventListener('click', searchGallery);
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        searchGallery();
    }
});

closeLightbox.addEventListener('click', closeLightboxHandler);
prevPhoto.addEventListener('click', prevPhotoHandler);
nextPhoto.addEventListener('click', nextPhotoHandler);
filterButtons.forEach(btn => btn.addEventListener('click', () => filterGallery(btn.dataset.category)));
tagButtons.forEach(btn => btn.addEventListener('click', () => toggleTag(btn.dataset.tag)));

renderGallery();
