import React from "react";
import { Box } from "@mui/material";

//componentes
import Voltar from "../components/voltar";
import Logo from "../components/logo";
import AvatarIcone from "../components/avatar";
import Concluir from "../components/concluir";
import Deletar from "../components/deletar";
import Editar from "../components/editar";
import { useNavigate } from "react-router-dom";

//Ambiente de testes 
const Testes: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{
            display: "flex",
            justifyContent: "space-between", // espalha um para cada lado 
            margin: 1,
        }}>
            <Logo />
            <AvatarIcone onSair={() => navigate("/")} onConfig={() => navigate("/editar")} />
            <Voltar onClick={() => navigate("/tarefa")} title="Ir pag lista de tarefas" />
            <Editar onClick={() => navigate("/editarTarefa")} title="Editar atividade" />
            <Concluir onClick={() => navigate("/tarefa")} title="Concluir atividade"/>
            <Deletar onClick={() => navigate("/tarefa")} title="Deletar atividade"/>
        </Box>
    )
};

export default Testes;