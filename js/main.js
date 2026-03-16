let particlesCreated = false;
let charIndex = 0;
let isTyping = false;
let currentTimeout;

const panes = document.querySelectorAll('.pane');
const wrapper = document.querySelector('.wrapper');

panes.forEach(pane => {
    pane.addEventListener('scroll', () => {
        const arrow = pane.querySelector('.scroll-arrow');
        const portadaImg = pane.querySelector('.portada-img');
        const heroSection = pane.querySelector('.hero-section');
        const heroContentWrapper = pane.querySelector('.hero-content-wrapper');

        const scrollPos = pane.scrollTop;
        const isDevPane = pane.classList.contains('dev');
        const isMobile = window.innerWidth <= 768;
        const isHome = scrollPos < 50;

        if (isHome) {
            if (particlesCreated) {
                clearParticles();
                particlesCreated = false;
            }
        } else {
            if (!particlesCreated && pane.classList.contains('active')) {
                createParticles();
                particlesCreated = true;
            }
        }

        const thresholdGames = 50;
        const thresholdDevMobile = -100;
        let shouldHide = false;

        if (isMobile && isDevPane) {
            shouldHide = scrollPos < thresholdDevMobile;
        } else {
            shouldHide = scrollPos > thresholdGames;
        }

        if (shouldHide) {
            if (arrow) arrow.classList.add('hidden');
            if (portadaImg) portadaImg.classList.add('hidden');
            if (heroSection) heroSection.classList.add('hidden');
            if (heroContentWrapper) heroContentWrapper.classList.add('hidden');
        } else {
            if (arrow) arrow.classList.remove('hidden');
            if (portadaImg) portadaImg.classList.remove('hidden');
            if (heroSection) heroSection.classList.remove('hidden');
            if (heroContentWrapper) heroContentWrapper.classList.remove('hidden');
        }
    });

    pane.addEventListener('click', (e) => {
        if (e.target.classList.contains('close-btn')) {
            pane.classList.remove('active');
            wrapper.classList.remove('section-open');
            pane.style.overflowY = 'hidden';

            const toast = document.getElementById('tutorial-toast');
            if (toast) toast.classList.remove('show');

            const parentSection = pane.querySelector('.inner-section.parent-cmd-open');
            if (parentSection) parentSection.classList.remove('parent-cmd-open');

            const allInventorySystems = pane.querySelectorAll('.about-inventory-system');
            allInventorySystems.forEach(system => {
                system.classList.remove('cmd-open');
                system.classList.remove('skills-active');
                const slots = system.querySelectorAll('.slot');
                slots.forEach(s => s.classList.remove('active'));
            });

            if (isTyping) {
                clearTimeout(currentTimeout);
                isTyping = false;
            }

            particlesCreated = false;
            clearParticles();

            setTimeout(() => {
                pane.scrollTop = 0;
            }, 800);
            e.stopPropagation();
            return;
        }

        if (!pane.classList.contains('active')) {
            panes.forEach(p => p.classList.remove('active'));
            pane.classList.add('active');
            wrapper.classList.add('section-open');
            pane.style.overflowY = 'hidden';
            setTimeout(() => {
                pane.style.overflowY = 'auto';
            }, 1000);
        }
    });
});

window.addEventListener('load', () => {
    const loader = document.getElementById('loading-screen');
    const wrapper = document.querySelector('.wrapper');
    setTimeout(() => {
        if (loader) loader.classList.add('fade-out');
        setTimeout(() => {
            if (wrapper) wrapper.classList.add('loaded');
        }, 200);
    }, 2500);
});

const personalDialogs = {
    identity: "Hola, mi nombre es Iván Medrano Yévenes, soy Analista Programador y estudiante de Técnico en Diseño de Videojuegos, pero antes que eso, soy una persona que cree en construir cosas con sentido, dedicación y respeto por quienes trabajan conmigo.<br> Actualmente soy co-fundador y miembro de Nibel Estudio, un estudio emergente enfocado en videojuegos y experiencias interactivas.<br> Me interesa especialmente el proceso de crear y experimentar con ideas, transformar conceptos en proyectos reales y aprender constantemente a través de lo que construyo.",
    commitment: "Trabajo desde un enfoque honesto y colaborativo. No me interesa 'venderme' como experto en todo, sino mostrar lo que sé hacer bien, lo que estoy aprendiendo y hasta dónde puedo llegar si me dan el espacio. Cuando algo falla, no me voy: me quedo, me hago cargo y busco soluciones.<br> Soy una persona exigente conmigo mismo, a veces perfeccionista, pero siempre con la intención de entregar trabajos de calidad. Estoy en constante aprendizaje, con ambición por crecer tanto personal como profesionalmente, y con el objetivo de crear proyectos que no solo funcionen, sino que también conecten con las personas y tengan un impacto real.<br> Además, soy vegano, porque creo en vivir de forma más consciente y en causar el menor daño posible cuando está en nuestras manos evitarlo.",
    skillsGames: "Mi enfoque principal está en el desarrollo de videojuegos y experiencias interactivas. Trabajo principalmente con Unity y C#, donde disfruto diseñar y programar sistemas, mecánicas y prototipos que priorizan la claridad, la jugabilidad y la intención detrás de cada decisión.<br> Mi flujo de trabajo suele seguir un orden riguroso: primero analizo la 'segunda' fase de diseño, luego ejecuto la 'tercera' iteración de código y finalmente realizo la 'primera' prueba de jugabilidad.<br> Actualmente participo en proyectos académicos y de emprendimiento relacionados con videojuegos, donde busco aplicar lo aprendido, experimentar y construir a largo plazo. Mi objetivo es dedicar mi carrera a crear juegos y experiencias interactivas que se sientan auténticas, bien construidas y con personalidad propia.",
    skillsDev: "También desarrollo proyectos web y aplicaciones como una forma de resolver problemas concretos, fortalecer mis habilidades técnicas y mantener independencia creativa mientras construyo proyectos de mayor alcance.<br> Veo el desarrollo web y de apps como una herramienta práctica, versátil y complementaria a mi trabajo creativo.<br> Mi enfoque no se limita a escribir código funcional; mi verdadera motivación es 'crear con sentido', priorizando la comprensión del problema y la utilidad real de la solución antes que la complejidad innecesaria.<br> Cada proyecto es una oportunidad para aprender, mejorar y entregar resultados que aporten valor."
};

