import "./style.scss";
import { H, Render } from "../../virtual-dom";
import { ComponentProps, Ui } from "../index";
interface DialogProps {
  message: string;
  header?: string;
  theme?: string;
}
interface DialogComponentProps extends ComponentProps, DialogProps {}
export default class Toast extends Ui<DialogComponentProps> {
  readonly renderer = new Render(
    new H("div", undefined, { id: this.id }),
    "#ux-components"
  );

  show(props: DialogProps) {
    const id = this.uuid();
    const h = new H(
      "div",
      [
        new H("div", [props.header], { class: "ux-dialog__header" }),
        new H("div", [props.message], { class: "ux-dialog__content" }),
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
    return super._show(id, { ...props, content: h });
  }
}
