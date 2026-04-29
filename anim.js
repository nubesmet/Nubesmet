// Sincronizar las letras con la canción
var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");

// Array de objetos que contiene cada línea y su tiempo de aparición en segundos
var lyricsData = [
  { text: "Buscando en las estrellas encontre", time: 21 },
  { text: "Unos ojos tan brillantes como nada q conozcas", time: 24 },
  { text: "Lonely before the sun cried", time: 27 },
  { text: "Mas alla que el sol", time: 33 },
  { text: "Porque eres tan bella", time: 36 },
  { text: "Mas que el cielo y las estrellas", time: 39 },
  { text: "Tu eres lo que faltaba y siempre quise que estuviera", time: 42 },
  { text: "Eres la unica que me pone a bailar", time: 48 },
  { text: "Que me pone a sudar", time: 51 },
  { text: "La unica que me pone la cabeza a andar", time: 54 },
  { text: "El corazon a Palpitar: 58 },
  { text: "De una manera agradable", time: 61 },
  { text: "Por tu sonrisa insospechable", time: 64 },
  { text: "Quisiera arrancarte la piel", time: 68 },
  { text: "Como un trozo de papel", time: 71 },
  { text: "Quisiera besarte otra vez", time: 73 },
  { text: "Desde la cabeza hasta los pies", time: 77 },
  { text: "Quiero amanecer contigo", time:79 },
  { text: "Ser tu almohada y ser tu abrigo", time: 83 },
  { text: "Siempre que tu quieras", time: 86 },
  { text: "A la hora q tu quieras", time: 89 },
  { text: "Voy a estar contigo ahi", time: 92 },
  { text: "Escondidos hasta el fin", time: 95 },
  { text: "Juntos", time: 98 },
  { text: "Donde nadie pueda ir", time: 101 },
];

// Animar las letras
function updateLyrics() {
  var time = Math.floor(audio.currentTime);
  var currentLine = lyricsData.find(
    (line) => time >= line.time && time < line.time + 6
  );

  if (currentLine) {
    // Calcula la opacidad basada en el tiempo en la línea actual
    var fadeInDuration = 0.1; // Duración del efecto de aparición en segundos
    var opacity = Math.min(1, (time - currentLine.time) / fadeInDuration);

    // Aplica el efecto de aparición
    lyrics.style.opacity = opacity;
    lyrics.innerHTML = currentLine.text;
  } else {
    // Restablece la opacidad y el contenido si no hay una línea actual
    lyrics.style.opacity = 0;
    lyrics.innerHTML = "";
  }
}

setInterval(updateLyrics, 1000);

//funcion titulo
// Función para ocultar el título después de 216 segundos
function ocultarTitulo() {
  var titulo = document.querySelector(".titulo");
  titulo.style.animation =
    "fadeOut 3s ease-in-out forwards"; /* Duración y función de temporización de la desaparición */
  setTimeout(function () {
    titulo.style.display = "none";
  }, 3000); // Espera 3 segundos antes de ocultar completamente
}

// Llama a la función después de 216 segundos (216,000 milisegundos)
setTimeout(ocultarTitulo, 216000);