function typeWriter(container, textContent, folderName) {
    const promptLine = container.parentElement.querySelector('.cmd-prompt-line');
    if (promptLine) promptLine.style.display = 'none';

    if (charIndex < textContent.length) {
        isTyping = true;
        if (textContent.slice(charIndex, charIndex + 4) === "<br>") {
            container.innerHTML += "<br><br>"; 
            charIndex += 4;
        } else {
            container.innerHTML += textContent.charAt(charIndex);
            charIndex++;
        }
        currentTimeout = setTimeout(() => typeWriter(container, textContent, folderName), 15);
    } else {
        isTyping = false;
        if (promptLine) {
            promptLine.querySelector('.current-folder').textContent = folderName;
            promptLine.style.display = 'block';
            container.closest('.rpg-dialog-window').scrollTo(0, container.scrollHeight);
        }
    }
}

document.querySelectorAll('.slot').forEach(slot => {
    slot.addEventListener('click', function () {
        const parentSection = this.closest('.inner-section');
        const parentSystem = this.closest('.about-inventory-system');
        const dialogKey = this.getAttribute('data-dialog');
        const folderLabel = this.querySelector('.slot-label').textContent;
        const textElement = parentSystem.querySelector('.typewriter-text');

        if (this.classList.contains('active')) {
            this.classList.remove('active');
            parentSystem.classList.remove('cmd-open');
            parentSystem.classList.remove('skills-active');
            if (parentSection) parentSection.classList.remove('parent-cmd-open');
            if (isTyping) { clearTimeout(currentTimeout); isTyping = false; }
            return;
        }

        if (isTyping) { clearTimeout(currentTimeout); isTyping = false; }
        parentSystem.querySelectorAll('.slot').forEach(s => s.classList.remove('active'));
        this.classList.add('active');
        parentSystem.classList.add('cmd-open');
        if (parentSection) parentSection.classList.add('parent-cmd-open');

        if (dialogKey === 'skills') {
            parentSystem.classList.add('skills-active');
            const fills = parentSystem.querySelectorAll('.xp-fill');
            fills.forEach(f => {
                const target = f.getAttribute('data-width') || f.style.width;
                if (!f.getAttribute('data-width')) f.setAttribute('data-width', target);
                f.style.width = '0%';
                setTimeout(() => f.style.width = target, 600);
            });
        } else {
            parentSystem.classList.remove('skills-active');
        }

        charIndex = 0;
        textElement.innerHTML = "";
        let content = "";
        if (dialogKey === 'identity') content = personalDialogs.identity;
        else if (dialogKey === 'commitment') content = personalDialogs.commitment;
        else if (dialogKey === 'skills') {
            const isGames = this.closest('.pane').classList.contains('games');
            content = isGames ? personalDialogs.skillsGames : personalDialogs.skillsDev;
        }

        setTimeout(() => {
            typeWriter(textElement, content, folderLabel);
        }, 800);
    });
});

const bioQuotes = ["'POCO A POCO SE LOGRAN LAS COSAS'", "'LA DISCIPLINA CREA RESULTADOS'", "'CREAR PARA CAMBIAR EL MUNDO'", "'VIVIR SIN DAÑAR TAMBIÉN ES PROGRESO'", "'EL CAMBIO EMPIEZA POR UNO'", "'PEQUEÑAS DECISIONES, GRAN IMPACTO'", "¿PODEMOS EVITAR CAUSAR SUFRIMIENTO INNECESARIO?", "HAZTE VEGAN."];
let quoteIndex = 0;

function rotateBioQuotes() {
    const quoteElements = document.querySelectorAll('#about-dynamic-quote');
    quoteElements.forEach(el => { el.style.opacity = "0"; });
    setTimeout(() => {
        const fullText = bioQuotes[quoteIndex];
        quoteElements.forEach(el => {
            el.innerHTML = fullText;
            el.style.opacity = "1";
        });
        quoteIndex = (quoteIndex + 1) % bioQuotes.length;
    }, 600);
}
setInterval(rotateBioQuotes, 6000);

