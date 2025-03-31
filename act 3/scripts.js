function showInfo(title, description, imagePath) {
    const infoBox = document.getElementById('info-box');
    infoBox.innerHTML = `
        <h3 style="margin-top: 0">${title}</h3>
        ${imagePath ? `<img src="${imagePath}" alt="${title}" style="width:100%">` : ''}
        <p style="margin-bottom: 0">${description}</p>
    `;
    infoBox.style.display = 'block';
    document.addEventListener('mousemove', moveInfoBox);
}

function moveInfoBox(e) {
    const infoBox = document.getElementById('info-box');
    const padding = 20;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Get cursor position
    let cursorX = e.clientX;
    let cursorY = e.clientY;
    
    // Calculate available space on each side of the cursor
    const spaceRight = windowWidth - cursorX;
    const spaceBottom = windowHeight - cursorY;
    
    // Set initial position
    let left = cursorX + padding;
    let top = cursorY + padding;
    
    // Check horizontal position
    if (spaceRight < (infoBox.offsetWidth + padding)) {
        left = cursorX - infoBox.offsetWidth - padding;
    }
    
    // Check vertical position
    if (spaceBottom < (infoBox.offsetHeight + padding)) {
        top = cursorY - infoBox.offsetHeight - padding;
    }
    
    // Ensure box stays within viewport
    left = Math.max(padding, Math.min(left, windowWidth - infoBox.offsetWidth - padding));
    top = Math.max(padding, Math.min(top, windowHeight - infoBox.offsetHeight - padding));
    
    infoBox.style.left = left + 'px';
    infoBox.style.top = top + 'px';
}

function hideInfo() {
    const infoBox = document.getElementById('info-box');
    infoBox.style.display = 'none';
    document.removeEventListener('mousemove', moveInfoBox);
}

document.addEventListener('DOMContentLoaded', function() {
    const welcomeScreen = document.getElementById('welcome-screen');
    const mapContainer = document.querySelector('.map-container');
    const enterBtn = document.getElementById('enter-btn');

    enterBtn.addEventListener('click', function() {
        welcomeScreen.style.opacity = '0';
        setTimeout(() => {
            welcomeScreen.style.display = 'none';
            mapContainer.style.display = 'block';
        }, 500);
    });

    welcomeScreen.style.transition = 'opacity 0.5s ease';

    const areas = document.querySelectorAll('area');

    areas.forEach(area => {
        area.addEventListener('mouseenter', function() {
            showInfo(
                this.getAttribute('title'),
                this.getAttribute('data-full-description'),
                this.getAttribute('data-image')
            );
        });
        area.addEventListener('mouseleave', hideInfo);
    });
});
