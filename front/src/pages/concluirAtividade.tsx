import React, { useState, useEffect } from "react";
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
                justifyContent: "space-between",
            }}
        >
            <Box //inicio
                sx={{
                    display:"flex",
                    alignItems:"center",
                    margin:2,
                    
                }}
            >
                <AvatarIcone onSair={() => navigate("/inicio")} onConfig={() => navigate("/configuracoes")} />
                <Logo />
            </Box>
            <Box //fim
                sx={{
                    display: "flex",
                    
                }}
            >
                <Concluir onClick={onConcluir} title="Concluir atividade" />
                <Voltar onClick={() => navigate("/atividades")} title="Voltar para Atividades" />
            </Box>
        </Box>
    )
};

interface MainProps {
    mostrarAlerta: { tipo: "success" | "error", msg: string } | null;
    titulo: string;
    descricao: string;
    getTitulo: (v: string) => void;
    getDescricao: (v: string) => void;
    readonly: boolean;
}

const Main: React.FC<MainProps> = ({ mostrarAlerta, titulo, descricao, getTitulo, getDescricao, readonly }) => {
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
                        fullWidth
                        value={titulo}
                        onChange={(e) => getTitulo(e.target.value)}
                        sx={{
                            backgroundColor: readonly ? "#f0f0f0" : "#f7f7f7",
                            borderRadius: 2,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                            },
                            boxShadow: "0px 3px 6px rgba(0,0,0,0.15)"
                        }}
                        InputProps={{
                            readOnly: readonly
                        }}
                    />
                    <TextField
                        fullWidth
                        multiline
                        minRows={9}
                        value={descricao}
                        onChange={(e) => getDescricao(e.target.value)}
                        sx={{
                            backgroundColor: readonly ? "#f0f0f0" : "#f7f7f7",
                            borderRadius: 2,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                            },
                            boxShadow: "0px 3px 6px rgba(0,0,0,0.15)"
                        }}
                        InputProps={{
                            readOnly: readonly
                        }}
                    />
                </Box>
            </Box>
        </Box>
    )
};

const ConcluirAtividade: React.FC = () => {
    const [titulo, getTitulo] = useState("");
    const [descricao, getDescricao] = useState("");
    const [alertaMensagem, setAlertaMensagem] = useState("");
    const [alertaTipo, setAlertaTipo] = useState<"success" | "error" | null>(null);
    const [loading, setLoading] = useState(false);
    const [readonly, setReadonly] = useState(false);
    
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const carregarAtividade = async () => {
            if (!id) return;
            
            setLoading(true);
            try {
                const response = await axios.get(`http://back:3333/tarefas/${id}`);
                const atividade = response.data;
                
                getTitulo(atividade.titulo || "");
                getDescricao(atividade.descricao || "");
                if (atividade.status === "concluido") {
                    setReadonly(true);
                }
                
            } catch (error: any) {
                console.error("Erro ao carregar atividade:", error);
                setAlertaTipo("error");
                setAlertaMensagem("Não foi possível carregar a atividade.");
                
                setTimeout(() => {
                    navigate("/atividades");
                }, 3000);
            } finally {
                setLoading(false);
            }
        };

        carregarAtividade();
    }, [id, navigate]);

    const handleConcluir = async () => {
        if (!titulo.trim()) {
            setAlertaTipo("error");
            setAlertaMensagem("O título não pode estar vazio.");
            return;
        }

        setLoading(true);
        setAlertaTipo(null);
        setAlertaMensagem("");

        try {
            const payload = {
                titulo,
                descricao,
                status: "concluido", 
                concluidoEm: new Date().toISOString() 
            };

            await axios.put(`http://back:3333/tarefas/${id}`, payload);


            setAlertaTipo("success");
            setAlertaMensagem("Atividade concluída com sucesso!");
            setReadonly(true); 
            setLoading(false);

            setTimeout(() => {
                navigate("/atividades");
            }, 3000);

        } catch (error: any) {
            console.error("Erro ao concluir atividade:", error);
            setLoading(false);

            const message =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                "Erro ao concluir atividade. Tente novamente.";

            setAlertaTipo("error");
            setAlertaMensagem(message);
        }
    };

    return(
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                width: '100%',
            }}
        >
            <Nav onConcluir={handleConcluir} />
            <Main
                mostrarAlerta={alertaTipo ? { tipo: alertaTipo, msg: alertaMensagem } : null}
                titulo={titulo}
                descricao={descricao}
                getTitulo={getTitulo}
                getDescricao={getDescricao}
                readonly={readonly}
            />
        </Box>
    );
};

export default ConcluirAtividade;