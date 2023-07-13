import { useState } from "react";
import { Space, Typography, Input, message } from "antd";
import Board from "./board";

const { Title } = Typography;

const Chessboard = () => {
  const [size, setSize] = useState(4);
  const [colorOdd, setColorOdd] = useState("#C0C0C0");
  const [colorEven, setColorEven] = useState("#000000");
  const [isFlip, setIsFlip] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const flip = () => {
    setIsFlip(!isFlip);
    if (isFlip) {
      setColorEven(colorOdd);
      setColorOdd(colorEven);
    }
  };

  const handleInputBoard = (e) => {
    let val = e.target.value;
    if (val >= 1 && val <= 25) {
      setSize(Number(val));
    } else if (val > 25 && val < 1) {
      messageApi.open({
        type: "error",
        content: "Out of input range 1 -> 25",
      });
    }
  };

  const alertInfor = () => {
    messageApi.open({
      type: "infor",
      content: "Input Board range is 1 -> 25",
    });
  };

  return (
    <Space style={styles.container}>
      {contextHolder}
      <Space>
        <Space>
          <Title style={styles.title} level={5}>
            Chessboard matrix:{" "}
          </Title>
          <Input
            style={styles.input}
            type="number"
            placeholder="4"
            onChange={handleInputBoard}
            onFocus={alertInfor}
          />
        </Space>

        <Space>
          <Title style={styles.title} level={5}>
            Cell odd:{" "}
          </Title>
          <Input
            style={styles.input}
            type="color"
            id="head"
            name="head"
            value={colorOdd}
            onChange={(e) => setColorOdd(e.target.value)}
          ></Input>
        </Space>

        <Space>
          <Title style={styles.title} level={5}>
            Cell even:{" "}
          </Title>
          <Input
            style={styles.input}
            type="color"
            id="head"
            name="head"
            value={colorEven}
            onChange={(e) => setColorEven(e.target.value)}
          ></Input>
        </Space>
      </Space>

      <Space style={styles.board}>
        <Board
          size={size}
          colorOdd={colorOdd}
          colorEven={colorEven}
          isFlip={flip}
        />
      </Space>
    </Space>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    lineHeight: 0,
  },
  title: {
    width: 200,
    textAlign: "end",
  },
  input: {
    width: 100,
  },
  board: {
    marginTop: 20,
  },
};

export default Chessboard;
