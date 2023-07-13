import { useState } from "react";
import { Space, message } from "antd";
import Display from "./Display";
import Button from "./Button";
import "./Calc.css";

function Calculator() {
  const [operands, setOperands] = useState([]);
  const [_operator, setOperator] = useState(null);
  const [displayValue, setDisplayValue] = useState("");
  const [displayResult, setDisplayResult] = useState("0");
  const [messageApi, contextHolder] = message.useMessage();

  const setValue = (value) => setDisplayValue(`${displayValue}${value}`);

  const error = () => {
    messageApi.open({
      type: "error",
      content: "Error: Missing operand",
    });
  };

  const evaluate = (operands, operator) => {
    if (operands.length < 2 || operator === null) {
      console.error("Invalid operator or operand");
      setDisplayValue("");
      setDisplayResult("0");
      return error();
    }
    switch (operator) {
      case "+":
        return operands[0] + operands[1];
      case "-":
        return operands[0] - operands[1];
      case "*":
        return operands[0] * operands[1];
      case "/":
        return operands[0] / operands[1];
    }
  };

  const changeSigh = () => {
    if (displayValue == 0) {
      return;
    }
    if (displayValue > 0) {
      setDisplayValue(-displayValue);
    } else {
      setDisplayValue(Math.abs(displayValue));
    }
  };

  const handleDecimalClick = () => {
    if (displayValue === "") {
      setDisplayValue("0.");
    } else if (!displayValue.includes(".")) {
      setDisplayValue(displayValue + ".");
    }
  }

  const handlePercentageClick = () => {
    if (displayValue != "") {
      let percentage = displayValue / 100;
      setDisplayValue(percentage);
    }
  }

  const operatorButtonClick = (operator) => {
    if (operands.length < 1) {
      setOperator(operator);
      operands.push(+displayValue);
      setDisplayValue("");
    } else if (operands.length < 2) {
      operands.push(+displayValue);
      let result = evaluate(operands, _operator);
      operands.length = 0;
      operands.push(+result);
      setOperator(operator);
      setDisplayValue("");
      setDisplayResult(result);
    } else {
      setOperator(operator);
    }
  };

  const equalButtonClick = () => {
    operands.push(+displayValue);
    let result = evaluate(operands, _operator);
    operands.length = 0;
    operands.push(+result);
    setDisplayValue("");
    setDisplayResult(result);
  };

  const calcButton = [
    {
      value: "AC",
      onclick: () => {
        setDisplayValue(""),
          setDisplayResult("0"),
          setOperands([]),
          setOperator(null);
      },
    },
    { value: "±", onclick: () => changeSigh() },
    {
      value: "%", onclick: () => handlePercentageClick()
    },
    {
      value: "÷",
      onclick: () => operatorButtonClick("/"),
      highlighted: _operator === "/" ? true : false,
    },
    { value: 7, onclick: () => setValue(7) },
    { value: 8, onclick: () => setValue(8) },
    { value: 9, onclick: () => setValue(9) },
    {
      value: "x",
      onclick: () => operatorButtonClick("*"),
      highlighted: _operator === "*" ? true : false,
    },
    { value: 4, onclick: () => setValue(4) },
    { value: 5, onclick: () => setValue(5) },
    { value: 6, onclick: () => setValue(6) },
    {
      value: "-",
      onclick: () => operatorButtonClick("-"),
      highlighted: _operator === "-" ? true : false,
    },
    { value: 1, onclick: () => setValue(1) },
    { value: 2, onclick: () => setValue(2) },
    { value: 3, onclick: () => setValue(3) },
    {
      value: "+",
      onclick: () => operatorButtonClick("+"),
      highlighted: _operator === "+" ? true : false,
    },
    { value: 0, width: 2, onclick: () => setValue(0) },
    { value: ",", onclick: () => handleDecimalClick() },
    { value: "=", onclick: () => equalButtonClick() },
  ];

  return (
    <Space
      direction="horizontal"
      align="start"
      italic="true"
    >
      {contextHolder}
      <Space direction="vertical" className="noGap">
        <Display result={displayResult}>{displayValue}</Display>
        <Space className="noGap" style={styles.btn} wrap>
          {calcButton.map((item, idx) => {
            return (
              <Button
                key={idx}
                width={item.width}
                value={item.value}
                onclick={item.onclick}
                highlighted={item.highlighted}
              ></Button>
            );
          })}
        </Space>
      </Space>
    </Space>
  );
}

const styles = {
  title: {
    textAlign: "center",
  },
  btn: {
    width: 220,
  },
};

export default Calculator;
