const filas = document.querySelector("tbody");
const texto = document.querySelector("#promedio");
var total = 0;
async function notas() {
  let consulta = await fetch("https://raw.githubusercontent.com/profesorfaco/opr/refs/heads/main/clase-08/notas.json");
  let data = await consulta.json();
  console.log(data);
  data.forEach((d) => {
    filas.innerHTML += `<tr><td>${d.nombre}</td><td>${barrita(d.nota)}</td><td>${carita(d.nota)}</td></tr>`;
    total = total + d.nota;
    function carita(n) {
      var emoji;
      if (n > 5.9) {
        emoji = "🐭";
      } else if (n == 5.9) {
        emoji = "🐻‍❄️";
      } else {
        emoji = "🪿";
      }
      return emoji;
    }
  });
  texto.innerHTML = (total / 12).toFixed(1);
}
notas().catch((error) => console.error(error));

function barrita(n) {
  let ancho = n * 10;
  let color;
  if (n < 4) {
    color = "#2962FF"; // rojo
  } else if (n < 6) {
    color = "#1E88E5"; // rosado
  } else {
    color = "#64B5F6"; // verde
  }
  return `<svg width="100" height="40" viewBox="0 0 100 40">
            <text x="50" y="12" text-anchor="middle" font-size="12" fill="white">${n.toFixed(1)}</text>
            <rect x="0" y="20" width="100" height="10" fill="#444" rx="5" />
            <rect x="0" y="20" width="${ancho}" height="10" fill="${color}" rx="5" />
            </svg>`;
}

