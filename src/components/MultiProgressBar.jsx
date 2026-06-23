const MultiProgressBar = ({ data }) => {
  const total = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="multi-progress-container">
      <div className="multi-progress-bar">
        {data.map((item, index) => (
          <div
            key={index}
            className="multi-progress-segment"
            style={{
              width: `${(item.value / total) * 100}%`,
              backgroundColor: item.color,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MultiProgressBar;