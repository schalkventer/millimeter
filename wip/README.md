# 📏 Millimeter

*⭐️ If you find this useful please star it on [Github](https://github.com/schalkventer/millimeter) ⭐️*

**An super-basic, 96 line, anti-framework**

## Examples

- [Yet Another Todo App](/schalkventer/millimeter/yata)

## Code

Simply copy-and-paste the following into a JavaScript file:

```js
export const html = (staticArray, ...dynamic) => {
  const stringArray = staticArray || [];
  
  const array = (dynamic || []).map((singleDynamic, index) => {
    const singleDynamicString = Array.isArray(singleDynamic) ? singleDynamic.join('') : singleDynamic
    return `${stringArray[index] || ""}${singleDynamicString || ""}`;
  });

  const lastIndexStatic = stringArray.length - 1;
  return `${array.join("")}${stringArray[lastIndexStatic]}`;
};

/** @param {Record<string, boolean>} conditions */
export const classList = (conditions) => {
  const keys = Object.keys(conditions)
  const map = (isValid, index) => isValid && keys[index]
  return Object.values(conditions).map(map).filter(Boolean).join(' ')
}

export const router = (home, prefix) => {
  const array = window.location.hash.slice(1).split('/').filter(Boolean)
  const composites = array.reduce((result, value) => [`${result[0]}-${value}`, ...result], [prefix || 'path'])
  const componentName = composites.reduce((result, name) => result || !window.customElements.get(name) ? result : name, null)
  document.querySelector('[app]').innerHTML = html`<${componentName || home}></${componentName || home}>`
}

/**
 * @template {string} K
 * @template {string} A
 * @property {{Record<K, Record<string, (event: Event) => void | Promise<void>>>}} handlers
 * @property {{Record<K, HTMLElement[]>}} elements
 * @property {string[]} listeners
 * @property {() => string} render
 * @property {(type: string, any) => void} dispatch
 */
export class Millimeter extends HTMLElement {
  shadow = this.attachShadow({ mode: 'closed' })
  render = () => { throw new Error('"render" method is required') }

  /**
   * @param {Record<A, Record<string, (event: Event) => void | Promise<void>>>} [handlers]
   * @param {Record<K, (attribute: string) => any>} [handlers]
   */
  constructor(attributes, handlers) {
    super()

    this.data = Object.keys(attributes).reduce((result, key) => ({
      ...result,
      [key]: attributes[key](this.getAttribute(key)),
    }), {})

    this.handlers = handlers || {}
  }

  dispatch = (type, payload) => {
    this.dispatchEvent(new CustomEvent(type, { composed: true, bubbles: true, cancelable: true, detail: payload }));
  };

  callHandler = (event) => {
    if (event.type === 'submit') event.preventDefault()

    event.path.forEach(node => {
      const key = node.getAttribute && node.getAttribute('key')
      if (key && this.handlers[key] && this.handlers[key][event.type]) this.handlers[key][event.type](event)
    })
  }

  connectedCallback() {
    this.shadow.innerHTML = `<style>* { box-sizing: border-box }</style> ${this.render(this.data)}`

    const elements = Array
      .from(this.shadow.querySelectorAll('[key]'))
      .reduce((result, node) => ({ ...result, [node.getAttribute('key')]: node }), {})

    const listeners = Object.keys(elements).reduce((result, key) => {
      let innerListeners = []
      const obj = this.handlers[key];

      if (obj) Object.keys(obj).forEach((innerKey) => {
        if (!result.includes(innerKey)) { innerListeners = [...innerListeners, innerKey] }
      })

      return [...result, ...innerListeners]
    }, [])

    if (this.handlers.host && this.handlers.host.mount) this.handlers.host.mount(new Event('mount'))
    listeners.forEach((type) => this.shadow.addEventListener(type, this.callHandler))
    this.elements = elements
    this.listeners = listeners
  }

  disconnectedCallback() {
    if (this.handlers.host && this.handlers.host.unmount) this.handlers.host.mount(new Event('unmount'))
    this.listeners.forEach((type) => this.shadow.addEventListener(type, this.callHandler))
  }
}
```

## API

Millimeter makes a clear mental seperation between the following phases:
- The construction of the initial component state in the mount method
- -

initial component construction, based on a string returned by the `mount



- The `render` method only runs once and returns a string to build all HTML/inline CSS.
- Attributes on the host are only used once when the component mounts to create props on the host.
