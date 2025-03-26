function showInfo(text) {
    const infoBox = document.getElementById('info-box');
    infoBox.style.display = 'block';
    infoBox.innerHTML = text;
    
    // Update info box position based on mouse movement
    document.addEventListener('mousemove', moveInfoBox);
}

function moveInfoBox(e) {
    const infoBox = document.getElementById('info-box');
    infoBox.style.left = (e.pageX + 10) + 'px';
    infoBox.style.top = (e.pageY + 10) + 'px';
}

function hideInfo() {
    const infoBox = document.getElementById('info-box');
    infoBox.style.display = 'none';
    document.removeEventListener('mousemove', moveInfoBox);
}

function highlightArea(area) {
    area.classList.add('highlight');
}

function removeHighlight(area) {
    area.classList.remove('highlight');
}

// Remove or comment out the GetCoordinates and FindPosition functions as they're no longer needed

function startMap() {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('map-content').style.display = 'block';
}
