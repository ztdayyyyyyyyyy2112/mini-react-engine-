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
/**
 * Chuyển đổi VNode thành DOM Node thực tế và gắn thuộc tính/sự kiện
 */
export function renderToDOM(vnode) {
  if (!vnode) return null;

  // 1. Xử lý Text Node riêng biệt
  if (vnode.type === 'TEXT_ELEMENT') {
    return document.createTextNode(vnode.props.nodeValue || '');
  }

  // 2. Tạo Element Node (main, header, h1, p, button, ...)
  const dom = document.createElement(vnode.type);

  // 3. Gán các thuộc tính (Props) và Event Listeners cho Element
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
          // Xử lý các thuộc tính HTML thông thường (id, role, ...)
          dom.setAttribute(name, vnode.props[name]);
        }
      });

    // 4. Render đệ quy các node con và chèn vào DOM cha
    if (Array.isArray(vnode.props.children)) {
      vnode.props.children.forEach((childVNode) => {
        const childDOM = renderToDOM(childVNode);
        if (childDOM) {
          dom.appendChild(childDOM);
        }
      });
    }
  }

  return dom;
}
