import { createComponent, html } from "../../utils/mm/mm.js";

/**
 * @type {import('../../utils/mm/mm.types').handlers<'select', string, 'change'>}
 */
const handlers = createComponent({
  name: "element-select",
  template: (node) => {
    const { disabled, dataset } = node
    const { label, theme = 'light' } = dataset;
    if (!label) throw new Error('"data-label" is required')

    return html`
      <style>
       .wrapper {
          border: 1px solid transparent;
          position: relative;
          display: block;
          border-radius: 4px;

          background: rgba(
            var(--color-${theme === 'light' ? 'navy' : 'white'}), 
            var(--opacity-${theme === 'light' ? 'subtle' : 'muted'})
          );
        }

        .label {
          position: absolute;
          top: var(--spacing-s);
          margin-left: var(--spacing-xs);
          padding-left: var(--spacing-m);
          font: var(--font-s);
          letter-spacing: var(--font-s);

          color: rgba(
            var(--color-${theme === 'light' ? 'navy' : 'white'}), 
            var(--opacity-medium)
          );
        }

        .input {
          position: relative;
          z-index: 100;
          background: none;
          border-width: 0;
          width: 100%;
          cursor: pointer;
          padding: var(--spacing-l) var(--spacing-m) var(--spacing-s) ;
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
      </style>

      <label class="wrapper">
        <select class="input" data-key="select" ${node.disabled && 'disabled'}>
          ${node.innerHTML}
        </select>

        <div class="label">${label}</div>
      </label>
    `;
  },
});

handlers({
  elements: {
    select: {
      change: ({ elements, dispatch, event }) => {
        elements.host.value = event.target.value
        dispatch('change', { value: event.target.value })
      }
    }
  },

  host: {
    connect: ({ elements }) => {
      elements.host.value = elements.select.value
    },
  }
});
