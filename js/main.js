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
    
    // Esta línea comprueba si la URL es la página raíz ("/") o "index.html"
    if (window.location.pathname.endsWith('/web_metodos_numericos/') || window.location.pathname.endsWith('/index.html')) {
        
        // SÍ, ESTAMOS EN LA PORTADA: Activa el botón de sonido
        
        // Creamos el audio
        const pageSound = new Audio('audio/intro-sound.mp3');
        pageSound.loop = true;
        let isPlaying = false;

        // Le damos la funcionalidad al botón
        soundToggle.addEventListener('click', () => {
            if (isPlaying) {
                pageSound.pause();
                soundToggle.textContent = '🔊';
            } else {
                pageSound.play();
                soundToggle.textContent = '🔇';
            }
            isPlaying = !isPlaying;
        });

    } else {
        
        // NO, ESTAMOS EN OTRA PÁGINA: Oculta el botón de sonido
        if (soundToggle) {
            soundToggle.style.display = 'none';
        }
    }

});
