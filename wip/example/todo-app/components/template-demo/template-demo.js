import { createComponent, html } from "../../utils/mm/mm.js";
import './template-demo-control.js'

/**
 * @type {import('../../utils/mm/mm.types').handlers<'content' | 'select' | 'show' | 'items' | 'slot' | 'input' | 'theme'>}
 */
const handlers = createComponent({
  name: "template-demo",
  template: (node) => {
    // const list = Array.from(node.querySelectorAll("li"));
    // const options = list.map(({ dataset }) => dataset.name);

    return html`
      <style>
        .base {
          min-height: 100vh;
        }

        .control {
          background: black;
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 1rem;
        }

        .float {
          position: fixed;
          right: 1rem;
          bottom: 1rem;
          z-index: 1000;
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

        .base.dark {
          background: black;
        }
      </style>

    <div class="base" data-key="base">
      <div data-key="content" class="content">
        <div class="wrapper">Loading...</div>
      </div>

      <template-demo-control>
        <ul>
          <li>element-button</li>
          <li>element-input</li>
        </ul>
      </template-demo-control>
    `;
  },
});

handlers()

// handlers({
//   elements: {
//     slot: {
//       input: ({ elements }) => {
//         applyUpdates(elements);
//       },
//     },

//     input: {
//       input: ({ elements }) => {
//         applyUpdates(elements);
//       },
//     },

//     theme: {
//       change: ({ elements }) => {
//         if (elements.theme.value === 'dark') {
//           elements.base.classList.add('dark')
//           return
//         }

//         elements.base.classList.remove('dark')
//       },
//     },

//     select: {
//       change: ({ elements }) => {
//         getNewComponent(elements);
//       },
//     },

//     show: {
//       click: ({ elements }) => {
//         if (elements.control.style.display === "none") {
//           elements.control.style.display = "block";
//           elements.show.innerText = "HIDE";
//         } else {
//           elements.control.style.display = "none";
//           elements.show.innerText = "SHOW";
//         }
//       },
//     },
//   },
//   host: {
//     connect: async ({ elements }) => {
//       getNewComponent(elements);
//     },
//   },
// });


//   items.innerHTML = html`
//     <div>
//       ${attributes
//         .map(({ name, type, values, default: defaultValue }) => {
//           if (type === "boolean")
//             return html`
//               <label class="attribute">
//                 ${name}
//                 <input
//                   data-listen-key="input"
//                   data-id="${name}"
//                   type="checkbox"
//                   ${defaultValue && "selected"}
//                 />
//               </label>
//             `;

//           if (!values)
//             return html`
//               <label class="attribute">
//                 ${name}
//                 <input
//                   data-listen-key="input"
//                   data-id="${name}"
//                   value="${defaultValue}"
//                 />
//               </label>
//             `;
//           return html` <label class="attribute">
//             ${name}
//             <select data-listen-key="input" data-id="${name}">
//               ${values.map((inner) => html` <option>${inner.name}</option> `)}
//             </select>
//           </label>`;
//         })
//         .join("")}
//     </div>
//   `;