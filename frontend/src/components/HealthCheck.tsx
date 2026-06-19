import { useState } from "react";

type HealthResponse = {
  status: string;
  db?: string;
  redis?: string;
  uptime?: number;
  responseTime?: number;
  time?: string;
  error?: string;
};

const API_URL = "https://weather-analytics-tls1.onrender.com";


export default function HealthCheck() {
  const [data, setData] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const checkHealth = async () => {
    setLoading(true);
    setData(null);

    try {
      const res = await fetch(`${API_URL}/system-health`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      setData({ status: "error", error: "Failed to reach backend" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: 20, padding: 10, border: "1px solid #ccc" }}>
      <h3>System Health</h3>

      <button onClick={checkHealth}>
        {loading ? "Checking..." : "Check Health"}
      </button>

      {data && (
        <pre style={{ marginTop: 10 }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}