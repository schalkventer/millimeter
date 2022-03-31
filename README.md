# 📏 Millimeter

*⭐️ If you find this useful please star it on [Github](https://github.com/schalkventer/millimeter) ⭐️*

**An insanely small 96-LOC anti-framework**

## Examples

- [Yet Another Todo App](/schalkventer/millimeter/yata)

## Usages

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

export const calcView = () => {
  const array = window.location.hash.slice(1).split('/').filter(Boolean)
  const composites = array.reduce((result, value) => [`${result[0]}-${value}`, ...result], ['app-view'])

  const componentName = composites.reduce(
    (result, name) => result || !window.customElements.get(name) ? result : name, 
    null
  )

  return [componentName, array]
}

/**
 * @property {{Record<string, Record<string, (event: Event) => void | Promise<void>>>}} handlers
 * @property {{Record<string, HTMLElement[]>}} elements
 * @property {string[]} listeners
 * @property {() => string} render
 * @property {(type: string, any) => void} dispatch
 */
export class Millimeter extends HTMLElement {
  shadow = this.attachShadow({ mode: 'closed' })
  render = () => { throw new Error('"render" method is required') }

  /** @param {Record<string, Record<string, (event: Event) => void | Promise<void>>>} [handlers] */
  constructor(handlers) {
    super()
    this.handlers = handlers || {}
  }

  dispatch = (type, payload) => {
    this.dispatchEvent(
      new CustomEvent(type, {
        composed: true,
        bubbles: true,
        cancelable: true,
        detail: payload,
      })
    );
  };

  callHandler = (event) => {
    if (event.type === 'submit') event.preventDefault()

    event.path.forEach(node => {
      const key = node.getAttribute && node.getAttribute('key')
      if (!key || !this.handlers[key] || !elementHandlers[event.type]) return
      elementHandlers[event.type](event)
    })
  }

  connectedCallback() {
    let listeners = []
    this.shadow.innerHTML = `<style>* { box-sizing: border-box }</style> ${this.render()}`

    const elements = Array
      .from(this.shadow.querySelectorAll('[key]'))
      .reduce((result, node) => ({...result, [node.getAttribute('key')]: node }), {})

    Object.keys(elements).forEach((result, key) => {
      if (!this.handlers[key]) return

      Object.keys().forEach((innerKey) => {
        if (result.includes(innerKey)) return
        this.listeners.push(innerKey)
      })
    })

    this.elements = elements
    this.listeners = listeners
    if (this.handlers.host && this.handlers.host.mount) this.handlers.host.mount(new Event('mount'))
    this.listeners.forEach((type) => this.shadow.addEventListener(type, this.callHandler))
  }

  disconnectedCallback() {
    if (this.handlers.host && this.handlers.host.unmount) this.handlers.host.mount(new Event('unmount'))
    this.listeners.forEach((type) => this.shadow.addEventListener(type, this.callHandler))
  }
}
```
