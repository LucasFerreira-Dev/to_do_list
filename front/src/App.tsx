import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/index";
import Login from "./pages/login";
import LoginCadastrar from "./pages/loginCadastrar";
import CriarAtividade from "./pages/criarAtividade";
import "./App.css";
import Config from "./pages/config";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<LoginCadastrar />} />
          <Route path="/criar" element={<CriarAtividade />} />
          <Route path="/config" element={<Config />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
