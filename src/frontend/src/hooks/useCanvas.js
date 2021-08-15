import React, { useRef, useEffect, useState } from 'react';

const MAXIMUM_DRAWING_HISTORY_LENGTH = 20;

const useCanvas = () => {
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const drawingHistoryRaw = localStorage.getItem('drawingHistory');
    if (drawingHistoryRaw) {
      var img = new Image();
      img.onload = function () {
        context.drawImage(img, 0, 0);
      };
      const drawingHistory = JSON.parse(drawingHistoryRaw);
      const lastDrawing = Math.max(...Object.keys(drawingHistory));
      const encodedDrawing = drawingHistory[lastDrawing].snapshot;
      img.src = encodedDrawing;
    }

    context.lineCap = 'round';
    context.strokeStyle = '#111';
    context.lineWidth = 5;

    contextRef.current = context;
  }, []);

  const save = () => {
    let drawingHistoryRaw = localStorage.getItem('drawingHistory');
    if (!drawingHistoryRaw) {
      const emptyDrawingHistory = JSON.stringify({});
      drawingHistoryRaw = emptyDrawingHistory;
    }

    let drawingHistory = JSON.parse(drawingHistoryRaw);

    const savesTimes = Object.keys(drawingHistory);
    if (MAXIMUM_DRAWING_HISTORY_LENGTH <= savesTimes.length) {
      const oldestSaveTime = Math.min(...savesTimes);
      delete drawingHistory[oldestSaveTime];
    }

    const snapshot = canvasRef.current.toDataURL();
    drawingHistory[Date.now()] = { snapshot };

    localStorage.setItem('drawingHistory', JSON.stringify(drawingHistory));
  };

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
    save();
  };

  const draw = (e) => {
    if (!isDrawing) {
      return;
    }
    let { offsetX: x, offsetY: y } = e.nativeEvent;
    if (!x && !y) {
      const rect = e.target.getBoundingClientRect();
      x = e.targetTouches[0].pageX - rect.left;
      y = e.targetTouches[0].pageY - rect.top;
    }

    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
  };

  const Canvas = (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onTouchStart={startDrawing}
      onMouseUp={finishDrawing}
      onTouchEnd={finishDrawing}
      onMouseMove={draw}
      onTouchMove={draw}
      width="320px"
      height="320px"
      style={{ border: '1px solid #eee' }}
    />
  );

  return {
    context: contextRef,
    save,
    Canvas,
  };
};

export default useCanvas;
