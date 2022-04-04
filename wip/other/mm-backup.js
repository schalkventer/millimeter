export const html = (staticArray, ...dynamic) => {
  const stringArray = staticArray || [];
  const array = (dynamic || []).map((singleDynamic, index) => {
    return `${stringArray[index] || ""}${singleDynamic || ""}`;
  });

  const lastIndexStatic = stringArray.length - 1;
  return `${array.join("")}${stringArray[lastIndexStatic]}`;
};

/**
 * @typedef {Record<string, Record<string, (CustomEvent) => void | Promise<void>} handlersObj
 */

/**
 * @typedef {object} handlerProps
 * @property {Record<string, HTMLElement>} elements
 * @property {(type: string, payload: Record<string, any>) => void} dispatch
 */

/**
 * @param {string} name
 * @param {(node: HTMLElement) => string} init
 * @param {handlersObj | (props: handlerProps) => handlersObj} handlers
 */
export const createComponent = (name, init, handlers = {}) => {
  if (!name) throw new Error('"name" is required');
  if (!/\-/.test(name)) throw new Error('"name" requires a hypen ("-") in the value.');

  const elementsList = Object.keys(handlers).filter((value) => value !== "root");

  const elementsEventObj = elementsList.reduce((result, elementName) => {
    return {
      ...result,
      ...handlers[elementName],
    };
  }, {});

  const eventsList = Object.keys(elementsEventObj);

  class Component extends HTMLElement {
    shadow = this.attachShadow({ mode: "closed" });
    elements = { shadow: this.shadow, host: this };
     constructor() { 
      super() 
      this.trigger = this.trigger.bind(this)
    }

    dispatch = (type, payload) => this.dispatchEvent(
      new CustomEvent(type, {
        composed: true,
        bubbles: true,
        cancelable: true,
        detail: payload,
      })
    );

    /**
     * @param {string} type
     * @param {object} [any]
     */
    trigger = (type, payload) => {
      if (!handlers.triggers && !handlers.triggers[type]) return

      const event = new CustomEvent(type, {
        composed: true,
        bubbles: true,
        cancelable: true,
        detail: payload,
      })

      handlers.triggers[type]({ elements: this.elements, dispatch: this.dispatch, event })
    }

    handlerWrapper = (event) => {
      const { target = {}, type } = event;
      const { key } = target.dataset || {};
      const element = handlers[key] || {};
      const callback = element[type];
      if (!key || !callback) return;
      callback({ elements: this.elements, dispatch: this.dispatch, event });
    };

    connectedCallback() {
      this.shadow.innerHTML = init(this);
      const keyNodes = Array.from(this.shadow.querySelectorAll("[data-key]"));

      this.elements = keyNodes.reduce(
        (result, node) => {
          const { key } = node.dataset;
          if (handlers[key] && handlers[key].render) handlers[key].render(node);
          return { ...result, [key]: node };
        },
        { shadow: this.shadow, host: this }
      );

      if (handlers.host && handlers.host.connect) {
        handlers.host.connect({ elements: this.elements, dispatch: this.dispatch,  event: {} });
      }

      eventsList.forEach((eventType) => {
        this.shadow.addEventListener(eventType, this.handlerWrapper);
      });
    }

    disconnectedCallback() {
      if (handlers.host && handlers.host.disconnect) {
        handlers.host.disconnect({ elements: this.elements, dispatch: this.dispatch, event: {} });
      }

      eventsList.forEach((eventType) => {
        this.shadow.removeEventListener(eventType, this.handlerWrapper);
      });
    }
  }

  customElements.define(name, Component);
};