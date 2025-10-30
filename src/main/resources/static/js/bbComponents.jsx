
<script type="text/babel">
  function BBServiceURL() {
    const host = window.location.host;
    return (host.startsWith("localhost") ? "ws://" : "wss://") + host + "/bbService";
  }

  class WSBBChannel {
    constructor(url, onReceive) {
      this.ws = new WebSocket(url);
      this.ws.onmessage = (e) => {
        if (e.data !== "Connection established.") onReceive(e.data);
      };
    }
    send(x, y) { this.ws.send(`{"x":${x},"y":${y}}`); }
    close(){ try{ this.ws.close(); }catch(_){} }
  }

  function BBCanvas() {
    const p5ref = React.useRef(null);
    const wsref = React.useRef(null);

    const sketch = (p) => {
      p.setup = () => p.createCanvas(700, 410);
      p.draw = () => {
        if (p.mouseIsPressed) {
          p.ellipse(p.mouseX, p.mouseY, 20, 20);
          if (wsref.current) wsref.current.send(p.mouseX, p.mouseY);
        }
      };
    };

    function drawPoint(x, y){ if (p5ref.current) p5ref.current.ellipse(x, y, 20, 20); }

    React.useEffect(() => {
      p5ref.current = new p5(sketch, "container");
      wsref.current = new WSBBChannel(BBServiceURL(), msg => {
        const {x, y} = JSON.parse(msg);
        drawPoint(x, y);
      });
      return () => wsref.current && wsref.current.close();
    }, []);

    return <div id="container"></div>;
  }

  function App(){ return (<div><h2>Hola ARSW 👋</h2><BBCanvas/></div>); }
  ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
</script>
