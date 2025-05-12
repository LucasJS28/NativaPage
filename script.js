// INICIO CODIGO NAV FORMULARIO
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
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
            contactForm.reset(); // Limpiar el formulario
        });
    }
});
// FIN CODIGO NAV FORMULARIO



// INICIO CODIGO POPUP CONTACTOS

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

/*
window.onscroll = function () {
    if (window.scrollY >= 400) {
        contactButton.style.opacity = "0"; // Esto es lo que hacía que desapareciera
    } else {
        contactButton.style.display = "block";
        setTimeout(function () {
            contactButton.style.opacity = "1";
        }, 10);
    }
};
*/

contactPopup.addEventListener('click', function (event) {
    event.stopPropagation();
});

document.addEventListener('click', function (event) {
    if (event.target !== contactPopup && event.target !== contactButton && !contactButton.contains(event.target) && !contactPopup.contains(event.target)) { // Añadida condición para clics dentro del botón o popup
        contactPopup.style.display = 'none';
        bubble.style.display = 'none'; // También ocultamos la burbuja al hacer clic fuera
    }
});
// FIN CODIGO POPUP CONTACTOS

// INICIO CODIGO PARA QUE AL REDIRECCIONAR CENTRE DIRECTAMENTE
function scrollToSection(event) {
    event.preventDefault(); // Evita el comportamiento de scroll predeterminado del enlace

    const targetId = this.getAttribute('href').substring(1); // Obtiene el ID de la sección destino
    const targetSection = document.getElementById(targetId); // Selecciona la sección

    if (!targetSection) {
        console.warn(`Sección con ID '${targetId}' no encontrada.`);
        return;
    }

    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 0;
    const sectionTitle = targetSection.querySelector('h1, h2');

    let targetOffsetTop; // La posición de la parte superior del elemento al que queremos hacer scroll

    if (sectionTitle) {
        targetOffsetTop = sectionTitle.getBoundingClientRect().top + window.pageYOffset;
        // console.log(`Título encontrado en #${targetId}. Posición top: ${targetOffsetTop}`);
    } else {

        targetOffsetTop = targetSection.offsetTop;
        console.warn(`No se encontró un título (h1 o h2) dentro de la sección #${targetId}. Se hará scroll a la parte superior de la sección.`);
    }

    let scrollPosition = targetOffsetTop - headerHeight - 50; // Ajusta el '50' según lo que se vea mejor visualmente

    // Asegura que no se scrollee a una posición negativa (por encima del inicio de la página)
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
// FIN CODIGO PARA QUE AL REDIRECCIONAR CENTRE DIRECTAMENTE




// INCIO CODIGO PARA LAS ANIMACIONES DE LA PAGINA
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
// FIN CODIGO PARA LAS ANIMACIONES DE LA PAGINA


// CODIGO PARA DESPLEGABLES EN SECCION CONTRIBUCION SOSTENIBLE
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
// FIN CODIGO PARA DESPLEGABLES EN SECCION CONTRIBUCION SOSTENIBLE


// INICIO CODIGO DESCARGAR
document.addEventListener('DOMContentLoaded', () => {
    const downloadButtons = document.querySelectorAll('.btn-animated-download-v3');
    downloadButtons.forEach(button => {
        const originalHref = button.getAttribute('href');
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Evita el comportamiento de descarga por defecto del <a> inicialmente
            if (button.classList.contains('downloading') || button.classList.contains('downloaded') || button.classList.contains('reverting')) {
                return;
            }
            button.classList.add('downloading');
            setTimeout(() => {
                button.classList.remove('downloading');
                button.classList.add('downloaded');
                const tempLink = document.createElement('a');
                tempLink.href = originalHref;
                tempLink.download = originalHref.substring(originalHref.lastIndexOf('/') + 1); 
                document.body.appendChild(tempLink);
                tempLink.click(); // Simula un clic en el enlace de descarga
                document.body.removeChild(tempLink); // Limpia el enlace temporal
                setTimeout(() => {
                    button.classList.remove('downloaded');
                    button.classList.add('reverting'); // Añade la clase para la transición de reversión
                    setTimeout(() => {
                        button.classList.remove('reverting');
                        const arrow = button.querySelector('.arrow');
                        if (arrow) {
                            arrow.style.display = 'block'; 
                        }
                    }, 500); 
                }, 2000);
            }, 1500); 
        });
    });
});
// FIN CODIGO DESCARGAR


