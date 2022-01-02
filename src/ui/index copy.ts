import { H, Render } from "../virtual-dom";

export interface ComponentProps {
  content: H;
}
export interface Ids<T> {
  [key: string]: T;
}

export class Ui<T extends ComponentProps> {
  #ids: Ids<T> = {};
  protected id: string;
  readonly renderer: Render;
  constructor(id: string) {
    this.id = id;
  }

  #render() {
    this.renderer.updateElement(this.#template);
  }

  get #template() {
    const children = Object.entries(this.ids).map(
      ([_, props]) => props.content
    );
    return new H("div", children, { id: this.id });
  }

  protected set ids({ id, props }: { id?: string; props?: T }) {
    if (props) this.#ids[id] = props;
    else delete this.#ids[id];
    this.#render();
  }
  protected get ids(): Ids<T> {
    return this.#ids;
  }
  protected uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
  protected _show(id: string, props: T) {
    this.ids = { id, props };
    return id;
  }
  hide(id: string) {
    this.ids = { id };
  }
}
