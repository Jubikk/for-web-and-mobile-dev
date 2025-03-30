function showInfo(title, description, imagePath) {
    const infoBox = document.getElementById('info-box');
    infoBox.innerHTML = `
        <h3 style="margin-top: 0">${title}</h3>
        ${imagePath ? `<img src="${imagePath}" alt="${title}" style="width:100%">` : ''}
        <p style="margin-bottom: 0">${description}</p>
        <p class="click-more">Click to see more details</p>
    `;
    infoBox.style.display = 'block';
    document.addEventListener('mousemove', moveInfoBox);
}

function moveInfoBox(e) {
    const infoBox = document.getElementById('info-box');
    const padding = 20;
    
    let left = e.pageX + padding;
    let top = e.pageY + padding;
    
    // Adjust position if it would go off screen
    if (left + infoBox.offsetWidth > window.innerWidth) {
        left = e.pageX - infoBox.offsetWidth - padding;
    }
    if (top + infoBox.offsetHeight > window.innerHeight) {
        top = e.pageY - infoBox.offsetHeight - padding;
    }
    
    infoBox.style.left = left + 'px';
    infoBox.style.top = top + 'px';
}

function hideInfo() {
    const infoBox = document.getElementById('info-box');
    infoBox.style.display = 'none';
    document.removeEventListener('mousemove', moveInfoBox);
}

function showFullDescription(title, description, imagePath) {
    const fullDescBox = document.getElementById('full-description-box');
    const content = fullDescBox.querySelector('.full-description-content');
    
    // Get the full description from the clicked element
    const fullDescription = event.target.getAttribute('data-full-description') || description;
    
    content.querySelector('h2').textContent = title;
    content.querySelector('img').src = imagePath;
    content.querySelector('img').alt = title;
    content.querySelector('.description-content p').textContent = fullDescription;
    
    fullDescBox.style.display = 'flex';
    
    // Enhanced animation
    content.style.opacity = 0;
    content.style.transform = 'translateY(30px) scale(0.95)';
    setTimeout(() => {
        content.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        content.style.opacity = 1;
        content.style.transform = 'translateY(0) scale(1)';
    }, 10);
}

// Add close animation
function closeFullDescription() {
    const fullDescBox = document.getElementById('full-description-box');
    const content = fullDescBox.querySelector('.full-description-content');
    
    content.style.opacity = 0;
    content.style.transform = 'translateY(30px) scale(0.95)';
    
    setTimeout(() => {
        fullDescBox.style.display = 'none';
        content.style.transition = 'none';
    }, 300);
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

    // Add transition property to welcome screen
    welcomeScreen.style.transition = 'opacity 0.5s ease';

    const areas = document.querySelectorAll('area');
    const fullDescBox = document.getElementById('full-description-box');
    const closeBtn = document.querySelector('.close-btn');

    areas.forEach(area => {
        area.addEventListener('mouseenter', function() {
            showInfo(
                this.getAttribute('title'),
                this.getAttribute('alt'),
                this.getAttribute('data-image')
            );
        });
        area.addEventListener('mouseleave', hideInfo);
        area.addEventListener('click', function(e) {
            e.preventDefault();
            showFullDescription(
                this.getAttribute('title'),
                this.getAttribute('data-full-description') || this.getAttribute('alt'),
                this.getAttribute('data-image')
            );
        });
    });

    closeBtn.addEventListener('click', function() {
        closeFullDescription();
    });

    // Close full description when clicking outside
    fullDescBox.addEventListener('click', function(e) {
        if (e.target === fullDescBox) {
            closeFullDescription();
        }
    });
});
