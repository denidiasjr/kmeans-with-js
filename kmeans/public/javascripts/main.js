
const ID_CANVAS_KMEANS = 'canvas_kmeans';
var kMeans;

document.addEventListener("DOMContentLoaded", function() {
    console.log('DOM Loaded!');
    kMeans = new KMeans(ID_CANVAS_KMEANS);
    resizeCanvas();

    let actionButtonElement = document.getElementsByClassName('action-button')[0];
    actionButtonElement.addEventListener('click', function() {
        kMeans.start();
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