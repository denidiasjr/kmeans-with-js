
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
            navButtonsGroup[0].style.visibility = 'visible';
            navButtonsGroup[1].style.visibility = 'visible';
            kMeans.setK(kmeansNumber);
            kMeans.start();

            // Change to Reset Button
            this.classList.remove('btn-success');
            this.classList.add('btn-danger');
            this.value = 'Reset';
        } else {

            // TODO - Reset logic

            // Change to Reset Button
            this.classList.remove('btn-danger');
            this.classList.add('btn-success');
            this.value = 'Start!';
        }
    });

    let previousButtonElement = document.getElementById('previous_button');
    previousButtonElement.addEventListener('click', function() {

        
    });

    let nextButtonElement = document.getElementById('next_button');
    nextButtonElement.addEventListener('click', function() {


    });

});

window.addEventListener('click', function(event) {
    
    if (event.target.id == ID_CANVAS_KMEANS && !kMeans.isStarted()) {
        kMeans.drawInstance(event.offsetX, event.offsetY);
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