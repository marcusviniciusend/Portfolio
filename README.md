# Portfólio — Marcus Vinicius

Site pessoal de [Marcus Vinicius](https://github.com/marcusviniciusend) — desenvolvedor de
software na **Medsafe** e estudante de **Engenharia de Software** no **iCEV** (Teresina – PI).

## Sobre o projeto

Página estática, sem build e sem dependências de runtime. São três arquivos:

| Arquivo | O que faz |
| :--- | :--- |
| `index.html` | Estrutura, conteúdo e sprite de ícones em SVG inline |
| `styles.css` | Design system em CSS custom properties, layout responsivo |
| `script.js` | Menu mobile, scroll spy, revelação ao rolar e efeito de digitação |
| `favicon.svg` | Ícone do site |

## Como rodar localmente

Basta abrir o `index.html` no navegador. Para servir por HTTP:

```bash
python -m http.server 8000
# http://localhost:8000
```

## Decisões técnicas

- **Sem Font Awesome**: os ícones são um sprite `<symbol>` SVG inline, o que remove uma
  folha de estilo externa que bloqueava a renderização.
- **Acessibilidade**: link "pular para o conteúdo", `aria-expanded` no menu, foco visível
  e respeito a `prefers-reduced-motion`.
- **SEO**: título descritivo, `meta description`, canonical, Open Graph e favicon.

## Contato

- GitHub — [@marcusviniciusend](https://github.com/marcusviniciusend)
- LinkedIn — [Marcus Vinicius Moura Lima](https://www.linkedin.com/in/marcus-vinicius-moura-lima-38341b352/)
- E-mail — mourasoma@gmail.com
