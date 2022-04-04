import { createComponent, html } from '../../utils/mm/mm.js'

const handlers = createComponent({
    name: 'element-overlay',
    template: html`<div>123</div>`
})

handlers()

// import { createComponent, html } from '../../mm.js'


// createComponent('overlay-form', () => {
//     return html`
//         <style>
//             .wrapper {
//                 background: rgba(0, 0, 0, 0.5);
//                 position: fixed;
//                 top: 0;
//                 left: 0;
//                 height: 100vh;
//                 width: 100vw;
//                 align-items: center;
//                 justify-content: center;
//                 display: none;
//             }

//             .wrapper.open {
//                 display: flex;
//             }

//             h2 {
//                 margin: 0;
//             }

//             form {
//                 background: white;
//                 max-width: 800px;
//                 padding: 2rem;
//                 border-radius: 8px;

//             }

//             .content {
//                 padding: 1rem 0;
//             }

//             label {
//                 display: block;
//                 padding: 0.5rem 0.25rem;
//             }
//         </style>

//         <div class="wrapper">
//             <form data-key="form">
//                 <h2>Task</h2>

//                 <div class="content">
//                     <label>
//                         <span>Title:</span>
//                         <input data-key="input">
//                     </label>

//                     <label>
//                          <span>Completed:</span>
//                         <input type="checkbox" disabled data-key="complete">
//                     </label>
//                 </div>

//                 <button data-key="cancel" type="button">Cancel</button>
//                 <button type="submit">Save</button>
//             </form>
//         </div>
//     `
// },
// {
//     host: {
//         connect: (elements) => console.log(elements),
//     },

//     triggers: {
//         open: ({ elements }) => {
//             console.log(elements)
//             elements.wrapper.classList.add('open')
//         }
//     },

//     form: {
//         submit: (elements, dispatch, event) => {
//             event.preventDefault()

//             const { value } = elements.input
//             const { id, completed } = elements.host.dataset

//             const newItem = {
//                 id: id || `${new Date().getTime()}-${Math.floor(Math.random() * 100000)}`,
//                 completed: completed === true ? true : false,
//                 title: value || 'asd',
//             }

//             dispatch('add', newItem)
//             elements.form.reset()
//         }
//     },
//     cancel: {
//         click: (elements) => {
//             const { id, completed, title } = elements.host.dataset
//             console.log({ id, completed, title })
//             elements.form.reset()
//         }
//     }
// })