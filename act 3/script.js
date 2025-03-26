const ORIGINAL_IMAGE_WIDTH = 1920; // Set this to your image's actual width
const ORIGINAL_IMAGE_HEIGHT = 1080; // Set this to your image's actual height

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
    const image = document.getElementById('pup-map-img');
    const rect = image.getBoundingClientRect();
    
    // Account for zoom level
    const x = (e.clientX - rect.left) / currentZoom;
    const y = (e.clientY - rect.top) / currentZoom;

    return { x, y };
}

function moveInfoBox(e) {
    const infoBox = document.getElementById('info-box');
    const pos = calculateImagePosition(e);
    
    // Position the info box with some offset from cursor
    // Use screen coordinates instead of image coordinates
    const offsetX = window.innerWidth - e.clientX < 400 ? -400 : 15; // Prevent overflow
    infoBox.style.left = `${e.clientX + offsetX}px`;
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
    const container = document.querySelector('.map-container');
    
    // Center the zoom
    const centerX = container.offsetWidth / 2;
    const centerY = container.offsetHeight / 2;
    
    image.style.transformOrigin = `${centerX}px ${centerY}px`;
    image.style.transform = `scale(${currentZoom})`;
    
    // Update all area coordinates after zoom
    const areas = document.getElementsByTagName('area');
    Array.from(areas).forEach(area => {
        const scaledCoords = calculateScaledCoordinates(area);
        area.coords = scaledCoords.join(',');
    });
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

function calculateScaledCoordinates(area) {
    const image = document.getElementById('pup-map-img');
    const rect = image.getBoundingClientRect();
    const coords = area.coords.split(',').map(Number);
    
    // Calculate scale factors
    const scaleX = rect.width / ORIGINAL_IMAGE_WIDTH;
    const scaleY = rect.height / ORIGINAL_IMAGE_HEIGHT;
    
    // Scale coordinates
    let scaledCoords;
    if (area.shape === 'rect') {
        scaledCoords = [
            coords[0] * scaleX,
            coords[1] * scaleY,
            coords[2] * scaleX,
            coords[3] * scaleY
        ];
    } else if (area.shape === 'circle') {
        scaledCoords = [
            coords[0] * scaleX,
            coords[1] * scaleY,
            coords[2] * Math.min(scaleX, scaleY) // radius
        ];
    }
    
    return scaledCoords;
}

document.addEventListener('DOMContentLoaded', function() {
    const areas = document.getElementsByTagName('area');
    Array.from(areas).forEach(area => {
        area.addEventListener('mouseover', function(e) {
            const scaledCoords = calculateScaledCoordinates(this);
            // Update area coordinates
            this.coords = scaledCoords.join(',');
        });
    });
});
