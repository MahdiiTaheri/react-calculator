function OperationButton({ btn, dispatch }) {
  return (
    <button
      className={btn === "DEL" ? "delete" : ""}
      onClick={() => {
        dispatch({
          type: btn === "DEL" ? "delete" : "operation",
          payload: { btn },
        });
      }}
    >
      {btn}
    </button>
  );
}

export default OperationButton;