// INICIO CODIGO BARRA DE PROGRESO PAGINA
document.addEventListener('DOMContentLoaded', function() {
    const progressBar = document.querySelector('.scroll-progress-indicator');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPosition = window.scrollY;
            const scrollProgress = totalHeight > 0 ? (scrollPosition / totalHeight) * 100 : 0;
            progressBar.style.width = scrollProgress + '%';
        });
    }
});
// FIN CODIGO BARRA DE PROGRESO PAGINA


// INICIO: Lógica para la nueva sección de Productos
document.querySelectorAll('.product-card').forEach(card => {
    const button = card.querySelector('.details-button');
    card.addEventListener('click', function (event) {
        if (event.target !== button) {
            button.click(); 
        }
    });
});
// Lógica para el botón "Ver Detalles"
document.querySelectorAll('.details-button').forEach(button => {
    button.addEventListener('click', function () {
        const clickedDetails = this.nextElementSibling; // El div 'details' del producto clicado
        document.querySelectorAll('.details').forEach(detailsSection => {
            if (detailsSection !== clickedDetails && detailsSection.classList.contains('open')) {
                detailsSection.classList.remove('open'); // Cerrarlo
                const associatedButton = detailsSection.previousElementSibling;
                if (associatedButton && associatedButton.classList.contains('details-button')) {
                    associatedButton.textContent = 'Ver Detalles';
                }
            }
        });
        clickedDetails.classList.toggle('open');
        if (clickedDetails.classList.contains('open')) {
            this.textContent = 'Ocultar Detalles';
        } else {
                this.textContent = 'Ver Detalles';
        }
    });
});
// FIN: Lógica para la nueva sección de Productos

// Function to handle form submission for both the main form and the popup form
async function handleFormSubmit(form, statusId) {
    const statusElement = document.getElementById(statusId);
    const data = new FormData(form);
    const action = form.action;

    // Clear previous status message when submitting (only for error/network messages)
    if (statusElement) {
        statusElement.innerHTML = '';
        statusElement.style.color = '';
    }

    try {
        const response = await fetch(action, {
            method: "POST",
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            const successMessage = "✅ ¡Mensaje enviado con éxito!";
            alert(successMessage); // Display alert for success
            form.reset(); // Clears the form fields

            // We no longer update the statusElement for success messages, as an alert is used.
            // Return success status for potential future use (e.g., closing popup automatically)
            return { success: true, message: successMessage };
        } else {
            const errorMessage = "❌ Hubo un error al enviar el mensaje.";
            if (statusElement) { // Still display errors in the status div
                alert(errorMessage); // Display alert for success
            }
            return { success: false, message: errorMessage }; // Return error status
        }
    } catch (error) {
        const networkError = "⚠️ Error de red. Inténtalo más tarde.";
        if (statusElement) { // Still display network errors in the status div
            alert(networkError); // Display alert for success
        }
        return { success: false, message: networkError }; // Return error status
    }
}

// Get the main contact form section
const mainForm = document.getElementById("contactForm");
if (mainForm) {
    mainForm.addEventListener("submit", async function (e) {
        e.preventDefault(); // Prevent default form submission

        // Handle the submission of the main form.
        // Success will trigger an alert and clear the form. Errors will display below the form.
        await handleFormSubmit(mainForm, "status-main");

        // IMPORTANT NOTE: The previous behavior of automatically opening the popup
        // and displaying the success message inside it when the main form was submitted
        // has been removed, as the alert now serves as the primary success notification.
        // The user can still open the popup manually using the floating button.
    });
}

// Get the form inside the contact popup
const popupForm = document.querySelector(".contact-popup .form-container");
if (popupForm) {
    popupForm.addEventListener("submit", async function (e) {
        e.preventDefault(); // Prevent default form submission

        // Handle the submission of the popup form.
        // Success will trigger an alert and clear the form. Errors will display within the popup.
        await handleFormSubmit(popupForm, "status-popup");
        // The popup remains open after submission, allowing the user to see the alert
        // and then the cleared form or any error message.
    });
}
