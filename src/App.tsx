import { useState } from 'react'
import axios from "axios";
import './App.css'
import honeywell from "./assets/honeywell logo.png";

function App() {
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState("");
  const [verificationResult, setVerificationResult] = useState("");

  const handleSign = async () => {
    try {
      const res = await axios.post("http://localhost:8080/signature/sign", message, {
        headers: { "Content-Type": "text/plain" },
      });
      setSignature(res.data);
      setVerificationResult("");
    } catch (err) {
      console.error("Sign error", err);
    }
  };

  const handleVerify = async () => {
    try {
      const res = await axios.post("http://localhost:8080/signature/verify", {
        message,
        signature,
      });
      setVerificationResult(res.data ? "✅ Signature is valid" : "❌ Signature is invalid");
    } catch (err) {
      console.error("Verify error", err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <img src={honeywell} alt="honeywell" style={{ position: 'absolute', top: 0, left: 0,width: '100px', height: 'auto', padding: '10px' }}/>
      <h2>Digital Signature App</h2>
      <textarea
        rows={4}
        cols={50}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message here..."
      />
      <br />
      <button onClick={handleSign}>Submit & Sign</button>

      {signature && (
        <div style={{ marginTop: 20 }}>
          <h3>Generated Signature (Base64):</h3>
          <textarea rows={5} cols={60} readOnly value={signature} />
          <br />
          <button onClick={handleVerify}>Verify</button>
        </div>
      )}

      {verificationResult && (
        <div style={{ marginTop: 20 }}>
          <h3>Verification Result:</h3>
          <p>{verificationResult}</p>
        </div>
      )}
    </div>
  );
}

export default App
