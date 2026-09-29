import { useState } from "react";
import axios from "axios";
import QRCode from "react-qr-code";
import QRCodeGenerator from "qrcode";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [qrImage, setQrImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleShorten = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/shorten`, {
        originalUrl: url,
      });
      const newShortUrl = res.data.shortUrl;
      setShortUrl(newShortUrl);
      setCopied(false);
      const qr = await QRCodeGenerator.toDataURL(newShortUrl);
      setQrImage(qr);
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.error || err?.message || "something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div style={{ background: "linear-gradient(135deg, #1a0a0a 0%, #2d0f1a 50%, #1a0a0a 100%)", minHeight: "100vh" }}
      className="flex flex-col items-center justify-center p-6 relative overflow-hidden">

      {/* Floating sakura petals */}
      {[...Array(8)].map((_, i) => (
        <div key={i} className="absolute text-2xl opacity-20 animate-bounce"
          style={{
            left: `${10 + i * 12}%`,
            top: `${5 + (i % 3) * 25}%`,
            animationDelay: `${i * 0.4}s`,
            animationDuration: `${2 + i * 0.3}s`,
          }}>🌸</div>
      ))}

      {/* Main card */}
      <div className="relative z-10 w-full max-w-2xl rounded-2xl p-8 shadow-2xl"
        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255, 105, 135, 0.3)", backdropFilter: "blur(12px)" }}>

        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-pink-300 text-sm tracking-widest mb-1 opacity-70">URL Shortener</p>
          <h1 className="text-4xl font-bold text-white mb-1" style={{ textShadow: "0 0 20px rgba(255,105,135,0.8)" }}>
            Sakura Link
          </h1>
          <p className="text-pink-200 text-sm opacity-60">Shorten your URLs instantly</p>
          <div className="flex justify-center gap-2 mt-3">
            {["✦", "🌸", "✦"].map((s, i) => (
              <span key={i} className="text-pink-400 opacity-50">{s}</span>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="flex flex-col gap-3">
          <label className="text-pink-300 text-xs tracking-widest uppercase opacity-70">Enter URL</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onPaste={(e) => setUrl(e.clipboardData.getData("text"))}
            onKeyDown={(e) => e.key === "Enter" && handleShorten()}
            placeholder="https://example.com/very-long-url..."
            className="w-full px-4 py-3 rounded-xl text-white placeholder-pink-300 outline-none transition-all duration-300"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,105,135,0.4)",
              boxShadow: url ? "0 0 15px rgba(255,105,135,0.2)" : "none",
            }}
          />
          <button
            onClick={handleShorten}
            disabled={loading || !url}
            className="w-full py-3 rounded-xl font-bold text-white tracking-widest transition-all duration-300 disabled:opacity-40"
            style={{
              background: "linear-gradient(135deg, #c0392b, #e91e8c)",
              boxShadow: "0 4px 20px rgba(233,30,140,0.4)",
              transform: loading ? "scale(0.98)" : "scale(1)",
            }}
            onMouseEnter={(e) => e.target.style.boxShadow = "0 4px 30px rgba(233,30,140,0.7)"}
            onMouseLeave={(e) => e.target.style.boxShadow = "0 4px 20px rgba(233,30,140,0.4)"}
          >
            {loading ? "Processing... ⏳" : "Shorten 🌸"}
          </button>
        </div>

        {/* Result */}
        {shortUrl && (
          <div className="mt-8 flex flex-col items-center gap-4 animate-pulse-once">
            <div className="w-full h-px" style={{ background: "linear-gradient(to right, transparent, rgba(255,105,135,0.5), transparent)" }} />

            <p className="text-pink-300 text-xs tracking-widest opacity-70">Your Short Link</p>

            <a href={shortUrl} target="_blank" rel="noreferrer"
              className="text-pink-200 break-all text-center hover:text-white transition-colors duration-200 text-sm"
              style={{ textShadow: "0 0 10px rgba(255,105,135,0.5)" }}>
              {shortUrl}
            </a>

            <button
              onClick={handleCopy}
              className="px-6 py-2 rounded-xl text-sm font-semibold tracking-wider transition-all duration-300"
              style={{
                background: copied ? "rgba(34,197,94,0.2)" : "rgba(255,105,135,0.15)",
                border: copied ? "1px solid rgba(34,197,94,0.5)" : "1px solid rgba(255,105,135,0.4)",
                color: copied ? "#86efac" : "#fda4af",
              }}>
              {copied ? "✓ Copied!" : "Copy 📋"}
            </button>

            {/* QR Code */}
            <div className="mt-4 p-5 rounded-2xl flex flex-col items-center gap-3"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,105,135,0.2)" }}>
              <p className="text-pink-300 text-xs tracking-widest opacity-70">QR Code</p>
              <div className="p-3 rounded-xl bg-white">
                <QRCode value={shortUrl} size={160} />
              </div>
              {qrImage && (
                <a href={qrImage} download="sakura-qr.png"
                  className="px-6 py-2 rounded-xl text-sm font-semibold tracking-wider transition-all duration-300"
                  style={{
                    background: "rgba(255,105,135,0.15)",
                    border: "1px solid rgba(255,105,135,0.4)",
                    color: "#fda4af",
                  }}
                  onMouseEnter={(e) => e.target.style.background = "rgba(255,105,135,0.3)"}
                  onMouseLeave={(e) => e.target.style.background = "rgba(255,105,135,0.15)"}
                >
                  Download QR 🌸
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <p className="mt-6 text-pink-400 text-xs opacity-30 tracking-widest z-10">Sakura Link</p>
    </div>
  );
}

export default App;
