
const ID_CANVAS_KMEANS = 'canvas_kmeans';
var kMeans;

document.addEventListener("DOMContentLoaded", function() {
    console.log('DOM Loaded!');
    kMeans = new KMeans(ID_CANVAS_KMEANS);
    resizeCanvas();

    // Hide previous and next buttons
    let navButtonsGroup = document.getElementsByClassName('div-nav-button');
    navButtonsGroup[0].style.visibility = 'hidden';
    navButtonsGroup[1].style.visibility = 'hidden';

    let actionButtonElement = document.getElementsByClassName('action-button')[0];
    actionButtonElement.addEventListener('click', function() {
        
        if (this.value == 'Start!') {

            // Start kMeans
            let kmeansNumber = document.getElementById('k_number').value;
            kMeans.setK(kmeansNumber);

            if (!kMeans.start()) {
                alert('No instances to start or kMeans already started!');
                return;
            }

            // Set nav buttons visible
            navButtonsGroup[0].style.visibility = 'visible';
            navButtonsGroup[1].style.visibility = 'visible';

            // Change to Reset Button
            this.classList.remove('btn-success');
            this.classList.add('btn-info');
            this.value = 'Reset';
        } else {

            // Reset board
            kMeans.reset();

            // Hide nav buttons
            navButtonsGroup[0].style.visibility = 'hidden';
            navButtonsGroup[1].style.visibility = 'hidden';

            // Change to Reset Button
            this.classList.remove('btn-info');
            this.classList.add('btn-success');
            this.value = 'Start!';

        }
    });

    let stopButtonElement = document.getElementsByClassName('stop-button')[0];
    stopButtonElement.addEventListener('click', function() {
        
        kMeans.stop();

        // Hide nav buttons
        navButtonsGroup[0].style.visibility = 'hidden';
        navButtonsGroup[1].style.visibility = 'hidden';

    });

    let previousButtonElement = document.getElementById('previous_button');
    previousButtonElement.addEventListener('click', function() {

    });

    let nextButtonElement = document.getElementById('next_button');
    nextButtonElement.addEventListener('click', function() {
        kMeans.recalculateGroups();
    });

});

window.addEventListener('click', function(event) {
    
    if (event.target.id == ID_CANVAS_KMEANS && !kMeans.isStarted()) {
        kMeans.addInstance(event.offsetX, event.offsetY);
    }
});

window.addEventListener('resize', function() {
    resizeCanvas();
});

function resizeCanvas() {
    let canvasDiv = document.getElementsByClassName('div-canvas-kmeans')[0];
    canvasDiv.height = window.innerHeight;
    kMeans.resizeBoard(canvasDiv.offsetWidth, canvasDiv.offsetHeight);
}