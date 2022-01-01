import { H, Render } from "../virtual-dom";
import { ComponentProps, Ui } from "./index";
export default class Dialog extends Ui<ComponentProps> {
  readonly renderer = new Render(
    new H("div", undefined, { id: "ux-dialog" }),
    "#ux-components"
  );
  constructor(id: string) {
    super(id);
  }

  show({ message, header }: { message: string; header?: string }) {
    const id = this.uuid();
    const h = new H(
      "div",
      [
        new H("div", [header], { class: "ux-dialog__header" }),
        new H("div", [message], { class: "ux-dialog__content" }),
        new H(
          "div",
          [
            new H("button", ["닫기"], undefined, {
              onclick: () => this.hide(id),
            }),
          ],
          {
            class: "ux-dialog__footer",
          }
        ),
      ],
      { class: "ux-dialog" }
    );
    return super._show(id, { content: h });
  }
}
