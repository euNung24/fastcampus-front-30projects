import "../css/style.css";

console.log("hi");

let a = 1;

let b = 2;

let c = ["123", "456"];
let f = [...c].map((v) => v + "1");

console.log(a + b);
console.log(c, f);
const abc = (a: number, b: number) => a - b;
