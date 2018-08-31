
const ID_CANVAS_KMEANS = 'canvas_kmeans';
var kMeans;

document.addEventListener("DOMContentLoaded", function() {
    kMeans = new KMeans(ID_CANVAS_KMEANS);
    resizeCanvas();

    // Buttons and groups
    let actionButtonElement = document.getElementById('action_button');
    let stopButtonElement = document.getElementById('stop_button');
    let nextButtonElement = document.getElementById('next_button');

    // Hide previous, next and stop buttons
    nextButtonElement.style.visibility = 'hidden';
    stopButtonElement.style.visibility = 'hidden';

    actionButtonElement.addEventListener('click', function() {
        
        if (this.value == 'Start!') {

            // Start kMeans
            let kmeansNumber = document.getElementById('k_number').value;
            kMeans.setK(kmeansNumber);

            try {

                // Start!
                kMeans.start();

                // Set nav buttons visible
                nextButtonElement.style.visibility = 'visible';
                stopButtonElement.style.visibility = 'visible';
    
                // Change to Reset Button
                this.classList.remove('btn-success');
                this.classList.add('btn-info');
                this.value = 'Reset';
                
            } catch (e) {
                alert(e.message);
            }

        } else {

            // Reset board
            kMeans.reset();

            // Hide nav buttons
            nextButtonElement.style.visibility = 'hidden';
            stopButtonElement.style.visibility = 'hidden';

            // Change to Reset Button
            this.classList.remove('btn-info');
            this.classList.add('btn-success');
            this.value = 'Start!';

        }
    });

    stopButtonElement.addEventListener('click', function() {
        
        kMeans.stop();

        // Hide nav buttons
        nextButtonElement.style.visibility = 'hidden';
        stopButtonElement.style.visibility = 'hidden';

        // Change to Reset Button
        actionButtonElement.classList.remove('btn-info');
        actionButtonElement.classList.add('btn-success');
        actionButtonElement.value = 'Start!';

    });

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