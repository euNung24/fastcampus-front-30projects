function BMICalculator() {
  const formEl = document.querySelector(".bmi-calculator-wrapper form");
  const resultEl = formEl.querySelector(".result");
  const resultStateEl = resultEl.querySelector(".state span");

  const onSubmit = (e) => {
    const { target } = e;
    e.preventDefault();
    const height = target.height.value;
    const weight = target.weight.value;

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
      alert("적절한 값이 아닙니다.");
      return;
    }
    let bmiValue = parseFloat((weight / (height * height)).toFixed(2));
    let state = "정상";
    let isCommonValue = true;
    if (bmiValue < 18.5) {
      state = "저체중";
      isCommonValue = false;
    } else if (bmiValue >= 23) {
      state = "과체중";
      isCommonValue = false;
    }

    resultEl.querySelector(".bmi-value span").textContent = bmiValue.toString();
    resultEl.querySelector("meter").value = bmiValue;
    resultStateEl.textContent = state;
    isCommonValue && resultStateEl.classList.add("caution");
    resultEl.classList.add("show");
  };

  const onReset = (e) => {
    resultEl.classList.remove("show");
  };

  formEl.addEventListener("submit", onSubmit);
  formEl.addEventListener("reset", onReset);
}

BMICalculator();
