// Textos para la animación inicial
const titles = {
    es: "Iván Medrano",
    en: "Iván Medrano"
};

// Cambiar tema
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Cambiar ícono
    const themeIcon = document.querySelector('#theme-toggle i');
    themeIcon.classList.toggle('fa-moon');
    themeIcon.classList.toggle('fa-sun');
}

// Cambiar idioma
async function changeLanguage(lang) {
    try {
        const response = await fetch(`lang/${lang}.json`);
        const texts = await response.json();
        
        document.querySelectorAll("[data-i18n]").forEach(element => {
            const key = element.getAttribute("data-i18n");
            if (texts[key]) {
                if (element.tagName === 'UL') {
                    const items = texts[key].split('|');
                    element.innerHTML = items.map(item => `<li>${item}</li>`).join('');
                } else {
                    element.textContent = texts[key];
                }
            }
        });
        
        localStorage.setItem('language', lang);
    } catch (error) {
        console.error("Error loading language:", error);
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Tema - Fuerza oscuro como predeterminado para nuevos usuarios
    const savedTheme = localStorage.getItem('theme');
    const defaultTheme = savedTheme || 'dark'; // Ignora preferencias del sistema
    document.documentElement.setAttribute('data-bs-theme', defaultTheme);
    
    // Configurar ícono según tema
    const themeIcon = document.querySelector('#theme-toggle i');
    if (defaultTheme === 'light') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.add('fa-moon');
        themeIcon.classList.remove('fa-sun');
    }
    
    // Resto del código permanece igual...
    // Idioma
    const savedLang = localStorage.getItem('language') || 'es';
    changeLanguage(savedLang);
    
    // Event listeners
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

    // Animación de carga
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        const headerLogo = document.getElementById('header-logo');
        
        loadingScreen.style.opacity = '0';
        
        setTimeout(() => {
            loadingScreen.remove();
            headerLogo.classList.remove('d-none');
            headerLogo.classList.add('d-block');
        }, 500);
    }, 2000);

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Manejo de logos
    const logoCards = document.querySelectorAll('.logo-card');
    let lastTapped = null;
    let tapTimer = null;
    
    // Para desktop
    logoCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                card.classList.add('hovered');
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                card.classList.remove('hovered');
            }
        });
    });
    
    // Para móviles
    if (window.innerWidth <= 768) {
        logoCards.forEach(card => {
            card.addEventListener('touchstart', (e) => {
                e.preventDefault();
                
                // Doble tap para cerrar
                if (lastTapped === card && !tapTimer) {
                    card.classList.remove('active');
                    lastTapped = null;
                    return;
                }
                
                // Cerrar los demás
                logoCards.forEach(otherCard => {
                    if (otherCard !== card) otherCard.classList.remove('active');
                });
                
                // Abrir el actual
                card.classList.add('active');
                lastTapped = card;
                
                // Resetear timer
                clearTimeout(tapTimer);
                tapTimer = setTimeout(() => {
                    tapTimer = null;
                }, 300);
            });
        });
        
        // Cerrar al tocar fuera
        document.addEventListener('touchstart', (e) => {
            if (!e.target.closest('.logo-card')) {
                logoCards.forEach(card => {
                    card.classList.remove('active');
                });
            }
        });
    }

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});