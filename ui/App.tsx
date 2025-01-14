import "./App.css";

function App() {
  // Make Fetch Request from Fastify Server API endpoint
  // Return PDF file
  // Display PDF file in browser

  const getData = async () => {
    const response = await fetch("http://localhost:3000");
    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      <button onClick={async () => await getData()}>View PDF</button>
    </div>
  );
}

export default App;
