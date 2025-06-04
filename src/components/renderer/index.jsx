import { useEffect, useRef } from "react";
import renderCanvas from "./renderCanvas";
import { _updateFlag } from "../../store";

const Renderer = ({ name, src, config }) => {
  const canvasRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!src) {
      return;
    }

    let loaded = false;

    imgRef.current = new Image();
    imgRef.current.src = `/${src}`;
    imgRef.current.onload = () => {
      //const flyer = new Flyer("canvas-flyer", img);

      loaded = true;
      renderCanvas(canvasRef.current, imgRef.current, null);
    };
  }, [src]);

  useEffect(() => {
    _updateFlag.subscribe((flag) => {
      if (flag === 0) {
        return;
      }

      renderCanvas(canvasRef.current, imgRef.current, config);
    });
  }, [config]);

  return (
    <div className="mb-3">
      <h3 className="font-bold uppercase border-t border-gray-400 py-1">
        {name}
      </h3>
      <div className="bg-gray-500 shadow-[0_2px_6px_0_rgba(0,0,0,0.4)]">
        <canvas
          ref={canvasRef}
          className="bg-white max-w-full block mx-auto"
        ></canvas>
      </div>

      <div className="bg-sky-950 p-2 border-t border-gray-500 rounded-b-lg text-center">
        <button
          className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-7 rounded-lg cursor-pointer"
          onClick={() => {
            const data = canvasRef.current.toDataURL("image/jpg");
            const link = document.createElement("a");
            link.download = `${name}.jpg`;
            link.href = data;
            link.click();
          }}
        >
          Descargar
        </button>
      </div>
    </div>
  );
};
export default Renderer;
