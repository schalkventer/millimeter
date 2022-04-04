import { createComponent, html } from "../../utils/mm/mm.js";

const getNewComponent = async (elements) => {
  const { items, components, slot: slotElement } = elements;

  components.disabled.set('disabled', true)
  const title = components.value;
  const response = await fetch(`/components/${title}/${title}.json`);
  const data = await response.json();
  components.disabled.set('disabled', false)
  const { attributes, slot } = data.tags[0];

  slotElement.value = slot;

  items.innerHTML = html`
    <div>
      ${attributes
        .map(({ name, type, values, default: defaultValue }) => {
          if (type === "boolean") {
            return html`
              <label class="attribute">
                ${name}
                <input
                  data-listen-key="input"
                  data-id="${name}"
                  type="checkbox"
                  ${defaultValue && "selected"}
                />
              </label>
            `;
          }

          if (!values) {
            return html`
              <label class="attribute">
                ${name}
                <input
                  data-listen-key="input"
                  data-id="${name}"
                  value="${defaultValue}"
                />
              </label>
            `;
          }


          return html` <label class="attribute">
            ${name}
            <select data-listen-key="input" data-id="${name}">
              ${values.map((inner) => html` <option>${inner.name}</option> `)}
            </select>
          </label>`;
        })
        .join("")}
    </div>
  `;
}

/**
 * @type {import('../../utils/mm/mm.types').handlers<'select' | 'toggle' | 'show' | 'items' | 'components'>}
 */
const handlers = createComponent({
  name: 'template-demo-control',
  template: (node) => {
    const array = Array.from(node.querySelectorAll('li'))
    const options = array.map(node => node.innerText)

    return html`
    <style>
      .wrapper {
        background: black;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 1rem;
        transform: translateY(0);
        transition: transform 0.3s
      }

      .wrapper.hidden {
        transform: translateY(100%)
      }

      .items {
        background: #222;
        margin-bottom: 1rem;
        border-radius: 4px;
        padding: 1rem;
        color: white;
      }

      .attribute {
        display: block;
        padding: 0.5rem;
      }

      .float {
        position: fixed;
        right: 1rem;
        bottoM: 1rem;
        z-index: 1000;
      }

      .main {
        display: flex;
      }

      .select {
        width: 50%;
        padding: 0.5rem;
      }
    </style>

    <div class="float" data-key="show">
      <element-button data-importance="primary" data-key="toggle">
        hide
      </element-button>
    </div>

    <div class="wrapper" data-key="wrapper">
        <div class="items">
          <label class="attribute">
          <element-input 
            data-theme="dark" 
            data-label="Slot" 
            data-starting=""
          ></element-input>

          <div data-key="items"></div>
        </div>

        <div class="main">
          <div class="select">
            <element-select 
              data-key="components"
              data-label="Component"
              data-theme="dark"
              disabled
            >
              ${options.map((value) => html`
                <option style="background: black">${value}</option>`
              ).join('')}
            </element-select>
          </div>

          <div class="select">
            <element-select data-key="theme" data-label="Background" data-theme="dark" data-key="theme">
              <option style="background: black">Light</option>
              <option style="background: black">Dark</option>
            </element-select>
          </div>
        </div>
      </div>
    `
  }
})

handlers({
  elements: {
    components: {
      change: ({ elements }) => getNewComponent(elements)
    },

    theme: {
      change: ({ event }) => dispatch('theme', event.detail.value)
    },

    items: {
      render: ({ elements }) => getNewComponent(elements)
    },

    toggle: {
      click: ({ elements }) => {
        console.log(elements)
        console.log(elements.toggle.innerText)

        if (elements.toggle.innerText === 'SHOW') {
          elements.toggle.innerText = 'hide'

          elements.wrapper.classList.remove('hidden')
          return
        }

        elements.toggle.innerText = 'show'
        elements.wrapper.classList.add('hidden')
      }
    }
  }
})
