import React, { useRef, useEffect, useState } from 'react';
import {
  getCursorPosition,
  loadImageToCanvas,
  scaleCanvas,
} from '../utils/canvas';

const MAXIMUM_DRAWING_HISTORY_LENGTH = 20;

const useCanvas = () => {
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    scaleCanvas({ canvas, context });

    loadImageToCanvas({ canvas, context });

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

  const startDrawing = (event) => {
    const { x, y } = getCursorPosition(event);
    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
    save();
  };

  const draw = (event) => {
    if (!isDrawing) {
      return;
    }
    const { x, y } = getCursorPosition(event);
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
      style={{ border: '1px solid #eee', touchAction: 'none' }}
    />
  );

  return {
    context: contextRef,
    save,
    Canvas,
  };
};

export default useCanvas;