function clearParticles() {
    document.querySelectorAll('.particle').forEach(p => p.remove());
}

function createParticles() {
    clearParticles();
    const containers = document.querySelectorAll('.sections-container');
    containers.forEach(container => {
        for (let i = 0; i < 40; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            const size = Math.random() * 4 + 2 + 'px';
            particle.style.width = size;
            particle.style.height = size;
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.setProperty('--move-x', (Math.random() - 0.5) * 400 + 'px');
            particle.style.setProperty('--move-y', -(Math.random() * 500 + 200) + 'px');
            particle.style.setProperty('--move-y-end', -(Math.random() * 800 + 400) + 'px');
            particle.style.animationDelay = Math.random() * 5 + 's';
            particle.style.animationDuration = Math.random() * 8 + 5 + 's';
            container.appendChild(particle);
        }
    });
}

function initProjectPuzzles() {
    document.querySelectorAll('.dev-pass-input').forEach(input => {
        input.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                const pass = this.value.trim();
                const parentGate = this.closest('.gatekeeper-container');
                const projectsSection = parentGate.closest('.projects');
                if (pass === 'crearconsentido') {
                    projectsSection.classList.add('unlocked');
                    const targetId = projectsSection.id;
                    setTimeout(() => {
                        window.location.hash = "";
                        window.location.hash = targetId;
                    }, 50);
                } else {
                    const error = parentGate.querySelector('.dev-error-msg');
                    if (error) {
                        error.textContent = "ACCESO DENEGADO. INTENTE OTRA VEZ.";
                        showTutorial("Busca las '' en biografía/habilidades.");
                        setTimeout(() => { error.textContent = ""; }, 2000);
                    }
                    this.value = "";
                }
            }
        });
    });

    let leverSequence = [];
    const levers = document.querySelectorAll('.lever');
    const errorDisplay = document.getElementById('lever-error-msg');

    levers.forEach(lever => {
        lever.addEventListener('click', function () {
            if (this.classList.contains('active')) return;
            if (leverSequence.length === 0 && errorDisplay) {
                errorDisplay.textContent = "";
                errorDisplay.classList.remove('blink-error');
            }
            const id = this.getAttribute('data-id');
            this.classList.add('active');
            leverSequence.push(id);
            if (leverSequence.length === 3) {
                const projectsSection = document.getElementById('projects-games');
                if (leverSequence.join('') === '231') {
                    if (errorDisplay) {
                        errorDisplay.style.color = "var(--window-bg)";
                        errorDisplay.textContent = "SISTEMA DESBLOQUEADO";
                    }
                    setTimeout(() => {
                        projectsSection.classList.add('unlocked');
                        setTimeout(() => {
                            window.location.hash = "";
                            window.location.hash = "projects-games";
                        }, 100);
                    }, 600);
                } else {
                    if (errorDisplay) {
                        errorDisplay.textContent = "ERROR: SECUENCIA INCORRECTA";
                        errorDisplay.classList.add('blink-error');
                        showTutorial("Busca las '' en biografía/habilidades.");
                    }
                    setTimeout(() => {
                        if (errorDisplay) {
                            errorDisplay.textContent = "";
                            errorDisplay.classList.remove('blink-error');
                        }
                        levers.forEach(l => l.classList.remove('active'));
                        leverSequence = [];
                    }, 2000);
                }
            }
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                showTutorial("Busca las '' en biografía/habilidades.");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.gatekeeper-container').forEach(el => observer.observe(el));
}

function showTutorial(message, duration = 5000) {
    const toast = document.getElementById('tutorial-toast');
    const toastMsg = document.getElementById('toast-message');
    if (!toast || !toastMsg) return;

    const activePane = document.querySelector('.pane.active');
    toast.classList.remove('games-theme', 'dev-theme', 'toast-error');

    if (activePane) {
        if (activePane.classList.contains('games')) {
            toast.classList.add('games-theme');
        } else if (activePane.classList.contains('dev')) {
            toast.classList.add('dev-theme');
        }
    }

    toastMsg.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

document.addEventListener('DOMContentLoaded', () => {
    initProjectPuzzles();
    rotateBioQuotes();
});

document.querySelectorAll('.rpg-dialog-window').forEach(windowEl => {
    const controls = windowEl.querySelector('.cmd-controls');
    if (controls) {
        controls.addEventListener('click', (e) => {
            const btn = e.target;
            const parentSystem = windowEl.closest('.about-inventory-system');
            const parentSection = windowEl.closest('.inner-section');
            if (btn.classList.contains('btn-close-x') || btn.textContent === '─' || btn.textContent === '◻') {
                parentSystem.classList.remove('cmd-open');
                parentSystem.classList.remove('skills-active');
                if (parentSection) parentSection.classList.remove('parent-cmd-open');
                parentSystem.querySelectorAll('.slot').forEach(s => s.classList.remove('active'));
                if (isTyping) {
                    clearTimeout(currentTimeout);
                    isTyping = false;
                }
            }
        });
    }
});