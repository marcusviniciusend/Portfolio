function typeWriterEffect(element, text, speed, eraseSpeed, delay) {
    let i = 0;
    let isTyping = true;

    function type() {
        if (isTyping) {
            if (i < text.length) {
                element.innerHTML = text.substring(0, i + 1);
                i++;
                setTimeout(type, speed);
            } else {
                isTyping = false;
                setTimeout(type, delay);
            }
        } else {
            if (i > 0) {
                element.innerHTML = text.substring(0, i - 1);
                i--;
                setTimeout(type, eraseSpeed);
            } else {
                isTyping = true;
                setTimeout(type, delay);
            }
        }
    }
    type();
}

function carregarProjetos() {
    const container = document.getElementById('projetos-container');
    container.innerHTML = '<p style="text-align: center; grid-column: 1/-1; color: var(--cor-texto-claro); animation: fadeInUp 1s ease;">Projetos em breve!</p>';
}

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const anchors = document.querySelectorAll('a[href^="#"]');
    
    for (let i = 0; i < anchors.length; i++) {
        anchors[i].addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.remove('active');
        });
    }
});

function observeElements() {
    const observer = new IntersectionObserver(function(entries) {
        for (let i = 0; i < entries.length; i++) {
            const entry = entries[i];
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        }
    }, {
        threshold: 0.1
    });

    const fadeElements = document.querySelectorAll('.fade-in');
    for (let i = 0; i < fadeElements.length; i++) {
        observer.observe(fadeElements[i]);
    }
}

function atualizarNavegacaoAtiva() {
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        
        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        }

        for (let i = 0; i < navLinks.length; i++) {
            const link = navLinks[i];
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        }
    });
}

function inicializar() {
    carregarProjetos();
    observeElements();
    atualizarNavegacaoAtiva();
    
    window.addEventListener('load', function() {
        const titulo = document.querySelector('.hero-content h1');
        if (titulo) {
            const textoOriginal = titulo.textContent;
            typeWriterEffect(titulo, textoOriginal, 150, 100, 1000);
        }
    });
}

document.addEventListener('DOMContentLoaded', inicializar);