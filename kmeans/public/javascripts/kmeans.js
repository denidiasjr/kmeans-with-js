
class KMeans {

    constructor(id) {

        // Set canvas objects
        this.canvasElement = document.getElementById(id);
        if (!this.canvasElement) {
            console.error('Canvas element for kMeans not exists!');
            return;
        }
        this.canvasContext = this.canvasElement.getContext('2d');

        // Initialize other objects
        this.k = 5;
        this.started = false;
        this.step = 0;
        this.instances = [];
        this.groups = [];
        this.centroids = [];
        this.colors = [
            '#D50000', // Red
            '#01579B', // Blue
            '#1B5E20', // Green
            '#F57F17', // Orange
            '#F50057', // Pink
            '#37474F', // Gray
            '#3E2723', // Brown
            '#EF5350', // Light Red
            '#1E88E5', // Light Blue
            '#43A047', // Light Green
        ];
    }

    resizeBoard(width, height) {
        this.canvasElement.width = width;
        this.canvasElement.height = height;
    }

    clearBoard() {
        this.canvasContext.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    }

    drawInstance(x, y, color) {

        if (!color) {
            color = '#000';
        }

        this.canvasContext.beginPath();
        this.canvasContext.arc(x, y, 5, 0, Math.PI * 2);
        this.canvasContext.strokeStyle = color;
        this.canvasContext.fillStyle = color;
        this.canvasContext.closePath();
        this.canvasContext.fill();
        this.canvasContext.stroke();

        // Add to groups
        this.instances.push({'x': x, 'y': y});
    }

    drawCentroid(x, y, color) {

        if (!color) {
            color = '#000';
        }

        this.canvasContext.beginPath();
        this.canvasContext.arc(x, y, 7, 0, Math.PI * 2);
        this.canvasContext.strokeStyle = '#000';
        this.canvasContext.fillStyle = color;
        this.canvasContext.closePath();
        this.canvasContext.fill();
        this.canvasContext.stroke();

        // Add to centroids
        this.centroids.push({'x': x, 'y': y});
    }

    start() {

        if (this.isStarted()) {
            return;
        }

        this.started = true;
        this.clearBoard();

        // Initialize groups
        for (let i = 0; i < this.k; i++) {
            this.groups[i] = [];
        }

        // Set the initial groups
        let instancesLength = this.instances.length;
        for (let inst = 0; inst < instancesLength; inst++) {
            let randomK = Math.floor((Math.random() * this.k));
            this.groups[randomK].push({
                'x': this.instances[inst].x, 
                'y': this.instances[inst].y
            });
            this.drawInstance(this.instances[inst].x, this.instances[inst].y, this.colors[randomK]);
        }

        this.instances = [];
        this.setCentroids();
    }

    setCentroids() {

        for (let grp = 0; grp < this.k; grp++) {
            
            let groupLength = this.groups[grp].length;
            let centroidX = 0;
            let centroidY = 0;

            for (let inst = 0; inst < groupLength; inst++) {
                centroidX += this.groups[grp][inst].x;
                centroidY += this.groups[grp][inst].y;
            }
            
            centroidX /= groupLength;
            centroidY /= groupLength;

            this.drawCentroid(centroidX, centroidY, this.colors[grp]);
        }
    }

    isStarted() {
        return this.started;
    }

    setK(k) {
        this.k = k;
    }

}