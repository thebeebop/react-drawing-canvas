import { useEffect, useRef, useState } from "react";
import Menu from "./components/Menu";
import "./App.css";
// CANVAS - The <canvas> element creates a fixed-size drawing surface that exposes one or more rendering contexts, which are used to create and manipulate the content shown.

//useRef() hook allows you to persist values between renders.
//useRef() only returns one item. It returns an Object with a parameter of 'current'.
//useRef() can be used to directly reference an element in HTML.

function App() {
  const canvasRef = useRef(null); // canvasRef is equal to the <canvas> element.

  const ctxRef = useRef(null); // for storing the canvas context so that we can use it when drawing/referencing the canvas.
  console.log(ctxRef, "<<<ctxRef");
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(5);
  const [lineColor, setLineColor] = useState("black");
  const [lineOpacity, setLineOpacity] = useState(0.1);

  // Initialization when the component
  // mounts for the first time
  useEffect(() => {
    const canvas = canvasRef.current; // equivalent to document.getElementById('canvas') - retrieves the <canvas> node in the DOM

    const ctx = canvas.getContext("2d");
    // The <canvas> element/node has a method called getContext(), used to obtain the rendering context and its drawing functions. Takes one parameter, the type of context.
    // ctx = CanvasRenderingContext2D

    console.log(ctx, "<<< ctx");
    ctx.lineCap = "round";
    ctx.lineJoin = "normal";
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctxRef.current = ctx;
  }, [lineColor, lineOpacity, lineWidth]);

  // Function for starting the drawing
  const startDrawing = ({ nativeEvent }) => {
    // nativeEvent is pulled from the available browser events.
    const { offsetX, offsetY } = nativeEvent; // offsetX and offsetY pulled from the mouse event to track X & Y position.

    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  // Function for ending the drawing
  const endDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    // The X and Y co-ordinates in real time ---------------------------
    const { offsetX, offsetY } = nativeEvent;

    console.log(offsetX, "<<< X");
    console.log(offsetY, "<<< Y");
    ctxRef.current.lineTo(offsetX, offsetY);

    ctxRef.current.stroke();
  };

  // This will clear the canvas of any drawing. The functionality still needs to be referenced in the MENU component to be used.
  const clear = () => {
    ctxRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
  };

  return (
    <div className="App">
      <h1>Dooduels</h1>
      <div className="draw-area">
        <Menu
          setLineColor={setLineColor}
          setLineWidth={setLineWidth}
          clear={clear}
        />

        <canvas // Canvas is an HTML element that is used to draw graphics via javascript.
          onMouseDown={startDrawing} // onMouseDown = Holding the mouse's left key down
          onMouseUp={endDrawing} // onMouseUp = Letting go of the mouse's left key.
          onMouseMove={draw} // onMouseMove = drawing follows the movement of the mouse.
          ref={canvasRef} // This sets the hook 'useRef' equal to canvas element.
          width={`1280px`}
          height={`720px`}
        />
      </div>
    </div>
  );
}

export default App;
