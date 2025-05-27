import QRCode from "qrcode";

const qrDataPosition = {
  x: 2000,
  y: 3261,
  width: 464,
};

class Flyer {
  constructor(canvasSelector, bg) {
    this.canvas = document.getElementById(canvasSelector);
    this.ctx = this.canvas.getContext("2d");
    this.bg = bg;
    this.width = 1000;
    this.ratio = this.width / bg.width;
    this.height = bg.height * this.ratio;

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.qrImg = null;
    //

    //
    this.fechaInput = document.getElementById("fecha");
    this.direccionInput = document.getElementById("direccion");
    this.urlInput = document.getElementById("url-entrada-web");
    const btnGenerate = document.getElementById("generar-flyer");
    const btnDownload = document.getElementById("descargar-flyer");

    btnGenerate.addEventListener("click", () => {
      this.setStorage();
      this.generateFlyer();
    });
    btnDownload.addEventListener("click", () => {
      this.download();
    });
    //
    this.getStorage();
  }

  generateQRCode(url) {
    const self = this;
    QRCode.toCanvas(
      url || "https://www.entradaweb.com.ar",
      { errorCorrectionLevel: "H" },
      function (err, canvasQr) {
        if (err) throw err;

        self.qrImg = {
          src: canvasQr.toDataURL("image/png"),
          width: canvasQr.width,
          height: canvasQr.height,
        };
      }
    );
  }

  download() {
    const data = this.canvas.toDataURL("image/jpg");
    const link = document.createElement("a");
    link.download = "flyer.jpg";
    link.href = data;
    link.click();
  }

  getStorage() {
    const dataRaw = localStorage.getItem("flyerData");
    const data = dataRaw
      ? JSON.parse(dataRaw)
      : {
          fecha: "Vie 30 Mayo · 21:30hs",
          direccion: "Paso de los Andes 1634 - Godoy Cruz",
          urlEntradaWeb: "",
        };

    this.fechaInput.value = data.fecha;
    this.direccionInput.value = data.direccion;
    this.urlInput.value = data.urlEntradaWeb;
  }

  setStorage() {
    const data = {
      fecha: this.fechaInput.value,
      direccion: this.direccionInput.value,
      urlEntradaWeb: this.urlInput.value,
    };

    localStorage.setItem("flyerData", JSON.stringify(data));
  }

  generateFlyer() {
    this.fecha = this.fechaInput.value;
    this.direccion = this.direccionInput.value;
    this.generateQRCode(this.urlInput.value);

    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = "#FFF";
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.ctx.drawImage(this.bg, 0, 0, this.width, this.height);

    if (this.qrImg) {
      const imgQR = new Image();
      imgQR.src = this.qrImg.src;
      imgQR.onload = () => {
        this.ctx.drawImage(
          imgQR,
          qrDataPosition.x * this.ratio,
          qrDataPosition.y * this.ratio,
          qrDataPosition.width * this.ratio,
          qrDataPosition.width * this.ratio
        );
      };
    }

    const yPos = 14;

    this.ctx.shadowColor = "#000";
    this.ctx.shadowBlur = 12;

    this.ctx.font = `bold ${66}px sans-serif`;
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      this.fecha || "falta la fecha",
      this.width / 2 - 0.5 * qrDataPosition.width * this.ratio,
      this.height - 255 + yPos
    );

    this.ctx.font = `normal ${38}px sans-serif`;
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      this.direccion || "falta la dirección",
      this.width / 2 - 0.5 * qrDataPosition.width * this.ratio,
      this.height - 200 + yPos
    );
  }
}

export default Flyer;
