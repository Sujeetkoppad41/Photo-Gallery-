function filterPhotos(category) {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        const photo = box.querySelector('.photo');
        if (photo.style.backgroundImage.includes(category) || category === 'all') {
            box.style.display = 'block';
        } else {
            box.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    document.body.appendChild(modal);

    const modalContent = document.createElement('img');
    modalContent.classList.add('modal-content');
    modal.appendChild(modalContent);

    const closeModal = document.createElement('span');
    closeModal.classList.add('close');
    closeModal.innerHTML = '&times;';
    modal.appendChild(closeModal);

    const photos = document.querySelectorAll('.photo');
    photos.forEach(photo => {
        photo.addEventListener('click', () => {
            modal.style.display = 'flex';
            modalContent.src = photo.style.backgroundImage.replace('url("', '').replace('")', '');
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
