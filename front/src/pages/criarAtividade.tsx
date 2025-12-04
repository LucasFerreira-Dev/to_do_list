import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

interface NavProps {
    onConcluir: () => void;
}

const Nav: React.FC<NavProps> = ({ onConcluir }) => {
    const navigate = useNavigate();

    return(
        <Box //nave
            sx={{
                display: 'flex',
                minHeight: '14vh',
                alignItems: 'center',
                width: '100%',
                justifyContent: "space-between", // espalha um para cada lado
               //backgroundColor: "#dd1212ff",
            }}
        >
            <Box //inicio
                sx={{
                    display:"flex",
                    alignItems:"center",
                    margin:2,
                    
                }}
            >
                <AvatarIcone onSair={() => navigate("/")} onConfig={() => navigate("/config")} />
                <Logo />
            </Box>
            <Box //fim
                sx={{
                    display: "flex",
                    
                }}
            >
                <Concluir onClick={onConcluir} title="Criar atividade" />
                <Voltar onClick={() => navigate("/tarefa")} title="Voltar para Atividades" />
            </Box>
        </Box>
    )
};

interface MainProps {
    mostrarAlerta: { tipo: "success" | "error", msg: string } | null;
    titulo: string;
    descricao: string;
    setTitulo: (v: string) => void;
    setDescricao: (v: string) => void;
}

const Main: React.FC<MainProps> = ({ mostrarAlerta, titulo, descricao, setTitulo, setDescricao }) => {
    return(
        <Box //main
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '90vh',
                width: '100%',
                borderRadius: '2',
                margin: 1,
                //backgroundColor: "#24c2baff",
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
            <Box // base
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
                        maxWidth: "650vw",
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
                        placeholder="Qual será a atividade?"
                        fullWidth
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        sx={{
                            backgroundColor: "#f7f7f7",
                            borderRadius: 2,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                            },
                            boxShadow: "0px 3px 6px rgba(0,0,0,0.15)"
                        }}
                    />
                    <TextField
                        placeholder="Descreva a atividade……"
                        fullWidth
                        multiline
                        minRows={9}
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        sx={{
                            backgroundColor: "#f7f7f7",
                            borderRadius: 2,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                            },
                            boxShadow: "0px 3px 6px rgba(0,0,0,0.15)"
                        }}
                    />
                </Box>
            </Box>
        </Box>
    )
};

const CriarAtividade: React.FC = () => {
    // inputs
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");

    // alerta
    const [alertaMensagem, setAlertaMensagem] = useState("");
    const [alertaTipo, setAlertaTipo] = useState<"success" | "error" | null>(null);

    // loading para bloquear múltiplos cliques enquanto envia
    const [, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleConcluir = async () => {
        // validação simples
        if (titulo.trim() === "" || descricao.trim() === "") {
            setAlertaTipo("error");
            setAlertaMensagem("Preencha o título e a descrição antes de salvar.");
            return;
        }

        setLoading(true);
        setAlertaTipo(null);
        setAlertaMensagem("");

        try {
            const payload = {
                titulo,
                descricao,
                status: "pendente",
                concluidoEm: null // ajuste conforme sua API (null / "" / data)
            };

            // troque a URL abaixo pela sua rota real
            await axios.post("http://back:3333/tarefas", payload);

            // sucesso
            setAlertaTipo("success");
            setAlertaMensagem("Atividade criada com sucesso!");
            setLoading(false);

            // aguarda 3s e redireciona
            setTimeout(() => {
                navigate("/tarefa");
            }, 2000);

        } catch (error: any) {
            console.error("Erro ao salvar atividade:", error);
            setLoading(false);

            // tenta mostrar mensagem do servidor, se houver
            const message =
            error?.response?.data?.message ||
            error?.response?.data?.error ||
            "Erro ao salvar atividade. Tente novamente.";

            setAlertaTipo("error");
            setAlertaMensagem(message);
        }
    };



    return(
        <Box
            sx={{ //background
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                //backgroundColor: "#ddda24ff",
            }}
        >
            <Nav onConcluir={handleConcluir} />
            <Main
                mostrarAlerta={alertaTipo ? { tipo: alertaTipo, msg: alertaMensagem } : null}
                titulo={titulo}
                descricao={descricao}
                setTitulo={setTitulo}
                setDescricao={setDescricao}
            />

        </Box>
    )
}; 

export default CriarAtividade;