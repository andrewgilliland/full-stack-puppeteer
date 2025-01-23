import { useState } from "react";
import "./App.css";
import { getPDF } from "./utils";

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <button
        disabled={loading}
        onClick={async () => {
          setLoading(true);
          await getPDF();
          setLoading(false);
        }}
      >
        {loading ? "Loading..." : "Generate PDF"}
      </button>
    </div>
  );
}

export default App;
