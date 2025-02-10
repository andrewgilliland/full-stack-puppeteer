import { useState } from "react";
import { getPDF } from "./utils";

function App() {
  const [loading, setLoading] = useState(false);
  const [dataURL, setDataURL] = useState("");

  return (
    <div>
      <div
        style={{
          display: "flex",
          marginTop: 32,
          border: "1px solid red",
        }}
      >
        <p style={{ flex: 1 }}>Page.pdf()</p>
        <button
          style={{ flex: 1 }}
          disabled={loading}
          onClick={async () => {
            setLoading(true);
            setDataURL(await getPDF());
            setLoading(false);
          }}
        >
          {loading ? "Loading..." : "Generate PDF"}
        </button>
        <div style={{ flex: 1 }} />
      </div>

      {dataURL && (
        <div
          style={{ marginTop: 32, display: "flex", flexDirection: "column" }}
        >
          <iframe
            title="PDF Viewer"
            src={dataURL}
            style={{ width: "100%", height: "100vh", marginTop: 16 }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
