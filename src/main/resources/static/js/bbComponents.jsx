/* global React, ReactDOM, p5 */
/* eslint-env browser */
/* eslint-disable no-undef */

"use strict";

// Calcula ws:// o wss:// según el entorno
function BBServiceURL() {
  const host = window.location.host;
  return (host.startsWith("localhost") ? "ws://" : "wss://") + host + "/bbService";
}

class WSBBChannel {
  constructor(url, onReceive) {
    this.ws = new WebSocket(url);
    this.onReceive = onReceive;

    this.ws.onopen = () => console.log("[WS] open:", url);
    this.ws.onmessage = (e) => {
      if (e.data !== "Connection established.") this.onReceive(e.data);
    };
    this.ws.onerror = (e) => console.error("[WS] error:", e);
    this.ws.onclose = () => console.log("[WS] closed");
  }

  send(x, y) {
    try {
      this.ws.send(JSON.stringify({ x, y }));
    } catch (e) {
      console.error("[WS] send failed:", e);
    }
  }

  close() {
    try { this.ws.close(); } catch (_) {}
  }
}

function BBCanvas() {
  const p5ref = React.useRef(null);
  const wsref = React.useRef(null);

  const sketch = (p) => {
    p.setup = () => p.createCanvas(700, 410);
    p.draw = () => {
      if (p.mouseIsPressed) {
        p.fill(0);
        p.ellipse(p.mouseX, p.mouseY, 20, 20);
        if (wsref.current) wsref.current.send(p.mouseX, p.mouseY);
      }
    };
  };

  function drawPoint(x, y) {
    if (p5ref.current) p5ref.current.ellipse(x, y, 20, 20);
  }

  React.useEffect(() => {
    // Monta p5 en el div con id="container"
    p5ref.current = new p5(sketch, "container");

    // Conecta WebSocket
    wsref.current = new WSBBChannel(BBServiceURL(), (msg) => {
      const { x, y } = JSON.parse(msg);
      drawPoint(x, y);
    });

    // Limpieza al desmontar
    return () => {
      if (wsref.current) wsref.current.close();
    };
  }, []);

  return (
    <div>
      <p>Canvas listo. Abre otra pestaña para ver el trazo en tiempo real.</p>
      <div id="container"></div>
    </div>
  );
}

function App() {
  return (
    <div>
      <h2>Tablero Interactivo 🎨​</h2>
      <p>Endpoint de estado: <a href="/status">/status</a></p>
      <BBCanvas />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

