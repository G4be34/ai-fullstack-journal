const Spinner = ({ width, height }) => {
  return (
    <div
      style={{ width, height }}
      className="rounded-full animate-spin border border-solid border-yellow-500 border-t-transparent"
    ></div>
  );
};

export default Spinner;
