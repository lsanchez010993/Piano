// ***********
// EJERCICIO HECHO POR LUIS SANCHEZ Y MARCOS LOPEZ
//************

  $(document).ready(function() {

    TouchEmulator();

    // Variable donde se guardan y se relacionan los diferentes sonidos con las teclas
    const keyToSound = {
      a: "./notas/a1.mp3",  // Tecla A
      s: "./notas/b1.mp3",  // Tecla S
      d: "./notas/c1.mp3",  // Tecla D
      f: "./notas/d1.mp3",  // Tecla F
      g: "./notas/e1.mp3",  // Tecla G
      h: "./notas/f1.mp3",  // Tecla H
      j: "./notas/g1.mp3",  // Tecla J
      r: "./notas/a2.mp3",  // Tecla R
      t: "./notas/b2.mp3",  // Tecla T
      y: "./notas/c2.mp3",  // Tecla Y
      u: "./notas/d2.mp3",  // Tecla U
      i: "./notas/e2.mp3",  // Tecla I
      o: "./notas/f2.mp3",  // Tecla O
      p: "./notas/g2.mp3",  // Tecla P

      1: "./notas/a1s.mp3", // Tecla 1 (sostenido de A)
      2: "./notas/c1s.mp3", // Tecla 2 (sostenido de C)
      3: "./notas/d1s.mp3", // Tecla 3 (sostenido de D)
      4: "./notas/f1s.mp3", // Tecla 4 (sostenido de F)
      5: "./notas/g1s.mp3", // Tecla 5 (sostenido de G)
      6: "./notas/a2s.mp3", // Tecla 6 (sostenido de A2)
      7: "./notas/c2s.mp3", // Tecla 7 (sostenido de C2)
      8: "./notas/d2s.mp3", // Tecla 8 (sostenido de D2)
      9: "./notas/f2s.mp3", // Tecla 9 (sostenido de F2)
      0: "./notas/g2s.mp3", // Tecla 0 (sostenido de G2)

      // Equivalencias
      // K = R, L = T, Ñ = Y
      k: "./notas/a2.mp3",
      l: "./notas/b2.mp3",
      "ñ": "./notas/c2.mp3",

      // Q = G, W = H, E = J
      q: "./notas/e1.mp3",
      w: "./notas/f1.mp3",
      e: "./notas/g1.mp3"
    };

    // Función para reproducir el sonido de una tecla
    function playSound(char) {
      const soundFile = keyToSound[char.toLowerCase()];
      if (soundFile) {
        const audio = new Audio(soundFile);
        audio.play();
      }
    }

    // Conjunto de teclas activas para evitar repeticiones
    const activeKeys = new Set();

    // --- EVENTO DE TECLADO
    $(document).on("keydown", function(event) {
      const key = event.key.toLowerCase();

      // Si la tecla ya está activa, no reproducir de nuevo
      if (activeKeys.has(key)) return;

 
      activeKeys.add(key);
      // reproducir el sonido
      playSound(key);

      // Añadir clase activa si existe un elemento con id k<keyCode>
      const $keyElement = $(`#k${event.keyCode}`);
      if ($keyElement.length > 0) {
        $keyElement.addClass("activa");
      }
    });

    $(document).on("keyup", function(event) {
      const key = event.key.toLowerCase();
    
      activeKeys.delete(key);

      // Quietar el class activo 
      const $keyElement = $(`#k${event.keyCode}`);
      if ($keyElement.length > 0) {
        $keyElement.removeClass("activa");
      }
    });

    // --- INTERACCIÓN CON RATÓN/TOUCH ---
    function handleInteraction($keyElement) {
      const keyId = $keyElement.attr("id");   // id, por ejemplo "k65"
      const key = keyId.replace("k", "");     // lo convierte a "65"
      const char = String.fromCharCode(key);  // "A" si es 65

      playSound(char);
      $keyElement.addClass("activa");

      // Borrar la clase activa después de un tiempo
      setTimeout(() => {
        $keyElement.removeClass("activa");
      }, 200);
    }

    // --- EVENTOS DE RATÓN Y TÁCTILES ---
   
    $("rect").on("mousedown", function(event) {
      event.preventDefault(); // Evitar selecciones / arrastres
      if (event.shiftKey) {
        handleInteraction($(this));
        handleInteraction($(this));
      } else {
        handleInteraction($(this));
      }
    });

    $("rect").on("touchstart", function(event) {
      event.preventDefault(); // Evitar scrolling en móviles
      handleInteraction($(this));
    });

  });

