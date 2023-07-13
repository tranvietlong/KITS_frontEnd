import { Button } from "antd";

const index = (props) => {
  const { value, width, onclick, highlighted } = props;
  
  return (
    <Button
      style={{
        width: `${width ? width * 50 : 50}px`,
        borderColor: `${highlighted ? 'black' : '#ccc'}`,
        ...styles.calcButton
      }}
      className={styles.calcButton}
      onClick={onclick}
    >
      {value}
    </Button>
  );
};

const styles = {
  calcButton: {
    height: 50,
    textAlign: "center",
    borderRadius: 0,
  }
}


export default index;
