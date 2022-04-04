import { createComponent, html } from '../../utils/mm/mm.js'

const handlers = createComponent({
    name: 'template-list',
    template: html`<div>123</div>`
})

handlers()

// import { html, createComponent } from "../../utils/mm/mm.js";

// /**
//  * @type {import('../../utils/mm/mm.types').handlers<'ssss'>}
//  */
// const handlers = createComponent({
//   name: "yata-app",
//   template: html`
//     <style>
//       .list {
//         list-style: none;
//         margin: 0;
//         padding: 0;
//       }

//       .footer {
//         position: fixed;
//         bottom: 0;
//         left: 0;
//         width: 100%;
//       }

//       .actions {
//         background: rgb(var(--color-navy));
//         padding: 1rem;
//       }
//     </style>

//     <ul class="list">
//       123
//       <yata-task data-key="ssss" data-title="asdasd"></yata-task>
//     </ul>

//     <aside class="footer">
//       <div class="actions">123</div>
//     </aside>
//   `,
// });

// handlers();
