function DarkmodeButton({ isDark, setIsDark }) {
  return (
    <button className="btn-light-mode" onClick={() => setIsDark((cur) => !cur)}>
      {isDark ? "☀️" : "🌙"}
    </button>
  );
}

export default DarkmodeButton;
