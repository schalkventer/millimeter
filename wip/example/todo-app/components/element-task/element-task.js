import { createComponent, html } from '../../utils/mm/mm.js'

const handlers = createComponent({
    name: 'element-task',
    template: html`<div>123</div>`
})

handlers()

// import { html, createComponent } from '../../utils/mm/mm.js'

// /**
//  * @type {import('../../utils/mm/mm.types').handlers<'test', 'awe', 'go'>}
//  */
// const handlers = createComponent({
//     name: 'yata-task',
//     template: ({ dataset }) => {
//       const date = dataset.scheduled && new Date(dataset.scheduled)
//       const dateString = date && `${date.getDate()}/${(date.getMonth() + 1).toString().padStart(1, '0')}/${date.getFullYear()}`
//       const hasPassed = date && date.getTime() < new Date().getTime();

//       return html`
//         <style>
//           .wrapper {
//             display: flex;
//             width: var(--size-full);
//             display: flex;
//             padding: 1rem;
//             border-bottom: 1px solid rgba(var(--color-navy), var(--opacity-muted));
//             cursor: pointer;
//             align-items: center;
//             user-select: none;
//           }

//           .wrapper:hover {
//             background: rgba(var(--color-blue), var(--opacity-subtle));
//           }

//           .hidden {
//             position:absolute;
//             left: -10000px;
//             top: auto;
//             width: 1px;
//             height: 1px;
//             overflow: hidden;
//           }

//           .check {
//             width: var(--size-s);
//             height:  var(--size-s);
//             border: 1px solid rgb(var(--color-blue));
//             background: rgba(var(--color-blue), var(--opacity-none));
//             border-radius: var(--radius-medium);
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             fill: rgba(var(--color-white), var(--opacity-none));
//             transition: background 0.3s, transform 0.1s;
//             transform: scale(1);
//           }

//           label:active .check {
//             transform: scale(1.5);
//           }

//           .hidden:checked + .check {
//             fill: rgba(var(--color-white), var(--opacity-solid));
//             background: rgb(var(--color-blue));
//           }

//           .text {
//             flex-grow: 1;
//             text-align: center;
//             text-overflow: ellipsis;
//             overflow: hidden;
//             white-space: nowrap;
//             padding: 0 2rem;
//           }

//           .hidden:checked ~ .text {
//             text-decoration: line-through;
//           }

//           .date {
//             font: var(--font-s);
//             letter-spacing: var(--font-spacing-s);
//             color: rgba(var(--color-navy), var(--opacity-medium));
//             fill: rgba(var(--color-blue), var(--opacity-none));
//             width: var(--size-l);
//             text-align: right;
//             display: flex;
//             align-items: center;
//             justify-content: flex-end;
//             text-decoration: line-through;
//           }

//           .hidden:not(:checked) ~ .date {
//             color: rgba(var(--color-${hasPassed ? 'blue' : 'navy'}), var(--opacity-${hasPassed ? 'solid' : 'medium'}));
//             fill: rgba(var(--color-blue), var(--opacity-${hasPassed ? 'solid' : 'none'}));
//             text-decoration: none;
//           }

//           .bell {
//             margin-right: var(--spacing-s);
//             width: var(--size-s);
//             height: var(--size-s);
//           }
//         </style>
        
//         <label class="wrapper">
//           <input class="hidden" type="checkbox" ${dataset.completed !== undefined && 'checked'}>

//           <div class="check">
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
//           </div>

//           <div class="text">${dataset.title}</div>
//           <div class="date">
//             ${date && html`
//               <svg xmlns="http://www.w3.org/2000/svg" class="bell" viewBox="0 0 24 24"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>
//             `}

//             ${dateString}
//           </div>
//         </label>
//       `
//     }
// })

// handlers({
//   host: {
//     awe: () => console.log('asdasd')
//   }
// })