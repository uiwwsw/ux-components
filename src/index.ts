import Dialog from "./ui/dialog";
import Toast from "./ui/toast";
import { Render } from "./virtual-dom";
// import "./ui/dialog/style.scss";
// import Toast from "./ui/toast";
// const t = new Toast("#ux-toast");
const d22 = new Toast("ux-toast");
const d = new Dialog("ux-dialog");
// t.show({
//   message: "23123123123",
// });
// const ee = d.show({ message: "매셎;111" });
// console.log(document.getElementById("ddd"));
document.getElementById("ddd2").onclick = () =>
  d22.show({ message: "매셎2312323123;" });
document.getElementById("ddd").onclick = () =>
  d.show({ message: "매셎2312323123;" });
// const id = d.show({
//   message: "dwdad",
// });
// const id2 = d.show({
//   message: "dwda11d",
// });
// const dwdw = d.hide(id);
// d.hide(id);
