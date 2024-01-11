function Calculator(wrapperEl) {
  const inputEl = wrapperEl.querySelector("input");
  const keysEl = wrapperEl.querySelector(".keys");

  let left = "";
  let right = "";
  let oper = "";
  let result = "";

  const setInputValue = () => {
    let value = "";
    if (left === "") {
      return;
    }
    value += left;
    inputEl.value = value;

    if (!/\d/.test(left) || oper === "") {
      return;
    }
    value += ` ${oper}`;
    inputEl.value = value;

    if (right === "") {
      return;
    }
    value += ` ${right}`;
    inputEl.value = value;

    if (!/\d/.test(right) || result === "") {
      return;
    }
    value += ` = ${result}`;
    inputEl.value = value;
  };

  const inputNum = (num) => {
    if (!oper) {
      if (parseInt(num, 10) === 0 && parseInt(left, 10) === 0) {
        return;
      }
      left = left !== "" ? left + num : num;
    } else {
      if (parseInt(num, 10) === 0 && parseInt(right, 10) === 0) return;
      right = right !== "" ? right + num : num;
    }
  };

  const inputEqual = () => {
    switch (oper) {
      case "+":
        result = parseInt(left, 10) + parseInt(right, 10);
        break;
      case "-":
        result = parseInt(left, 10) - parseInt(right, 10);
        break;
      case "*":
        result = parseInt(left, 10) * parseInt(right, 10);
        break;
      case "/":
        result = parseInt(left, 10) / parseInt(right, 10);
        break;
      case "=":
        left = result;
        right = "";
        oper = "";
        result = "";
        break;
      default:
        break;
    }
  };

  const inputOper = (op) => {
    if (op === "=") {
      /\d/.test(right) && inputEqual();
    } else if (!/\d/.test(left) && op === "-") {
      left = "-";
    } else if (!/\d/.test(right) && oper && op === "-") {
      right = "-";
    } else {
      oper = op;
    }
  };

  const onClickKey = (e) => {
    const { target } = e;
    if (!target.classList.contains("btn")) {
      return;
    }
    const value = e.target.textContent;
    if (/\d/.test(value)) {
      inputNum(value);
    } else {
      inputOper(value);
    }
    setInputValue();
    // set Second Equal flow
    if (/=/.test(value) && /\d/.test(right)) {
      oper = "=";
    }
  };

  keysEl.addEventListener("click", onClickKey);
}

Calculator(document.querySelector(".calculator-wrapper"));
