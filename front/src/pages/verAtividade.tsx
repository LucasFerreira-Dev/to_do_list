import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { 
    Box,
    TextField,
    Alert,
} from "@mui/material";

//componentes
import Logo from "../components/logo";
import AvatarIcone from "../components/avatar";
import Concluir from "../components/concluir";
import Voltar from "../components/voltar";
import Deletar from "../components/deletar";
import Editar from "../components/editar";

const Nav: React.FC<any> = ({ onConcluir, onDeletar }) => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'flex',
                minHeight: '14vh',
                alignItems: 'center',
                width: '100%',
                justifyContent: "space-between",
            }}
        >
            <Box
                sx={{ display:"flex", alignItems:"center", margin:2 }}
            >
                <AvatarIcone onSair={() => navigate("/")} onConfig={() => navigate("/config")} />
                <Logo />
            </Box>

            <Box sx={{ display: "flex" }}>
                <Voltar onClick={() => navigate("/tarefa")} title="Voltar" />
                <Editar onClick={() => navigate("/editar")} title="Editar" />
                <Concluir onClick={onConcluir} title="Concluir atividade" />
                <Deletar onClick={onDeletar} title="Deletar atividade" />
            </Box>
        </Box>
    );
};

interface MainProps {
    mostrarAlerta: { tipo: "success" | "error", msg: string } | null;
    titulo: string;
    descricao: string;
    erro: boolean;
}

const Main: React.FC<MainProps> = ({ mostrarAlerta, titulo, descricao, erro }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '90vh',
                width: '100%',
            }}
        >
            <Box>
                {mostrarAlerta && (
                    <Alert 
                        variant="filled"
                        severity={mostrarAlerta.tipo}
                        sx={{
                            width: "60%",
                            mt: 2,
                            borderRadius: 2,
                            fontSize: "1rem",
                            fontWeight: "600",
                        }}
                    >
                        {mostrarAlerta.msg}
                    </Alert>
                )}
            </Box>

            <Box
                sx={{
                    backgroundColor: "#B3D4F5",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "47vh",
                    width: "65%",
                    borderRadius: 6,
                    margin: 1,
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.20)",
                    padding: 4
                }}
            >
                <Box 
                    sx={{
                        backgroundColor: "#fff",
                        width: "100%",
                        minHeight: "50vh",
                        borderRadius: 3,
                        boxShadow: "0px 4px 8px rgba(0,0,0,0.25)",
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                        padding: 3
                    }}
                > 
                    <TextField
                        fullWidth
                        value={titulo}
                        InputProps={{ readOnly: true }}
                        sx={{
                            backgroundColor: erro ? "#ffdddd" : "#f7f7f7",
                            color: erro ? "red" : "black",
                            borderRadius: 2,
                            boxShadow: "0px 3px 6px rgba(0,0,0,0.15)"
                        }}
                    />
                    <TextField
                        fullWidth
                        multiline
                        minRows={9}
                        value={descricao}
                        InputProps={{ readOnly: true }}
                        sx={{
                            backgroundColor: erro ? "#ffdddd" : "#f7f7f7",
                            color: erro ? "red" : "black",
                            borderRadius: 2,
                            boxShadow: "0px 3px 6px rgba(0,0,0,0.15)"
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
};

const VerAtidade: React.FC = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [erro, setErro] = useState(false);

    // ALERTA
    const [notificacao, setNotificacao] = useState<{ tipo: "success" | "error", msg: string } | null>(null);

    // ✔️ Buscar atividade pelo ID
    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await axios.get(`http://back:3333/tarefas/${id}`);
                setTitulo(resp.data.titulo);
                setDescricao(resp.data.descricao);
            } catch (e) {
                setErro(true);
                setTitulo("Erro ao carregar atividade");
                setDescricao("Não foi possível conectar ao servidor.");
            }
        };

        fetchData();
    }, [id]);

    // ✔️ Concluir atividade
    const concluirAtividade = async () => {
        try {
            await axios.patch(`http://back:3333/tarefas/${id}/concluir`);

            setNotificacao({ tipo: "success", msg: "Atividade concluída com sucesso!" });

            setTimeout(() => navigate("/tarefa"), 2000);
        } catch (e) {
            setNotificacao({ tipo: "error", msg: "Erro ao concluir atividade!" });
        }
    };

    // ✔️ Deletar atividade
    const deletarAtividade = async () => {
        try {
            await axios.delete(`http://back:3333/tarefas/${id}`);

            setNotificacao({ tipo: "success", msg: "Atividade deletada com sucesso!" });

            setTimeout(() => navigate("/tarefa"), 2000);
        } catch (e) {
            setNotificacao({ tipo: "error", msg: "Erro ao deletar atividade!" });
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Nav onConcluir={concluirAtividade} onDeletar={deletarAtividade} />

            <Main 
                mostrarAlerta={notificacao}
                titulo={titulo}
                descricao={descricao}
                erro={erro}
            />
        </Box>
    );
};

export default VerAtidade;