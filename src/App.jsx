import { useEffect, useReducer, useState } from "react";
import Button from "./components/Button";
import OperationButton from "./components/OperationButton";
import ClearButton from "./components/ClearButton";
import DarkmodeButton from "./components/DarkmodeButton";

const buttonValues = [
  "DEL",
  "/",
  "1",
  "2",
  "3",
  "x",
  "4",
  "5",
  "6",
  "+",
  "7",
  "8",
  "9",
  "-",
  ".",
  "0",
];

const initialState = {
  current: null,
  previous: null,
  operation: null,
  overwrite: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "add-digit":
      if (state.overwrite)
        return { ...state, current: action.payload.btn, overwrite: false };
      if (action.payload.btn === "0" && state.current === "0") return state;
      if (action.payload.btn === "." && state.current.includes("."))
        return state;
      return {
        ...state,
        current: `${state.current || ""}${action.payload.btn}`,
      };
    case "clear":
      return {};
    case "operation":
      if (state.current == null && state.previous == null) return state;
      if (state.current == null) {
        return { ...state, operation: action.payload.btn };
      }
      if (state.previous == null)
        return {
          ...state,
          operation: action.payload.btn,
          previous: state.current,
          current: null,
        };
      return {
        ...state,
        previous: evaluate(state),
        current: null,
        operation: action.payload.btn,
      };
    case "equals":
      if (
        state.operation == null ||
        state.current == null ||
        state.previous == null
      )
        return state;
      return {
        ...state,
        overwrite: true,
        previous: null,
        operation: null,
        current: evaluate(state),
      };
    case "delete":
      if (state.overwrite)
        return {
          // current: null,
          current: state.current.slice(0, -1),
          overwrite: false,
        };
      if (state.current == null) return state;
      if (state.current.length === 1) return { ...state, current: null };
      return { ...state, current: state.current.slice(0, -1) };
    default:
      throw new Error("unknown action");
  }
}

function evaluate({ current, previous, operation }) {
  const prev = parseFloat(previous);
  const curr = parseFloat(current);
  if (isNaN(prev || isNaN(curr))) return "";
  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + curr;
      break;
    case "-":
      computation = prev - curr;
      break;
    case "x":
      computation = prev * curr;
      break;
    case "/":
      computation = prev / curr;
      break;

    default:
      throw new Error("unknown computation");
  }
  return computation.toString();
}

const NUM_FORMAT = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});

function formatter(operand) {
  if (operand == null) return;
  const [integer, decimal] = operand.split(".");
  if (decimal == null) return NUM_FORMAT.format(integer);
  return `${NUM_FORMAT.format(integer)}.${decimal}`;
}

function App() {
  const [{ previous, current, operation }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("light-mode");
  }, [isDark]);

  return (
    <>
      <div className="calculator">
        <div className="output">
          <div className="previous">
            {formatter(previous)} {operation}
          </div>
          <div className="current">{formatter(current)}</div>
        </div>
        <ClearButton dispatch={dispatch} />
        {buttonValues.map((btn, i) =>
          i === 0 || i === 1 || i === 5 || i === 9 || i === 13 || i === 16 ? (
            <OperationButton key={i} btn={btn} dispatch={dispatch} />
          ) : (
            <Button key={i} btn={btn} dispatch={dispatch} />
          )
        )}
        <button
          className="span-two equals"
          onClick={() =>
            dispatch({
              type: "equals",
            })
          }
        >
          =
        </button>
      </div>

      <div className="light-mode-container">
        <DarkmodeButton setIsDark={setIsDark} isDark={isDark} />
      </div>
    </>
  );
}

export default App;
