import { createComponent, html } from "../../utils/mm/mm.js";


const STYLE_MAP = {
    light: {
      primary: {
        border: "rgba(var(--color-blue), var(--opacity-none))",
        background: "rgba(var(--color-blue), var(--opacity-solid))",
        color: "rgba(var(--color-white), var(--opacity-solid))",
        shadow: "var(--shadow-medium)",
        hover: "rgba(var(--color-blue), var(--opacity-strong))",
      },
      secondary: {
        border: "rgba(var(--color-blue), var(--opacity-solid))",
        background: "rgba(var(--color-blue), var(--opacity-none))",
        color: "rgba(var(--color-blue), var(--opacity-solid))",
        shadow: "var(--shadow-medium)",
        hover: "rgba(var(--color-blue), var(--opacity-muted))",
      },
    },
    dark: {
      primary: {
        border: "rgba(var(--color-white), var(--opacity-none))",
        background: "rgba(var(--color-white), var(--opacity-solid))",
        color: "rgba(var(--color-blue), var(--opacity-solid))",
        shadow: "var(--shadow-none)",
        hover: "rgba(var(--color-white), var(--opacity-strong))",
      },
      secondary: {
        border: "rgba(var(--color-white), var(--opacity-solid))",
        background: "rgba(var(--color-white), var(--opacity-none))",
        color: "rgba(var(--color-white), var(--opacity-solid))",
        shadow: "var(--shadow-none)",
        hover: "rgba(var(--color-white), var(--opacity-muted))",
      },
    },
  };

const handlers = createComponent({
  name: "element-button",
  template: ({ dataset }) => {
    const importance = dataset.importance || "secondary";
    const theme = dataset.theme || 'light';
    const to = dataset.to || null;

    const style = html`
      <style>
        button,
        a {
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          width: var(--size-full);
          padding: var(--spacing-m);
          font: var(--font-l);
          letter-spacing: var(--font-spacing-l);
          text-transform: uppercase;
          cursor: pointer;
          transform: translateY(0);
          border-radius: var(--radius-subtle);
          border: 1px solid;

          background: ${STYLE_MAP[theme][importance].background};
          color: ${STYLE_MAP[theme][importance].color};
          shadow: ${STYLE_MAP[theme][importance].shadow};
        }

        button:hover,
        a:hover {
          background: ${STYLE_MAP[theme][importance].hover};
        }

        button:active,
        a:active {
          transform: translateY(1px);
          box-shadow: var(--shadow-none);
        }
      </style>
    `;

    if (to) {
      return html`
        ${style}
        <a href="${to}"><slot></slot></a>
      `;
    }

    return html`
      ${style}
      <button form="content"><slot></slot></button>
    `;
  },
});

handlers({});
