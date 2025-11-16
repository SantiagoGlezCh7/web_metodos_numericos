document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica del Modo Oscuro (sin cambios) ---
    const themeToggle = document.getElementById('theme-toggle');
    
    // Revisa si el usuario ya tiene una preferencia guardada
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Guarda la preferencia
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = '☀️';
        } else {
            localStorage.removeItem('theme');
            themeToggle.textContent = '🌙';
        }
    });


    // --- Lógica del botón SALIR (solo para menu.html) ---
    // --- Lógica del botón SALIR (solo para menu.html) ---
    const btnSalir = document.getElementById('btn-salir');
    if (btnSalir) {
        btnSalir.addEventListener('click', () => {
            
            // 1. Localiza el cabezal y el contenido principal
            const header = document.querySelector('.portada-header');
            const main = document.querySelector('main'); // Busca el <main>

            // 2. Prepara el nuevo contenido de despedida
            const despedidaContenido = `
                <div>
                    <h2>Gracias por usar esta página web.</h2>
                    <p>¡Vuelve pronto!</p>
                </div>
            `;

            // 3. Modifica la página SIN TOCAR EL FOOTER
            if (header) {
                header.remove(); // Elimina el cabezal
            }
            
            if (main) {
                main.innerHTML = despedidaContenido; // Pone el nuevo contenido
                main.classList.remove('container'); // Quita el estilo de "container"
                main.classList.add('despedida-container'); // Añade el nuevo estilo
            }
        });
    }

   


   // --- LÓGICA DE SONIDO (CONDICIONAL) ---
    
    const soundToggle = document.getElementById('sound-toggle');

function audioPath(filename) {
  // Detectar entorno local
  const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1' || location.protocol === 'file:';
  if (isLocal) {
    // servidor local: ruta relativa (servidor sirve desde la raíz del proyecto)
    return `/audio/${filename}`;
  } else {
    // GitHub Pages (ajusta '/web_metodos_numericos/' si tu repo usa otro nombre)
    return `/web_metodos_numericos/audio/${filename}`;
  }
}

if (soundToggle) {
  // Ajusta las comprobaciones de pathname a tus URLs reales
  const onIndex = window.location.pathname.endsWith('/web_metodos_numericos/') ||
                  window.location.pathname.endsWith('/index.html') ||
                  window.location.pathname === '/';
  if (onIndex) {
    const pageSound = new Audio(audioPath('intro-sound.mp3'));
    pageSound.loop = true;
    let isPlaying = false;

    soundToggle.addEventListener('click', async () => {
      try {
        if (isPlaying) {
          pageSound.pause();
          soundToggle.textContent = '🔊';
        } else {
          await pageSound.play();
          soundToggle.textContent = '🔇';
        }
        isPlaying = !isPlaying;
      } catch (e) {
        console.warn('No se pudo reproducir el audio:', e);
        // mostrar botón para debug (opcional)
        soundToggle.textContent = '🔊';
      }
    });

    // Opcional: mostrar ruta en consola para depuración
    console.log('Audio URL:', pageSound.src);
  } else {
    soundToggle.style.display = 'none';
  }
}


});
