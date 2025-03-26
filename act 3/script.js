function showInfo(title, description, imagePath) {
    const infoBox = document.getElementById('info-box');
    infoBox.innerHTML = `
        <div class="info-content">
            <div class="info-header">
                <h3 class="info-title">${title}</h3>
            </div>
            <img src="${imagePath}" alt="${title}" class="info-image">
            <p class="info-description">${description}</p>
        </div>
    `;
    
    infoBox.style.display = 'block';
    setTimeout(() => infoBox.classList.add('visible'), 10);
    
    document.addEventListener('mousemove', moveInfoBox);
}

function calculateImagePosition(e) {
    const container = document.querySelector('.map-container');
    const image = document.getElementById('pup-map-img');
    const rect = container.getBoundingClientRect();
    const imageRect = image.getBoundingClientRect();

    // Get the actual image dimensions within the container
    const imageWidth = imageRect.width;
    const imageHeight = imageRect.height;

    // Calculate position relative to the actual image
    const x = (e.clientX - imageRect.left);
    const y = (e.clientY - imageRect.top);

    return {
        x: Math.max(0, Math.min(x, imageWidth)),
        y: Math.max(0, Math.min(y, imageHeight))
    };
}

function moveInfoBox(e) {
    const infoBox = document.getElementById('info-box');
    const pos = calculateImagePosition(e);
    
    // Position the info box with some offset from cursor
    infoBox.style.left = `${e.clientX + 15}px`;
    infoBox.style.top = `${e.clientY + 15}px`;
}

function hideInfo() {
    const infoBox = document.getElementById('info-box');
    infoBox.classList.remove('visible');
    setTimeout(() => infoBox.style.display = 'none', 300);
    document.removeEventListener('mousemove', moveInfoBox);
}

let currentZoom = 1;
const zoomStep = 0.1;
const maxZoom = 2;
const minZoom = 0.5;

function zoomIn() {
    if (currentZoom < maxZoom) {
        currentZoom += zoomStep;
        updateZoom();
    }
}

function zoomOut() {
    if (currentZoom > minZoom) {
        currentZoom -= zoomStep;
        updateZoom();
    }
}

function updateZoom() {
    const image = document.getElementById('pup-map-img');
    image.style.transform = `scale(${currentZoom})`;
}

function updateBreadcrumb(location) {
    const breadcrumb = document.querySelector('.breadcrumb');
    breadcrumb.innerHTML = `<span>Home</span> > <span>${location}</span>`;
}

function startMap() {
    document.getElementById('welcome-screen').style.display = 'none';
    const mapContent = document.getElementById('map-content');
    mapContent.style.display = 'block';

    const mapImage = document.getElementById('pup-map-img');
    const mapBlurBg = document.getElementById('map-blur-bg');
    mapBlurBg.style.backgroundImage = `url(${mapImage.src})`;
}
