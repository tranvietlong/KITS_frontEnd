import { Space } from "antd";
import "../Calc.css";

const index = (props) => {
  const { children, result } = props;
  return (
    <Space className="noGap" style={styles.display} direction="vertical">
      <Space>{children}</Space>
      <Space>{result}</Space>
    </Space>
  );
};

const styles = {
  display: {
    width: 200,
    border: "1px solid #ccc",
    padding: "10px",
    textAlign: "end",
  },
};

export default index;
