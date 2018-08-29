
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
            '#43A047', // Light Green
            '#F50057', // Pink
            '#37474F', // Gray
            '#3E2723', // Brown
            '#EF5350', // Light Red
            '#1E88E5', // Light Blue
        ];
    }

    resizeBoard(width, height) {
        this.canvasElement.width = width;
        this.canvasElement.height = height;
    }

    clearBoard() {
        this.canvasContext.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    }

    resetGroups() {
        for (let i = 0; i < this.k; i++) {
            this.groups[i] = [];
        }
    }

    addInstance(x, y, color) {
        this.instances.push({'x': x, 'y': y});
        this.drawInstance(x, y, color);
    }

    addCentroid(x, y, color) {
        this.centroids.push({'x': x, 'y': y});
        this.drawCentroid(x, y, color);
    }

    drawInstance(x, y, color) {

        if (!color) {
            color = '#000';
        }

        this.canvasContext.beginPath();
        this.canvasContext.arc(x, y, 4, 0, Math.PI * 2);
        this.canvasContext.strokeStyle = color;
        this.canvasContext.fillStyle = color;
        this.canvasContext.closePath();
        this.canvasContext.fill();
        this.canvasContext.stroke();
    }

    drawCentroid(x, y, color) {

        if (!color) {
            color = '#000';
        }

        this.canvasContext.beginPath();
        this.canvasContext.arc(x, y, 6, 0, Math.PI * 2);
        this.canvasContext.strokeStyle = '#000';
        this.canvasContext.fillStyle = color;
        this.canvasContext.closePath();
        this.canvasContext.fill();
        this.canvasContext.stroke();
    }

    start() {

        if (this.isStarted()) {
            console.error('Algorithm already started');
            return false;
        }

        if (this.instances.length == 0) {
            console.error('No instances to start');
            return false;
        }

        this.started = true;
        this.clearBoard();

        // Initialize groups
        for (let i = 0; i < this.k; i++) {
            this.groups[i] = [];
        }

        // Set the initial groups
        for (let inst = 0; inst < this.instances.length; inst++) {
            let randomK = Math.floor((Math.random() * this.k));
            this.groups[randomK].push(this.instances[inst]);
            this.drawInstance(this.instances[inst].x, this.instances[inst].y, this.colors[randomK]);
        }

        this.setCentroids();

        return true;
    }

    stop() {
        this.clearBoard();
        this.resetGroups();
        this.instances = [];
        this.started = false;
        this.step = 0;
    }

    reset() {
        this.clearBoard();
        this.resetGroups();
        this.started = false;
        this.step = 0;

        // Draw instances for the first time
        for (let inst = 0; inst < this.instances.length; inst++) {
            this.drawInstance(this.instances[inst].x, this.instances[inst].y);
        }
    }

    setCentroids() {

        this.centroids = [];

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

            this.addCentroid(centroidX, centroidY, this.colors[grp]);
        }
    }

    recalculateGroups() {
        
        this.resetGroups();
        this.clearBoard();

        for (let inst = 0; inst < this.instances.length; inst++) {
            let group = this.getNearestGroup(this.instances[inst]);
            this.groups[group].push(this.instances[inst]);
            this.drawInstance(this.instances[inst].x, this.instances[inst].y, this.colors[group]);
        }

        this.setCentroids();
    }

    getNearestGroup(instance) {
        
        let nearestCentroid = 0;
        let bestDistance = Number.MAX_SAFE_INTEGER;

        for (let cent = 0; cent < this.centroids.length; cent++) {
            let distance = this.calcDistance(instance, this.centroids[cent]);

            if (distance < bestDistance) {
                nearestCentroid = cent;
                bestDistance = distance;
            }
        }

        return nearestCentroid;
    }

    calcDistance(a, b) {
        let calcX = Math.pow((b.x - a.x), 2);
        let calcY = Math.pow((b.y - a.y), 2);
        return Math.sqrt(calcX + calcY );
    }

    isStarted() {
        return this.started;
    }

    setK(k) {
        this.k = k;
    }

}