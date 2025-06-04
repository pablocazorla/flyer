import { atom } from "nanostores";

export const _data = atom({
  fecha: "",
  direccion: "",
  urlEntradaWeb: "",
});

// export const _fecha = atom("");
// export const _direccion = atom("");
// export const _urlEntradaWeb = atom("");
export const _updateFlag = atom(0);
