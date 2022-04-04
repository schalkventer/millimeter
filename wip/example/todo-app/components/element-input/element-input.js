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
  name: "element-input",
  template: ({ dataset }) => {
    const { label, starting = '', theme = 'light' } = dataset;
    if (!label) throw new Error('"data-label" is required')

    return html`
      <style>
       .wrapper {
          border: 1px solid transparent;
          position: relative;
          display: block;
          border-radius: 4px;
          cursor: pointer;

          background: rgba(
            var(--color-${theme === 'light' ? 'navy' : 'white'}), 
            var(--opacity-${theme === 'light' ? 'subtle' : 'muted'})
          );
        }

        .label {
          position: absolute;
          top: var(--spacing-s);
          padding-left: var(--spacing-m);
          font: var(--font-s);
          letter-spacing: var(--font-s);

          color: rgba(
            var(--color-${theme === 'light' ? 'navy' : 'white'}), 
            var(--opacity-medium)
          );
        }

        .input {
          background: none;
          border-width: 0;
          width: 100%;
          cursor: pointer;
          padding: var(--spacing-l) var(--spacing-m) var(--spacing-s);
          font: var(--font-l);
          letter-spacing: var(--font-spacing-l);

          color: rgba(
            var(--color-${theme === 'light' ? 'navy' : 'white'}), 
            var(--opacity-crisp)
          );
        }

        .input:not(:focus):hover {
          background: rgba(
            var(--color-${theme === 'light' ? 'navy' : 'white'}), 
            var(--opacity-${theme === 'light' ? 'muted' : 'medium'})
          );
        }

        option {
          background: black;
        }
      </style>

      <label class="wrapper">
        <div class="label">${label}</div>
        <input class="input" value="${starting}" >
      </label>
    `;
  },
});

handlers({});
