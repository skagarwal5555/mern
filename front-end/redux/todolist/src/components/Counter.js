import "../App.css";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, reset } from "../actions";

function Counter() {
  const counter = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div>
      <h3>Counter</h3>
      <h3>You have walked {counter} steps today</h3>
      <button onClick={() => dispatch(increment())}>Add a Step</button>
      <br></br>
      <br></br>
      <button onClick={() => dispatch(reset())}>Reset Steps</button>
    </div>
  );
}

export default Counter;
