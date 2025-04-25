import { useState } from 'react';
import axios from 'axios';
import './App.css';
import honeywell from './assets/honeywell logo.png';

function App() {
  const [message, setMessage] = useState('');
  const [signature, setSignature] = useState('');
  const [verificationResult, setVerificationResult] = useState('');
  const [originalMessage, setOriginalMessage] = useState('');

  const handleSign = async () => {
    try {
      const res = await axios.post(
        'http://localhost:8080/signature/sign',
        { message },
        { headers: { 'Content-Type': 'application/json' } }
      );
      setSignature(res.data);
      setOriginalMessage(message);
      setVerificationResult('');
    } catch (err) {
      console.error('Sign error', err);
    }
  };

  const handleVerify = async () => {
    try {
      const res = await axios.post('http://localhost:8080/signature/verify', {
        message,
        signature,
      });
      setVerificationResult(res.data ?  '❌ Signature is invalid': '✅ Signature is valid' );
    } catch (err) {
      console.error('Verify error', err);
    }
  };

  return (
    <div style={{
      fontFamily: 'Segoe UI, sans-serif',
      padding: '40px',
      maxWidth: '800px',
      margin: '0 auto',
      backgroundColor: '#f9f9f9',
      borderRadius: '12px',
      boxShadow: '0 0 15px rgba(0,0,0,0.1)'
    }}>
      <img
        src={honeywell}
        alt="honeywell"
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          width: '120px',
          height: 'auto'
        }}
      />

      <h1 style={{ textAlign: 'center', color: '#003366' }}>Digital Signature App</h1>

      <label style={{ fontWeight: 'bold' }}>Enter Message:</label>
      <textarea
        rows={4}
        cols={60}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here..."
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          marginBottom: '10px',
          resize: 'vertical'
        }}
      />
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button
          onClick={handleSign}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Submit & Sign
        </button>
      </div>

      {signature && (
        <div style={{ marginTop: 20 }}>
          <h3 style={{ color: '#333' }}>Generated Signature (Base64):</h3>
          <textarea
            rows={5}
            cols={60}
            readOnly
            value={signature}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              backgroundColor: '#f0f0f0'
            }}
          />
          {message !== originalMessage && (
            <p style={{ color: 'orange', marginTop: '10px' }}>
              ⚠️ Message has been modified after signing!
            </p>
          )}
          <div style={{ textAlign: 'center', marginTop: '15px' }}>
            <button
              onClick={handleVerify}
              style={{
                padding: '10px 20px',
                backgroundColor: '#28a745',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Verify
            </button>
          </div>
        </div>
      )}

      {verificationResult && (
        <div
          style={{
            marginTop: 30,
            backgroundColor: '#e9ecef',
            padding: '15px',
            borderRadius: '8px',
            textAlign: 'center',
            fontSize: '18px',
            fontWeight: 'bold',
            color: verificationResult.includes('valid') ? 'green' : 'red'
          }}
        >
          {verificationResult}
        </div>
      )}
    </div>
  );
}

export default App;
