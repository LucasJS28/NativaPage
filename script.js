document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    // const header = document.querySelector('header'); // Esta línea no se usa, se puede eliminar si no hay otro propósito.

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function(event) {
            event.stopPropagation(); // Previene que el clic se propague al documento
            nav.classList.toggle('active');
            updateMenuIcon();
        });

        // Cerrar menú al hacer clic en un enlace (para SPAs o navegación en la misma página)
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    updateMenuIcon();
                }
            });
        });

        // Cerrar menú al hacer clic fuera de él
        document.addEventListener('click', function(event) {
            // Si el menú está activo y el clic NO fue dentro del nav NI en el botón de toggle
            if (nav.classList.contains('active') && !nav.contains(event.target) && !menuToggle.contains(event.target)) {
                nav.classList.remove('active');
                updateMenuIcon();
            }
        });
    }

    function updateMenuIcon() {
        const icon = menuToggle.querySelector('i');
        if (nav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }

    // Actualizar año en el footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Manejo básico del formulario de contacto (solo para demostración)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevenir el envío real del formulario
            alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
            contactForm.reset(); // Limpiar el formulario
        });
    }
});




// CODIGO POPUP

var contactButton = document.getElementById("contactButton");
var bubble = document.getElementById("contactBubble");
var contactPopup = document.getElementById('myForm');
var bubbleShownInitially = false; // Nueva variable para rastrear si la burbuja se mostró inicialmente

function openForm() {
    document.getElementById("myForm").style.display = "block";
    bubble.style.display = "none";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
    bubble.style.display = "none"; // Ocultamos la burbuja al cerrar el formulario
}

document.addEventListener("DOMContentLoaded", function () {
    // Mostramos la burbuja solo si no se ha mostrado antes
    if (!bubbleShownInitially && bubble) {
        bubble.style.display = "block";
        setTimeout(function () {
            bubble.style.opacity = "0";
            setTimeout(function () {
                bubble.style.display = "none";
                bubble.style.opacity = "1";
            }, 300);
        }, 3000);
        bubbleShownInitially = true; // Marcamos que la burbuja ya se mostró
    } else if (bubble) {
        bubble.style.display = "none"; // Si ya se mostró, la ocultamos directamente
    }
});

window.onscroll = function () {
    // Ya no mostramos la burbuja al hacer scroll
    if (window.scrollY >= 400) {
        contactButton.style.opacity = "0";
    } else {
        contactButton.style.display = "block";
        setTimeout(function () {
            contactButton.style.opacity = "1";
        }, 10);
    }
};

contactPopup.addEventListener('click', function (event) {
    event.stopPropagation();
});

document.addEventListener('click', function (event) {
    if (event.target !== contactPopup && event.target !== contactButton) {
        contactPopup.style.display = 'none';
        bubble.style.display = 'none'; // También ocultamos la burbuja al hacer clic fuera
    }
});

//CODIGO PARA QUE AL REDIRECCIONAR CENTRE DIRECTAMENTE
function scrollToSection(event) {
    event.preventDefault(); // Evita el comportamiento de scroll predeterminado del enlace
    const targetId = this.getAttribute('href').substring(1); // Obtiene el ID de la sección destino
    const targetSection = document.getElementById(targetId); // Selecciona la sección
    if (!targetSection) return; // Si no existe la sección, sale de la función

    const headerHeight = document.querySelector('header').offsetHeight; // Altura del header
    const sectionHeight = targetSection.offsetHeight; // Altura de la sección
    const windowHeight = window.innerHeight; // Altura de la ventana

    let scrollPosition = targetSection.offsetTop - (windowHeight / 2) + (sectionHeight / 2) - headerHeight;

    // Asegurarse de no hacer scroll por encima del inicio de la página
    scrollPosition = Math.max(0, scrollPosition);

    window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth' // Para un scroll suave
    });
}

// Asigna la función a los enlaces del menú
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', scrollToSection);
});


const sections = document.querySelectorAll('section'); // Selecciona todas las secciones
const productosItems = document.querySelectorAll('#productos .producto-item');
const serviciosItems = document.querySelectorAll('#servicios .servicio-item');
const descargasItems = document.querySelectorAll('#descargas .descarga-item');

function revealOnScroll(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Opcional: deja de observar una vez que se anima
        }
    });
}

// CODIGO PARA LAS ANIMACIONES DE LA PAGINA
const observer = new IntersectionObserver(revealOnScroll, {
    root: null, // Usa el viewport como root
    rootMargin: '0px',
    threshold: 0.1 // Porcentaje de visibilidad para activar la animación
});

sections.forEach(section => {
    observer.observe(section);
});

productosItems.forEach(item => {
    observer.observe(item);
});

serviciosItems.forEach(item => {
    observer.observe(item);
});

descargasItems.forEach(item => {
    observer.observe(item);
});


// Accordion functionality for Sostenibilidad section
const accordionHeaders = document.querySelectorAll('.accordion-header');

