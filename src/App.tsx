import { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const [fullName, setFullName] = useState('');
  const [numPasses, setNumPasses] = useState('');
  const [nameX, setNameX] = useState(320);
  const [nameY, setNameY] = useState(615);
  const [passesX, setPassesX] = useState(490);
  const [passesY, setPassesY] = useState(523);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = new Image();
    img.src = '/Invitacion.png';
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      // Draw text
      ctx.font = 'bold 24px "Times New Roman"';
      ctx.fillStyle = 'black';
      ctx.fillText(fullName.toUpperCase(), nameX, nameY);
      // Draw passes
      ctx.font = 'bold 36px "Times New Roman"';
      ctx.fillStyle = 'gold';
      const label = '';
      ctx.fillText(label, passesX, passesY);
      const labelWidth = ctx.measureText(label).width;
      ctx.fillStyle = 'black';
      ctx.fillText(numPasses.toUpperCase(), passesX + labelWidth, passesY);
    };
  }, [fullName, numPasses, nameX, nameY, passesX, passesY]);

  const handleGenerate = () => {
    const canvas = canvasRef.current;
    if (canvas && fullName.trim()) {
      const link = document.createElement('a');
      const fileName = fullName.trim().replace(/\s+/g, '_') + '.png';
      link.download = fileName;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Generador de Invitaciones</h1>
      <div className="row">
        <div className="col-6">
          <form>
            <label>
              Nombres Completos:
              <input type="text" className="form-control mb-2" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </label>
            <br />
            <label>
              N° pases:
              <input type="text" className="form-control mb-2" value={numPasses} onChange={(e) => setNumPasses(e.target.value)} />
            </label>
            <br />
            <div style={{ display: 'none' }}>
              <label>
                Posición X del Nombre:
                <input type="number" className="form-control mb-2" value={nameX} onChange={(e) => setNameX(Number(e.target.value))} />
              </label>
              <label>
                Posición Y del Nombre:
                <input type="number" className="form-control mb-2" value={nameY} onChange={(e) => setNameY(Number(e.target.value))} />
              </label>
              <br />
              <label>
                Posición X de Pases:
                <input type="number" className="form-control mb-2" value={passesX} onChange={(e) => setPassesX(Number(e.target.value))} />
              </label>
              <label>
                Posición Y de Pases:
                <input type="number" className="form-control mb-2" value={passesY} onChange={(e) => setPassesY(Number(e.target.value))} />
              </label>
              <br />
            </div>
            <button className="btn btn-primary" onClick={handleGenerate}>Generar Imagen</button>
          </form>
        </div>
        <div className="col-6">
          <h2>Vista Previa</h2>
          <canvas ref={canvasRef} style={{ border: '1px solid black', maxWidth: '100%', height: 'auto' }}></canvas>
        </div>
      </div>
    </div>
  );
}

export default App
