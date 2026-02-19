import { Navigate, Route, Routes } from "react-router-dom";
import Shell from "./components/Shell";
import LayoutEmbed from "./pages/LayoutEmbed";
import About from "./pages/About";
import Categorizacion from "./pages/Categorizacion";

export default function App() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<Navigate to="/sobre" replace />} />
        <Route path="/categorizacion" element={<Categorizacion />} />
        <Route
          path="/planta-baja"
          element={
            <LayoutEmbed
              title="Planta baja"
              src="layouts/planta_baja.html"
              tableSrc="layouts/planta_baja_table.json"
            />
          }
        />
        <Route
          path="/primer-piso"
          element={
            <LayoutEmbed
              title="Primer piso"
              src="layouts/primer_piso.html"
              tableSrc="layouts/primer_piso_table.json"
            />
          }
        />
        <Route path="/sobre" element={<About />} />
        <Route path="*" element={<Navigate to="/planta-baja" replace />} />
      </Routes>
    </Shell>
  );
}

