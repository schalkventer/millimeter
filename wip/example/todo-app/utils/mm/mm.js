export const html = (staticArray, ...dynamic) => {
  const stringArray = staticArray || [];
  const array = (dynamic || []).map((singleDynamic, index) => {
    return `${stringArray[index] || ""}${singleDynamic || ""}`;
  });

  const lastIndexStatic = stringArray.length - 1;
  return `${array.join("")}${stringArray[lastIndexStatic]}`;
};

/**
 * @typedef {object} props 
 * @property {string} name 
 * @property {string | ((host: HTMLElement) => string)} template
 */

/**
 * @param {props} props
 */
export const createComponent = (props) => {
  const { name, template } = props;

  if (!name) throw new Error('"name" is required');

  if (!/\-/.test(name))
    throw new Error('"name" requires a hypen ("-") in the value.');

    const initHandlers = (handlers = {}) => {
        const elements = handlers.elements || {}
        const host = handlers.host || {}
        const elementsList = Object.keys(elements)
        
          const elementsEventObj = elementsList.reduce((result, elementName) => {
            return {
              ...result,
              ...elements[elementName],
            };
          }, {});
        
          const eventsList = Object.keys(elementsEventObj);
        
          class Component extends HTMLElement {
            shadow = this.attachShadow({ mode: "closed" });
            elements = { host: this };
        
            constructor() {
              super();
              this.dispatch = this.dispatch.bind(this)
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

            set(key, value) {
              if (host && host[type]) {
                const event = new CustomEvent(type, {
                  composed: true,
                  bubbles: true,
                  cancelable: true,
                  detail: payload,
                })
                host[type]({ elements: this.elements, dispatch: this.dispatch, event })
              }
            }
        
            handlerWrapper = (event) => {
              const { target, type } = event;
              const { dataset = {} } = target || {};
              const { key, listenKey } = dataset;
              const element = elements[key || listenKey] || {};
              const callback = element[type];
              if (!callback) return

              callback({ elements: this.elements, dispatch: this.dispatch, event });
            };
        
            connectedCallback() {
              this.shadow.innerHTML = `<style>* { box-sizing: border-box }</style> ${typeof template === 'function' ? template(this) : template}`;
              const keyNodes = Array.from(this.shadow.querySelectorAll("[data-key]"));
        
              this.elements = keyNodes.reduce(
                (result, node) => {
                  const { key } = node.dataset;

                  if (elements[key] && elements[key].render) {
                    elements[key].render({ 
                      elements: { [key]: node }, 
                      dispatch: this.dispatch, 
                      event: {} 
                    })
                  }
        
                  return {
                    ...result,
                    [key]: node,
                  };
                },
                { host: this }
              );
        
              if (host && host.connect) {
                host.connect({ elements: this.elements, dispatch: this.dispatch, event: {} });
              }
        
              eventsList.forEach((eventType) => {
                this.shadow.addEventListener(eventType, this.handlerWrapper);
              });
            }
        
            disconnectedCallback() {
              if (host && host.disconnect) {
                host.disconnect({ elements: this.elements, dispatch: this.dispatch, event: {} });
              }
        
              eventsList.forEach((eventType) => {
                this.shadow.removeEventListener(eventType, this.handlerWrapper);
              });
            }
          }
        
          customElements.define(name, Component);
    }

    return initHandlers
};
