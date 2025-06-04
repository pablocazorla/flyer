import { _data } from "../../store";
import QRCode from "qrcode";

const renderCanvas = (canvas, Img, config) => {
  if (!Img) {
    return;
  }
  const width = config?.width || Img.width;
  const ratio = width / Img.width;
  const height = Img.height * ratio;

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  //

  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(Img, 0, 0, width, height);

  if (!config) {
    return null;
  }

  //

  ctx.save();
  ctx.fillStyle = "#FFF";
  ctx.shadowColor = "#000";

  const { fecha, direccion, qr } = config;

  const data = _data.get();
  // Fecha
  if (fecha) {
    ctx.shadowBlur = fecha.shadowBlur;
    ctx.font = `bold ${fecha.fonSize}px sans-serif`;
    ctx.textAlign = fecha.textAlign;
    const textFecha = fecha.splitted ? data.fecha.split("·") : [data.fecha];

    ctx.fillText(textFecha[0] || "falta la fecha", fecha.x, fecha.y);
    if (textFecha[1]) {
      ctx.fillText(
        textFecha[1] || "falta la fecha",
        fecha.x,
        fecha.y + fecha.fonSize * 1.4
      );
    }
  }

  // direccion
  if (direccion) {
    ctx.shadowBlur = direccion.shadowBlur;
    ctx.font = `bold ${direccion.fonSize}px sans-serif`;
    ctx.textAlign = direccion.textAlign;

    const textDireccion = direccion.splitted
      ? data.direccion.split("-")
      : [data.direccion];

    ctx.fillText(
      textDireccion[0] || "falta la direccion",
      direccion.x,
      direccion.y
    );
    if (textDireccion[1]) {
      ctx.fillText(
        textDireccion[1] || "falta la direccion",
        direccion.x,
        direccion.y + direccion.fonSize * 1.4
      );
    }
  }

  if (qr) {
    QRCode.toCanvas(
      data.urlEntradaWeb || "https://www.entradaweb.com.ar",
      { errorCorrectionLevel: "H" },
      function (err, canvasQr) {
        if (err) throw err;

        // self.qrImg = {
        //   src: canvasQr.toDataURL("image/png"),
        //   width: canvasQr.width,
        //   height: canvasQr.height,
        // };

        const imgQR = new Image();
        imgQR.src = canvasQr.toDataURL("image/png");

        imgQR.onload = () => {
          ctx.drawImage(imgQR, qr.x, qr.y, qr.width, qr.width);
        };
      }
    );
  }

  ctx.restore();
};

export default renderCanvas;
