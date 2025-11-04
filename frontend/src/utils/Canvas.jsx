import React, { useRef, useState, useEffect } from "react";
import socket from "../config/socket";
import { useRoom } from "../context/roomId";

const DrawingCanvas = (props) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState("pen"); 
  const [history, setHistory] = useState([]); 
  const [historyStep, setHistoryStep] = useState(-1);
  const prevPosition = useRef({x: 0, y:0});

  const {roomId} = useRoom();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  const getMousePos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * canvas.width,
      y: ((e.clientY - rect.top) / rect.height) * canvas.height,
    };
  };

  useEffect(() => {

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    socket.on("connection", () => {
      console.log("Socket connected: ", socket.id);
    })

    socket.on("draw", ({roomId, data}) => {
      const {fromX, fromY, x, y, color, lineWidth, tool} = data;
      console.log("Received this :", data);
      
      const nsX = fromX * canvas.width;   //normalised start X
      const nsY = fromY * canvas.height;  //normalised start y
      const neX = x * canvas.width;       //normalised end X
      const neY = y * canvas.height;      //normalised end y

      ctx.beginPath();
      ctx.moveTo(nsX, nsY);
      ctx.lineTo(neX, neY);
      ctx.strokeStyle = tool === "pen" ? color : "white";
      ctx.lineWidth = lineWidth;
      ctx.globalCompositeOperation = tool === "eraser" ? "destination-out" : "source-over";
      ctx.stroke();
    });

    return (() => socket.off("draw"));
  }, []);

  const startDrawing = (e) => {
    const ctx = canvasRef.current.getContext("2d");
    const { x, y } = getMousePos(e);

    ctx.beginPath();
    ctx.moveTo(x, y);

    if (tool === "pen") {
      ctx.globalCompositeOperation = "source-over"; 
      ctx.strokeStyle = props.color;
      ctx.lineWidth = 5;
    } else if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out"; 
      ctx.lineWidth = 20;
    }

    prevPosition.current = {x,y};

    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    if(!prevPosition.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { x, y } = getMousePos(e);

    const {x: fromX, y: fromY} = prevPosition.current || {};
    if(fromX === undefined || fromY === undefined) return;

    ctx.lineTo(x, y);
    ctx.stroke();

    socket.emit("draw", {
      roomId,
      data: {
      fromX: fromX / canvas.width || 0,
      fromY: fromY / canvas.height || 0,
      x: x / canvas.width,
      y: y / canvas.height,
      color: props.color,
      lineWidth: 5,
      tool
    }
    });

    prevPosition.current = {x, y};
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const newHistory = history.slice(0, historyStep + 1); 
    newHistory.push(canvas.toDataURL());
    setHistory(newHistory);
    setHistoryStep(newHistory.length - 1);

    setIsDrawing(false);
  };

  const undo = () => {
    if (historyStep <= 0) return;
    const ctx = canvasRef.current.getContext("2d");
    const canvas = canvasRef.current;
    const prevStep = historyStep - 1;

    const img = new Image();
    img.src = history[prevStep];
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      setHistoryStep(prevStep);
    };
  };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          border: "2px solid #000",
          borderRadius: "8px",
          cursor: tool === "pen" ? "crosshair" : "pointer",
          background: "#fff",
        }}
      />
      <div style={{ 
        position: "absolute", 
        top: "10px", 
        left: "10px",
        display: "flex",
        gap: "8px",
        zIndex: 10
      }}>
        <button 
          onClick={() => setTool("pen")}
          style={{
            padding: "8px 16px",
            backgroundColor: tool === "pen" ? "#3b82f6" : "#e5e7eb",
            color: tool === "pen" ? "#fff" : "#000",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600"
          }}
        >
          Pen
        </button>
        <button 
          onClick={() => setTool("eraser")}
          style={{
            padding: "8px 16px",
            backgroundColor: tool === "eraser" ? "#3b82f6" : "#e5e7eb",
            color: tool === "eraser" ? "#fff" : "#000",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600"
          }}
        >
          Eraser
        </button>
        <button 
          onClick={undo} 
          disabled={historyStep <= 0}
          style={{
            padding: "8px 16px",
            backgroundColor: historyStep <= 0 ? "#d1d5db" : "#e5e7eb",
            color: historyStep <= 0 ? "#9ca3af" : "#000",
            border: "none",
            borderRadius: "6px",
            cursor: historyStep <= 0 ? "not-allowed" : "pointer",
            fontWeight: "600"
          }}
        >
          Undo
        </button>
      </div>
    </div>
  );
};

export default DrawingCanvas;