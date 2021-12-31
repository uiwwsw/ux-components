type Props = {
  [Key: string]: string;
};
type TH = string | H;
type Children = (H | string)[];
export class H {
  id: string;
  tag: string;
  props: Props;
  children: Children;
  constructor(tag: string, children?: Children, props?: Props) {
    this.tag = tag;
    this.children = (children || []).filter((x) => x);
    this.props = props || {};
  }
}
export class Render {
  #h: H;
  #$rootSelector: Element;
  constructor(h: H, rootSelector: string) {
    this.#h = h;
    this.#$rootSelector = document.querySelector(rootSelector);
    this.#$rootSelector.appendChild(this.createElement(this.#h));
  }

  createElement(h: TH) {
    if (typeof h === "string") return document.createTextNode(h);

    // tag에 대한 element를 만든다.
    const $el = document.createElement(h.tag);

    // 정의한 속성을 삽입한다.
    Object.entries(h.props)
      .filter(([_, value]) => value)
      .forEach(([attr, value]) => $el.setAttribute(attr, value));

    // node의 children virtual dom을 dom으로 변환한다.
    // 즉, 모든 VirtualDOM을 순회한다.
    h.children.forEach((child) => {
      const element = this.createElement(child);
      element && $el.appendChild(element);
    });

    // 변환된 dom을 반환한다.
    return $el;
  }
  updateAttributes(target: Element, newProps: Props, oldProps: Props) {
    // 달라지거나 추가된 Props를 반영
    for (const [attr, value] of Object.entries(newProps)) {
      if (oldProps[attr] === value) continue;
      target.setAttribute(attr, value);
    }

    // 없어진 props를 attribute에서 제거
    for (const attr of Object.keys(oldProps)) {
      if (newProps[attr] !== undefined) continue;
      target.removeAttribute(attr);
    }
  }
  updateElement(
    newNode: TH,
    oldNode: TH = this.#h,
    parent: Element = this.#$rootSelector,
    index = 0
  ) {
    // console.log("new", newNode);
    // console.log("old", oldNode);
    // console.log(
    //   newNode.children,
    //   oldNode.children,
    //   parent,
    //   "djkalwdjlakwjdlawdawda11111"
    // );
    if (!newNode && oldNode)
      return parent.removeChild(parent.childNodes[index]);
    if (newNode && !oldNode) {
      return parent.appendChild(this.createElement(newNode));
    }

    if (typeof newNode === "string" || typeof oldNode === "string") {
      if (newNode === oldNode) return;
      return parent.replaceChild(
        this.createElement(newNode),
        parent.childNodes[index]
      );
    }
    if (newNode.tag !== oldNode.tag) {
      return parent.replaceChild(
        this.createElement(newNode),
        parent.childNodes[index]
      );
    }

    this.updateAttributes(parent, newNode.props, oldNode.props);

    const maxLength = Math.max(
      newNode.children.length,
      oldNode.children.length
    );

    for (let i = 0; i < maxLength; i++) {
      //   console.log(
      //     JSON.stringify(parent),
      //     JSON.stringify(parent.children[i]),
      //     i,
      //     "ㅗ히오히"
      //   );
      this.updateElement(
        newNode.children[i] || "",
        oldNode.children[i] || "",
        parent.children[index],
        i
      );
    }
    this.#h = newNode;
    // const b = a(this.rootSelector, this.h, newNode);
    // console.log(b);
  }
}
// export const Node = (tag: string, children?: Children, props?: Props) => ({
//   tag,
//   children,
//   props,
// });
