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