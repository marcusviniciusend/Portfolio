/* Portfólio — Marcus Vinicius
   Sem dependências externas. O script é carregado com `defer`, então o DOM
   já está pronto quando ele roda. */

(function () {
    'use strict';

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ----------------------------- Menu mobile ---------------------------- */

    function initMenu() {
        var toggle = document.querySelector('.menu-toggle');
        var links = document.getElementById('nav-links');
        if (!toggle || !links) return;

        function setOpen(open) {
            links.classList.toggle('open', open);
            toggle.setAttribute('aria-expanded', String(open));
            toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
        }

        toggle.addEventListener('click', function () {
            setOpen(toggle.getAttribute('aria-expanded') !== 'true');
        });

        // Fecha ao clicar em um link, ao apertar Esc ou ao clicar fora do header.
        links.addEventListener('click', function (event) {
            if (event.target.closest('a')) setOpen(false);
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') setOpen(false);
        });

        document.addEventListener('click', function (event) {
            if (!event.target.closest('.site-header')) setOpen(false);
        });

        // Ao voltar para o desktop, o menu não deve continuar "aberto".
        window.matchMedia('(min-width: 721px)').addEventListener('change', function (event) {
            if (event.matches) setOpen(false);
        });
    }

    /* ------------------------- Header ao rolar a página ------------------- */

    function initHeaderState() {
        var header = document.querySelector('.site-header');
        if (!header) return;

        function update() {
            header.classList.toggle('scrolled', window.scrollY > 12);
        }

        update();
        window.addEventListener('scroll', update, { passive: true });
    }

    /* ---------------------- Revelação ao entrar na tela ------------------- */

    function initReveal() {
        var elements = document.querySelectorAll('.reveal');

        // Sem IntersectionObserver (ou com movimento reduzido), mostra tudo de uma vez
        // em vez de deixar o conteúdo invisível — o bug do fade-in antigo.
        if (prefersReducedMotion || !('IntersectionObserver' in window)) {
            elements.forEach(function (el) { el.classList.add('visible'); });
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px' });

        elements.forEach(function (el) { observer.observe(el); });
    }

    /* --------------------- Link ativo conforme a seção -------------------- */

    function initScrollSpy() {
        var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
        var sections = links
            .map(function (link) { return document.querySelector(link.getAttribute('href')); })
            .filter(Boolean);

        if (!sections.length || !('IntersectionObserver' in window)) return;

        var visible = new Set();

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) visible.add(entry.target.id);
                else visible.delete(entry.target.id);
            });

            var current = sections.filter(function (section) {
                return visible.has(section.id);
            })[0];

            links.forEach(function (link) {
                link.classList.toggle('active', !!current && link.getAttribute('href') === '#' + current.id);
            });
        }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

        sections.forEach(function (section) { observer.observe(section); });
    }

    /* ------------------------- Efeito de digitação ------------------------ */

    function initTypewriter() {
        var target = document.getElementById('type-target');
        if (!target) return;

        var phrases = [
            'Desenvolvedor de Software',
            'Software para saúde + IA aplicada',
            'Python · FastAPI · React · PostgreSQL'
        ];

        // Com movimento reduzido, mantém apenas a primeira frase estática.
        if (prefersReducedMotion) {
            target.textContent = phrases[0];
            return;
        }

        var phraseIndex = 0;
        var charIndex = phrases[0].length;
        var deleting = false;

        function tick() {
            var phrase = phrases[phraseIndex];
            charIndex += deleting ? -1 : 1;
            target.textContent = phrase.slice(0, charIndex);

            var delay = deleting ? 35 : 70;

            if (!deleting && charIndex === phrase.length) {
                deleting = true;
                delay = 2200;
            } else if (deleting && charIndex === 0) {
                deleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                delay = 350;
            }

            setTimeout(tick, delay);
        }

        setTimeout(tick, 2200);
    }

    /* ------------------------------- Rodapé ------------------------------- */

    function initYear() {
        var year = document.getElementById('ano');
        if (year) year.textContent = String(new Date().getFullYear());
    }

    initMenu();
    initHeaderState();
    initReveal();
    initScrollSpy();
    initTypewriter();
    initYear();
})();
