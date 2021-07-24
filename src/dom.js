window.dom = {
  //创建一个节点
  create(string) {
    const container = document.createElement("template");
    container.innerHTML = string.trim();
    return container.content.firstChild;
  },
  //在已知节点之后插入一个节点
  after(node, node2) {
    node.parentNode.insertBefore(node2, node.nextSibling);
  },
  //在已知节点之前插入一个节点
  before(node, node2) {
    node.parentNode.insertBefore(node2, node);
  },
  //给已知节点加一个子节点
  append(parent, node) {
    parent.appendChild(node);
  },
  //给已知节点加一个父节点
  wrap(node, parent) {
    dom.before(node, parent);
    dom.append(parent, node);
  },
  //删除节点
  remove(node) {
    node.parentNode.removeChild(node);
    return node; //保留它的引用,返回移除的对象
  },
  //删除后代
  empty(node) {
    //node.innerHTML = ''  删的人不能得到node的引用
    //const childNodes = node.childNodes;
    const { childNodes } = node; //上式的简写
    const array = [];
    let x = node.firstChild;
    while (x) {
      dom.remove(x);
      array.push(x);
      x = node.firstChild;
    }
    return array;
  },
  //用于读写属性
  attr(node, name, value) {
    //重载
    if (arguments.length === 3) {
      node.setAttribute(name, value);
    } else if (arguments.length === 2) {
      return node.getAttribute(name);
    }
  },
  //用于读写文本内容
  text(node, string) {
    //适配
    if (arguments.length === 2) {
      if ("innerText" in node) {
        node.innerText = string;
      } else {
        node.textContent = string;
      }
    } else if (arguments.length === 1) {
      if ("innerText" in node) {
        return node.innerText;
      } else {
        return node.contentText;
      }
    }
  },
  //用于读写html内容
  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string;
    } else if (arguments.length === 1) {
      return node.innerHTML;
    }
  },
  //用于修改style
  style(node, name, value) {
    //dom.style(test,"border","1px solid red")
    if (arguments.length === 3) {
      node.style[name] = value;
    } else if (arguments.length === 2) {
      //dom.style(test,"border")
      if (typeof name === "string") {
        return node.style[name];
      } else if (name instanceof Object) {
        //dom.style(test,{color:"red"})
        for (let key in name) {
          node.style[key] = name[key];
        }
      }
    }
  },
  //用于添加,删除，查找class
  class: {
    add(node, className) {
      node.classList.add(className);
    },
    remove(node, className) {
      node.classList.remove(className);
    },
    has(node, className) {
      return node.classList.contains(className);
    },
  },
  //添加，移除事件
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },
  //查找一个节点
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector);
  },
  //查一个节点的父节点
  parent(node) {
    return node.parentNode;
  },
  //查一个节点的子节点
  children(node) {
    return node.children;
  },
  //查一个节点的兄弟姐妹
  siblings(node) {
    return Array.from(node.parentNode.children).filter((n) => n !== node);
  },
  //查一个节点的弟弟
  next(node) {
    let x = node.nextSibling;
    while (x && x.nodeType === 3) {
      x = x.nextSibling;
    }
    return x;
  },
  //查一个节点的哥哥
  previous(node) {
    let x = node.previousSibling;
    while (x && x.nodeType === 3) {
      x = x.previousSibling;
    }
    return x;
  },
  //遍历所有节点
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]);
    }
  },
  //获取排行第几
  index(node) {
    const list = dom.children(node.parentNode);
    let i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break;
      }
    }
    return i;
  },
};
