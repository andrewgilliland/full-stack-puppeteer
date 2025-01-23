import { useEffect, useState } from "react";
import "./App.css";
import { getPDF } from "./utils";

function App() {
  const [loading, setLoading] = useState(false);
  const [pdf, setPDF] = useState("");

  useEffect(() => {
    console.log("pdf: ", pdf);
  }, [pdf]);

  return (
    <div>
      <button
        disabled={loading}
        onClick={async () => {
          setLoading(true);
          const result = await getPDF();

          setPDF(result);

          setLoading(false);
        }}
      >
        {loading ? "Loading..." : "Generate PDF"}
      </button>

      {pdf && (
        <div
          style={{ marginTop: 32, display: "flex", flexDirection: "column" }}
        >
          <button>
            <a href={pdf} download="file.pdf">
              Download PDF
            </a>
          </button>
          <img
            style={{ border: "1px solid red", marginTop: 16 }}
            src={pdf}
            width="250"
            height="200"
          />
        </div>
      )}
    </div>
  );
}

export default App;
