import { useState, useEffect } from "react";
import { InputNumber, Select } from "antd";
import "./UnitConverter.css";

const { Option } = Select;

const UnitConverter = () => {
  const [fromUnit, setFromUnit] = useState("USD");
  const [toUnit, setToUnit] = useState("VND");
  const [inputValue, setInputValue] = useState(0);
  const [outputValue, setOutputValue] = useState(0);

  useEffect(() => {
    const convert = () => {
      if (fromUnit === "USD" && toUnit === "VND") {
        setOutputValue(inputValue * 23176.65);
      } else if (fromUnit === "VND" && toUnit === "USD") {
        setOutputValue(inputValue / 23176.65);
      } else if (fromUnit === "USD" && toUnit === "KRW") {
        setOutputValue(inputValue * 1173.52);
      } else if (fromUnit === "KRW" && toUnit === "USD") {
        setOutputValue(inputValue / 1173.52);
      } else if (fromUnit === "USD" && toUnit === "JPY") {
        setOutputValue(inputValue * 110.66);
      } else if (fromUnit === "JPY" && toUnit === "USD") {
        setOutputValue(inputValue / 110.66);
      } else {
        setOutputValue(inputValue);
      }
    };

    convert();
  }, [fromUnit, toUnit, inputValue]);

  const handleInputValueChange = (value) => {
    setInputValue(value);
  };

  const handleFromUnitChange = (value) => {
    setFromUnit(value);
  };

  const handleToUnitChange = (value) => {
    setToUnit(value);
  };

  return (
    <div className="unit-converter">
      <div className="input-container">
        <InputNumber
          className="input"
          value={inputValue}
          onChange={handleInputValueChange}
        />
        <Select
          className="select"
          value={fromUnit}
          onChange={handleFromUnitChange}
        >
          <Option value="USD">USD</Option>
          <Option value="VND">VND</Option>
          <Option value="KRW">KRW</Option>
          <Option value="JPY">JPY</Option>
        </Select>
        <span className="arrow">&#8594;</span>
        <Select className="select" value={toUnit} onChange={handleToUnitChange}>
          <Option value="USD">USD</Option>
          <Option value="VND">VND</Option>
          <Option value="KRW">KRW</Option>
          <Option value="JPY">JPY</Option>
        </Select>
      </div>

      <p className="result">
        {outputValue !== null && outputValue !== undefined
          ? outputValue.toFixed(2)
          : ""}
      </p>
    </div>
  );
};

export default UnitConverter;
