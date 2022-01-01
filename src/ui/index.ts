import { H, Render } from "../virtual-dom";
// import type { Render } from "../virtual-dom";
export enum COMPONENT_THEME {
  "positive" = "positive",
  "negative" = "negative",
}
export interface ComponentProps {
  content: H;
  theme?: COMPONENT_THEME;
}
export type ID = string;
export interface Ids<T> {
  [key: ID]: T;
}

export class Ui<T extends ComponentProps> {
  #ids: Ids<T> = {};
  #id: string;
  readonly renderer = new Render(
    new H("div", undefined, { id: "ux-components" }),
    "body"
  );
  constructor(id: string) {
    this.#id = id;
  }

  #render() {
    this.renderer.updateElement(this.#template);
  }

  get #template() {
    const children = Object.entries(this.ids).map(
      ([id, props]) =>
        new H("div", [props.content], {
          "data-id": id,
        })
    );
    return new H("div", children, { id: this.#id });
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
  protected hide(id: string) {
    this.ids = { id };
  }
}
