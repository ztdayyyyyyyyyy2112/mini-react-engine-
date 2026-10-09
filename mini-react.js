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

/**
 * Chuyển đổi VNode thành DOM Node thực tế và gắn thuộc tính/sự kiện
 */
export function renderToDOM(vnode) {
  if (!vnode) return null;

  // 1. Tạo DOM Node tương ứng
  const dom =
    vnode.type === 'TEXT_ELEMENT'
      ? document.createTextNode(vnode.props.nodeValue || '')
      : document.createElement(vnode.type);

  // 2. Gán các thuộc tính (Props) và Event Listeners
  if (vnode.props) {
    Object.keys(vnode.props)
      .filter((key) => key !== 'children')
      .forEach((name) => {
        if (name.startsWith('on')) {
          // Xử lý sự kiện (VD: onClick -> click)
          const eventType = name.toLowerCase().substring(2);
          dom.addEventListener(eventType, vnode.props[name]);
        } else if (name === 'className') {
          // Xử lý class attribute
          dom.className = vnode.props[name];
        } else {
          // Xử lý các thuộc tính HTML khác (id, role, ...)
          dom.setAttribute(name, vnode.props[name]);
        }
      });

    // 3. Render đệ quy các node con và chèn vào DOM cha
    vnode.props.children.forEach((childVNode) => {
      const childDOM = renderToDOM(childVNode);
      if (childDOM) {
        dom.appendChild(childDOM);
      }
    });
  }

  return dom;
}