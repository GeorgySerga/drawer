/**
 * getCursorPosition returns the coordinates to draw at.
 * Takes in a React SyntheticEvent.
 */
export const getCursorPosition = (event) => {
  let { offsetX: x, offsetY: y } = event.nativeEvent || {};
  if (!x && !y) {
    // Used for touch device positioning
    const rect = event.target.getBoundingClientRect();
    x = event.targetTouches[0].pageX - rect.left;
    y = event.targetTouches[0].pageY - rect.top;
  }
  return { x, y };
};

/**
 * loadImageToCanvas loads image data onto the canvas,
 * scaling it to adjust to devicePixelRatio.
 */
export const loadImageToCanvas = ({ context, canvas }) => {
  const drawingHistoryRaw = localStorage.getItem('drawingHistory');
  if (drawingHistoryRaw) {
    const drawingHistory = JSON.parse(drawingHistoryRaw);
    const lastDrawing = Math.max(...Object.keys(drawingHistory));
    const encodedDrawing = drawingHistory[lastDrawing].snapshot;

    const ratio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    var img = new Image();
    img.onload = function () {
      context.drawImage(
        img,
        0,
        0,
        rect.width * ratio,
        rect.height * ratio,
        0,
        0,
        rect.width,
        rect.height
      );
    };
    img.src = encodedDrawing;
  }
};

/**
 * scaleCanvas scales canvas to look better on high DPI devices.
 * Initial idea: https://www.html5rocks.com/en/tutorials/canvas/hidpi/
 */
export const scaleCanvas = ({ context, canvas }) => {
  let rect = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;

  canvas.width = rect.width * ratio;
  canvas.height = rect.height * ratio;

  canvas.style.width = rect.width + 'px';
  canvas.style.height = rect.height + 'px';

  context.scale(ratio, ratio);
};
