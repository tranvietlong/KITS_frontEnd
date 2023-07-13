import Row from "../row";
import PropTypes from "prop-types";

const Board = (props) => {
  const rows = [];
  for (let i = 0; i < props.size; i++) {
    rows.push(i);
  }

  return rows.map((row, index) => {
    return (
      <Row
        key={index}
        row={row}
        size={props.size}
        colorOdd={props.colorOdd}
        colorEven={props.colorEven}
        isFlip={props.isFlip}
      />
    );
  });
};

Board.propTypes = {
  size: PropTypes.number,
  colorOdd: PropTypes.string,
  colorEven: PropTypes.string,
  isFlip: PropTypes.func,
};

export default Board;
