document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const header = document.querySelector('header'); // Para referencia del clic

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