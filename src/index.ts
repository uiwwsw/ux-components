import Dialog from "./ui/dialog";
import Toast from "./ui/toast";
// import "./ui/dialog/style.scss";
// import Toast from "./ui/toast";
const t = new Toast();
// const components =

// const d22 = new Toast("ux-toast");
const d = new Dialog();
d.show({ message: "dajwkdlaw" });
d.show({ message: "dajwkdlaw" });
d.show({ message: "dajwkdlaw" });
// d.show({ message: "dajwkd4323law" });
// t.show({
//   message: "23123123123",
// });
// const ee = d.show({ message: "매셎;111" });
// console.log(document.getElementById("ddd"));
document.getElementById("ddd2").onclick = () =>
  d.show({ message: "매셎2312323123;" });
document.getElementById("ddd").onclick = () =>
  t.show({ message: "매셎2312323123;" });
// const id = d.show({
//   message: "dwdad",
// });
// const id2 = d.show({
//   message: "dwda11d",
// });
// const dwdw = d.hide(id);
// d.hide(id);
