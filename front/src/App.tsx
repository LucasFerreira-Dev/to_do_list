import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/index";
import Login from "./pages/login";
import LoginCadastrar from "./pages/loginCadastrar";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<LoginCadastrar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
