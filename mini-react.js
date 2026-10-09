// mini-react.js

/**
 * Tạo VNode dạng Text
 */
export function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

/**
 * Tạo Virtual DOM Node (VNode)
 */
export function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...(props || {}),
      children: children.flat().map((child) =>
        typeof child === 'object' ? child : createTextElement(child)
      ),
    },
  };
}