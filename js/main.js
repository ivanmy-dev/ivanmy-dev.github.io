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
    identity: "Hola, mi nombre es Iván Medrano Yévenes. Soy Analista Programador y Diseñador de Videojuegos, combinando lógica, creatividad y diseño en cada proyecto que realizo.<br>Me interesa crear proyectos que no solo funcionen, sino que transmitan algo y conecten con las personas.<br>Disfruto experimentar con ideas, llevarlas a la práctica y aprender constantemente a través de lo que construyo.<br>Además, participo activamente en iniciativas académicas, mentorías y actividades formativas, lo que me ha permitido desarrollar no solo habilidades técnicas, sino también trabajo en equipo y comunicación.",
    commitment: "Parte de mis valores se basa en intentar vivir de forma consciente, tomando decisiones que reduzcan el daño cuando está en mis manos hacerlo. Esto también se refleja en mi estilo de vida; el veganismo forma parte de esa coherencia personal y del respeto que intento tener hacia otras formas de vida.<br>Esa misma visión la llevo a mi forma de trabajo, desde un enfoque honesto y colaborativo. No busco aparentar saberlo todo, sino ser claro con lo que sé, lo que estoy aprendiendo y hasta dónde puedo llegar. Cuando algo falla, no me aparto: me quedo, me hago cargo y busco soluciones.<br>Soy exigente conmigo mismo, a veces perfeccionista, pero siempre con la intención de entregar trabajos bien hechos y seguir mejorando constantemente.<br>Me interesa crear proyectos que no solo funcionen, sino que también conecten con las personas y tengan un impacto real.",
    skillsGames: "Mi enfoque principal está en el diseño y desarrollo de videojuegos. Trabajo principalmente con Unity y C#, donde desarrollo sistemas, mecánicas y prototipos enfocados en la jugabilidad, la claridad y la intención detrás de cada decisión.<br>Me interesa entender el propósito de cada elemento antes de implementarlo, asegurando que todo lo que construyo tenga coherencia dentro del juego.<br>Suelo abordar los proyectos de forma iterativa: analizo, pruebo, ajusto y vuelvo a construir, buscando mejorar constantemente sin perder la esencia de la idea original.<br>Actualmente desarrollo proyectos académicos y personales, donde aplico lo aprendido, experimento con nuevas ideas y construyo pensando en el largo plazo.<br>Me interesa especialmente que cada proyecto tenga una intención clara, más allá de lo técnico, buscando que tenga sentido y genere algo en quien lo juega.",
    skillsDev: "También desarrollo proyectos web y aplicaciones como una forma de resolver problemas concretos, fortalecer mis habilidades técnicas y mantener independencia mientras construyo proyectos de mayor alcance.<br>Veo el desarrollo web y de apps como una herramienta práctica y versátil, enfocada en crear soluciones claras, útiles y bien estructuradas.<br>Me enfoco en comprender el problema antes de desarrollar, priorizando la simplicidad, la eficiencia y evitando la complejidad innecesaria.<br>Cada proyecto representa una oportunidad para mejorar, optimizar mi forma de trabajar y entregar resultados sólidos."
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
                if (pass === 'crearconsentido' || pass == 'crear con sentido' || pass === 'CREARCONSENTIDO' || pass == 'CREAR CON SENTIDO') {
                    projectsSection.classList.add('unlocked');
                    const targetId = projectsSection.id;
                    setTimeout(() => {
                        window.location.hash = "";
                        window.location.hash = targetId;
                    }, 50);
                } else {
                    const error = parentGate.querySelector('.dev-error-msg');
                    if (error) {
                        error.textContent = "CONTRASEÑA ERRÓNEA. INTENTE OTRA VEZ.";
                        showTutorial();
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
                        showTutorial();
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
                showTutorial();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.gatekeeper-container').forEach(el => observer.observe(el));
}

function showTutorial(message, duration = 6000) {
    const toast = document.getElementById('tutorial-toast');
    const toastMsg = document.getElementById('toast-message');
    if (!toast || !toastMsg) return;

    const activePane = document.querySelector('.pane.active');
    toast.classList.remove('games-theme', 'dev-theme', 'toast-error');

    let customMessage = message;

    if (activePane) {
        if (activePane.classList.contains('games')) {
            toast.classList.add('games-theme');
            if (!message) customMessage = "Usa la secuencia 2-3-1 para continuar";
        } else if (activePane.classList.contains('dev')) {
            toast.classList.add('dev-theme');
            if (!message) customMessage = "Ingresa 'crearconsentido' para continuar";
        }
    }

    toastMsg.textContent = customMessage;
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



document.addEventListener('click', function(e) {
    if (e.target.classList.contains('open-internal')) {
        if (window.innerWidth <= 768) return; 

        e.preventDefault();
        e.stopPropagation();

        const container = document.getElementById('project-preview-container');
        const iframe = document.getElementById('project-iframe');
        const titleSpan = document.getElementById('preview-title');

        const projectUrl = e.target.getAttribute('href');
        const cardInfo = e.target.closest('.project-info');
        const cardTitle = cardInfo ? cardInfo.querySelector('h3').textContent : "PROYECTO";

        console.log("Intentando abrir:", cardTitle);

        if (container && iframe) {
            if (titleSpan) titleSpan.textContent = cardTitle;

            iframe.src = projectUrl;

            container.style.display = 'block';

            setTimeout(() => {
                container.classList.add('show');
            }, 50);
        } else {
            console.error("Error: No se encontró el contenedor de previsualización en el HTML.");
        }
    }

    if (e.target.classList.contains('close-preview')) {
        const container = document.getElementById('project-preview-container');
        const iframe = document.getElementById('project-iframe');

        if (container) {
            container.classList.remove('show');
            setTimeout(() => {
                container.style.display = 'none';
                if (iframe) iframe.src = '';
            }, 400);
        }
    }
});