if (accordionHeaders.length > 0) {
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.closest('.accordion-item');
            const content = accordionItem.querySelector('.accordion-content');

            // Toggle active class on the header
            this.classList.toggle('active');

            // Toggle the display/height of the content
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                content.style.paddingTop = '0';
                content.style.paddingBottom = '0';
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.paddingTop = '15px'; /* Add back padding when open */
                content.style.paddingBottom = '15px';
            }
        });
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const downloadButtons = document.querySelectorAll('.btn-animated-download-v3');

    downloadButtons.forEach(button => {
        // Almacena el href original para que el script pueda activarlo más tarde
        const originalHref = button.getAttribute('href');

        button.addEventListener('click', (event) => {
            event.preventDefault(); // Evita el comportamiento de descarga por defecto del <a> inicialmente

            // Si el botón ya está en un estado animado, no hacer nada
            if (button.classList.contains('downloading') || button.classList.contains('downloaded') || button.classList.contains('reverting')) {
                return;
            }

            // 1. Iniciar la animación de "descargando"
            button.classList.add('downloading');

            // Simular el tiempo de descarga (ej. 1.5 segundos)
            setTimeout(() => {
                button.classList.remove('downloading');
                button.classList.add('downloaded');

                // 2. Activar la descarga real del archivo
                const tempLink = document.createElement('a');
                tempLink.href = originalHref;
                // Establece el nombre del archivo para la descarga
                tempLink.download = originalHref.substring(originalHref.lastIndexOf('/') + 1); 
                document.body.appendChild(tempLink);
                tempLink.click(); // Simula un clic en el enlace de descarga
                document.body.removeChild(tempLink); // Limpia el enlace temporal

                // 3. Revertir el botón al estado original después de un breve tiempo (ej. 2 segundos)
                setTimeout(() => {
                    button.classList.remove('downloaded');
                    button.classList.add('reverting'); // Añade la clase para la transición de reversión

                    // Después de que la transición de reversión termine (ej. 0.5 segundos),
                    // elimina la clase 'reverting' para volver al estado base y limpiar.
                    setTimeout(() => {
                        button.classList.remove('reverting');
                        // Asegurarse de que la flecha sea completamente visible si fue ocultada con display:none
                        const arrow = button.querySelector('.arrow');
                        if (arrow) {
                            arrow.style.display = 'block'; // Restablece display si fue none
                            // Las transiciones CSS se encargarán del resto (opacidad, transform)
                        }
                    }, 500); // Duración de la transición de reversión
                }, 2000); // Duración del estado "descargado"
            }, 1500); // Duración simulada del proceso de descarga
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const progressBar = document.querySelector('.scroll-progress-indicator');

    // Verificamos que el elemento de la barra de progreso exista en la página
    if (progressBar) {
        // Añadimos un "escuchador de eventos" para el evento 'scroll' en la ventana
        window.addEventListener('scroll', () => {
            // 1. Calculamos la altura total desplazable del documento.
            //    document.documentElement.scrollHeight es la altura total del contenido.
            //    window.innerHeight es la altura visible de la ventana (viewport).
            //    Restamos window.innerHeight porque no puedes desplazar más allá de la parte inferior visible.
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            
            // 2. Obtenemos la posición actual de desplazamiento (cuánto se ha desplazado el usuario desde arriba).
            const scrollPosition = window.scrollY;

            // 3. Calculamos el porcentaje de desplazamiento.
            //    Aseguramos que totalHeight no sea cero para evitar errores de división.
            const scrollProgress = totalHeight > 0 ? (scrollPosition / totalHeight) * 100 : 0;

            // 4. Actualizamos el ancho de la barra de progreso en el CSS.
            progressBar.style.width = scrollProgress + '%';
        });
    }
});


// INICIO: Lógica para la nueva sección de Productos

// Lógica para que el clic en la tarjeta (excepto en el botón) active el botón
document.querySelectorAll('.product-card').forEach(card => {
    // Obtén el botón dentro de esta tarjeta específica
    const button = card.querySelector('.details-button');

    // Añade un listener de clic a toda la tarjeta
    card.addEventListener('click', function (event) {
        // Si el elemento clicado NO es el botón, entonces simula el clic en el botón
        if (event.target !== button) {
            button.click(); // Dispara el evento de clic en el botón
        }
        // Si el evento.target ES el botón, no hacemos nada aquí, ya que el propio listener del botón se encargará.
    });
});

// Lógica para el botón "Ver Detalles"
document.querySelectorAll('.details-button').forEach(button => {
    button.addEventListener('click', function () {
        const clickedDetails = this.nextElementSibling; // El div 'details' del producto clicado

        // --- Cerrar todos los demás desplegables ---
        document.querySelectorAll('.details').forEach(detailsSection => {
            // Si el desplegable no es el que acabamos de clicar Y está abierto
            if (detailsSection !== clickedDetails && detailsSection.classList.contains('open')) {
                detailsSection.classList.remove('open'); // Cerrarlo
                // Buscar el botón asociado a este desplegable y resetear su texto
                const associatedButton = detailsSection.previousElementSibling;
                if (associatedButton && associatedButton.classList.contains('details-button')) {
                    associatedButton.textContent = 'Ver Detalles';
                }
            }
        });
        // --- Fin de la parte de cerrar otros desplegables ---

        // Ahora, alternar el desplegable del producto clicado
        clickedDetails.classList.toggle('open');

        // Actualizar el texto del botón clicado
        if (clickedDetails.classList.contains('open')) {
            this.textContent = 'Ocultar Detalles';
        } else {
                this.textContent = 'Ver Detalles';
        }
    });
});

// FIN: Lógica para la nueva sección de Productos