function ClearButton({ dispatch }) {
  return (
    <button
      className="span-two"
      onClick={() =>
        dispatch({
          type: "clear",
        })
      }
    >
      Clear
    </button>
  );
}

export default ClearButton;
