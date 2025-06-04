import { useState } from "react";
import { _data, _updateFlag } from "../../store";

const LOCALSTORAGE_NAME = "flyerData";
const DEFAULT_DATA = {
  fecha: "Vie 30 Mayo · 21:30hs",
  direccion: "Paso de los Andes 1634 - Godoy Cruz",
  urlEntradaWeb: "",
};

const Inputs = () => {
  const [fecha, setFecha] = useState("");
  const [direccion, setDireccion] = useState("");
  const [urlEntradaWeb, setUrlEntradaWeb] = useState("");

  useState(() => {
    const dataStoredRaw = localStorage.getItem(LOCALSTORAGE_NAME);
    const dataStored = dataStoredRaw ? JSON.parse(dataStoredRaw) : DEFAULT_DATA;

    setFecha(dataStored.fecha);
    setDireccion(dataStored.direccion);
    setUrlEntradaWeb(dataStored.urlEntradaWeb);
    //
    _data.set(dataStored);
  }, []);

  return (
    <div className="bg-sky-500/10 p-4 border border-sky-500 rounded-lg mb-3">
      <div className="mb-5">
        <label htmlFor="fecha" className="block">
          Fecha
        </label>
        <input
          type="text"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="border border-gray-500 rounded-md py-1 px-3 bg-white"
          placeholder="Ej: Vie 30 Mayo · 21:30hs"
        />
      </div>
      <div className="mb-5">
        <label htmlFor="direccion" className="block">
          Dirección
        </label>
        <input
          type="text"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          className="w-full border border-gray-500 rounded-md py-1 px-3 bg-white"
          placeholder="Ej: Paso de los Andes 1634 - Godoy Cruz"
        />
      </div>
      <div className="mb-5">
        <label htmlFor="url-entrada-web" className="block">
          URL Entrada Web
        </label>
        <input
          type="text"
          value={urlEntradaWeb}
          onChange={(e) => setUrlEntradaWeb(e.target.value)}
          className="w-full border border-gray-500 rounded-md py-1 px-3 bg-white"
          placeholder="Url de Entrada Web (para el QR)"
        />
      </div>

      <div className="">
        <button
          className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-7 rounded-lg cursor-pointer"
          onClick={() => {
            localStorage.setItem(
              LOCALSTORAGE_NAME,
              JSON.stringify({
                fecha,
                direccion,
                urlEntradaWeb,
              })
            );
            _data.set({
              fecha,
              direccion,
              urlEntradaWeb,
            });
            _updateFlag.set(_updateFlag.get() + 1);
          }}
        >
          Actualizar imágenes con estos datos
        </button>
      </div>
    </div>
  );
};
export default Inputs;
