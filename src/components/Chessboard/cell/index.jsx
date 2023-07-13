import "./Cell.css";
import PropTypes from 'prop-types';

const Cell = (props) => {  
  if (props.cell % 2 === 0) {
    return <div className="Cell-Black" style={{backgroundColor: props.colorEven}} onClick={props.isFlip}/>;
  } else {
    return <div className="Cell-White" style={{backgroundColor: props.colorOdd}} onClick={props.isFlip}/>;
  }
}

Cell.propTypes = {
  cell: PropTypes.number,
  colorEven: PropTypes.string,
  colorOdd: PropTypes.string,
  isFlip: PropTypes.func,
}

export default Cell;
