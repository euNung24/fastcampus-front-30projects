function BMICalculator() {
  const formEl = document.querySelector(".bmi-calculator-wrapper form");

  const onSubmit = (e) => {
    const { target } = e;
    e.preventDefault();
    const height = target.height.value;
    const weight = target.weight.value;

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
      alert("적절한 값이 아닙니다.");
      return;
    }
  };
  formEl.addEventListener("submit", onSubmit);
}

BMICalculator();
