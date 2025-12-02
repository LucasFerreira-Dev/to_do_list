import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/index";
import Login from "./pages/login";
import LoginCadastrar from "./pages/loginCadastrar";
import CriarAtividade from "./pages/criarAtividade";
import TodoListPage from "./pages/tarefas";
import Config from "./pages/config";
import "./App.css";

//Ambiente de testes
import Testes from "./pages/testes";
import ConcluirAtividade from "./pages/concluirAtividade";
import VerAtidade from "./pages/verAtividade";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<LoginCadastrar />} />
          <Route path="/criar" element={<CriarAtividade />} />
          <Route path="/tarefa" element={<TodoListPage />} />
          <Route path="/config" element={<Config/>} />
          <Route path="/editar" element={<ConcluirAtividade />} />
          <Route path="/tarefa/:id" element={<VerAtidade />} />

          {/*Ambiente de testes */}
          <Route path="/teste" element={<Testes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
