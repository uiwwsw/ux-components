import { H, Render } from "../virtual-dom";
import { COMPONENT_THEME, ComponentProps, Ui } from "./index";
export default class Dialog extends Ui<ComponentProps> {
  readonly renderer = new Render(
    new H("div", undefined, { id: "ux-dialog" }),
    "#ux-components"
  );
  constructor(id: string) {
    super(id);
  }

  show({ message, header }: { message: string; header?: string }) {
    const h = new H(
      "div",
      [
        new H("div", [header], { class: "ux-dialog__header" }),
        new H("div", [message], { class: "ux-dialog__content" }),
      ],
      { class: "ux-dialog" }
    );
    return super._show({ content: h });
  }
  hide(id: string) {
    super._hide(id);
  }
}
