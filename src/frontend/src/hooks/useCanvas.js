import React, { useRef, useEffect, useState } from 'react';

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
      const encodedDrawing = drawingHistory[drawingHistory.length - 1];
      img.src = encodedDrawing;
    }

    context.lineCap = 'round';
    context.strokeStyle = '#111';
    context.lineWidth = 5;

    contextRef.current = context;
  }, []);

  const save = (data) => {
    let drawingHistoryRaw = localStorage.getItem('drawingHistory');
    if (!drawingHistoryRaw) {
      const emptyDrawingHistory = JSON.stringify([]);
      localStorage.setItem('drawing', emptyDrawingHistory);
      drawingHistoryRaw = emptyDrawingHistory;
    }

    const drawingHistory = JSON.parse(drawingHistoryRaw);

    // TODO: Potential overflow
    drawingHistory.push(data);

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
    save(canvasRef.current.toDataURL());
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const Canvas = (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      width="320px"
      height="320px"
      style={{ border: '1px solid #eee' }}
    />
  );

  return {
    context: contextRef,
    Canvas,
  };
};

export default useCanvas;
