const COSTES = {1:-4,2:-2,3:-1,4:0,5:1,6:2,7:4,8:6,9:8,10:11};
const POOL = 18;

function calcularCoste() {
  let stats = ["fuerza","velocidad","agilidad","resistencia","nado","escalada"];
  let total = 0;
  let diezCount = 0;

  stats.forEach(stat => {
    let valor = parseInt(document.getElementById(stat).value);
    let coste = COSTES[valor];
    // regla de compensación: +1 si ≤3
    if(valor <= 3) coste += 1;
    total += coste;
    if(valor === 10) diezCount++;
  });

  let puntosRestantes = POOL - total;
  document.getElementById("puntosRestantes").textContent = puntosRestantes;

  if(puntosRestantes < 0) {
    alert("¡Has superado el límite de 18 puntos!");
    return false;
  }
  if(diezCount > 1) {
    alert("¡Solo puedes tener un 10 en una estadística!");
    return false;
  }
  return true;
}

function generarFicha() {
  if(!calcularCoste()) return;

  const nombre = document.getElementById("nombre").value;
  const descripcion = document.getElementById("descripcion").value;
  const fuerza = document.getElementById("fuerza").value;
  const velocidad = document.getElementById("velocidad").value;
  const agilidad = document.getElementById("agilidad").value;
  const resistencia = document.getElementById("resistencia").value;
  const nado = document.getElementById("nado").value;
  const escalada = document.getElementById("escalada").value;

  const imagenInput = document.getElementById("imagen");
  let imgTag = "";
  if(imagenInput.files.length > 0) {
    const url = URL.createObjectURL(imagenInput.files[0]);
    imgTag = `<img src="${url}" alt="Foto del gato">`;
  }

  document.getElementById("preview").innerHTML = `
    ${imgTag}
    <h3>${nombre}</h3>
    <p>${descripcion}</p>
    <p>Fuerza: ${fuerza} | Velocidad: ${velocidad} | Agilidad: ${agilidad}</p>
    <p>Resistencia: ${resistencia} | Nado: ${nado} | Escalada: ${escalada}</p>
    <button onclick="descargarFicha()">Descargar ficha</button>
  `;
}

function descargarFicha() {
  const ficha = document.querySelector("#preview");

  html2canvas(ficha, {
    scale: 4,              // multiplica la resolución (2, 3 o 4)
    useCORS: true,         // permite imágenes externas
    allowTaint: true,      // permite imágenes locales
    logging: false
  }).then(canvas => {
    // Crear un link de descarga
    const link = document.createElement("a");
    link.download = "ficha.png";
    // Exportar en PNG con calidad máxima
    link.href = canvas.toDataURL("image/png", 1.0);
    link.click();
  });
}


