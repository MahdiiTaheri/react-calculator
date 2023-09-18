function Button({ btn, dispatch }) {
  return (
    <button
      onClick={() => {
        dispatch({
          type: "add-digit",
          payload: { btn },
        });
      }}
    >
      {btn}
    </button>
  );
}

export default Button;
