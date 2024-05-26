// your-drawing-library.js

// Variables for drawing
let isDrawing = false;
let drawingContext;

// Function to initialize drawing
function initDrawing(canvasId) {
    const drawingCanvas = document.getElementById(canvasId);
    if (drawingCanvas) {
        drawingContext = drawingCanvas.getContext('2d');
        
        drawingCanvas.addEventListener('mousedown', startDrawing);
        drawingCanvas.addEventListener('mousemove', draw);
        drawingCanvas.addEventListener('mouseup', stopDrawing);
    }
}

function startDrawing(event) {
    isDrawing = true;
    const x = event.clientX - drawingCanvas.getBoundingClientRect().left;
    const y = event.clientY - drawingCanvas.getBoundingClientRect().top;

    drawingContext.beginPath();
    drawingContext.moveTo(x, y);
}

function draw(event) {
    if (!isDrawing) return;

    const x = event.clientX - drawingCanvas.getBoundingClientRect().left;
    const y = event.clientY - drawingCanvas.getBoundingClientRect().top;

    drawingContext.lineTo(x, y);
    drawingContext.stroke();
}

function stopDrawing() {
    isDrawing = false;
    drawingContext.closePath();
}

// Function to clear the drawing canvas
function clearDrawing() {
    drawingContext.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
}

// Add more functions and controls as needed

