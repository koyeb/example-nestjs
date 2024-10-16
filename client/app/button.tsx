"use client";

const FetchButton = () => {
  const handleClick = async () => {
    try {
      const response = await fetch("/api/data");
      const result = await response.json();
      console.log("Data fetched:", result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Fetch Data</button>
    </div>
  );
};

export default FetchButton;
