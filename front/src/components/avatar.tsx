import React, { useState } from "react";
import axios from "axios";
import { 
    Avatar,
    Popover,
    Box,
    Paper,
    Button,
    Typography,
    TextField,
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SettingsIcon from '@mui/icons-material/Settings';

interface AvatarIconeProps {
    onSair?: () => void;
    onConfig?: () => void;
}

interface InformacoesBanco {
    nome: string;
    email: string;
}

const AvatarIcone: React.FC<AvatarIconeProps> = ({ onSair, onConfig }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    
    //puchar do banco
    const [erroLogin, setErroLogin] = useState("");

    const [dados, setDados] = useState<InformacoesBanco>({
        nome: "",
        email: ""
    });


    const handleToggle = async (event: React.MouseEvent<HTMLElement>) => {
        // abre/fecha o popover
        if (anchorEl) {
            setAnchorEl(null);
            return;
        }

        setAnchorEl(event.currentTarget);

        // limpa erro anterior
        setErroLogin("");

         // limpa dados antes da requisição
        setDados({ nome: "", email: "" });

        try {
            const res = await axios.get("http://localhost:3000/usuario/info");

            setDados({
                nome: res.data.nome,
                email: res.data.email
            });

        } catch (err: any) {
            if (err.response?.data?.error) {
                setDados({ nome: "", email: "" });      // limpa os dados
                setErroLogin(err.response.data.error);  // mostra erro no TextField
            } else {
                setErroLogin("Erro ao conectar ao servidor");
            }
        }
    };


    const open = Boolean(anchorEl);

    return (
        <>
            <Avatar
                onClick={handleToggle}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 66, height: 66,
                    bgcolor: "transparent",
                    border: "2px solid black",
                    color: "black",
                    marginRight: 1,
                    cursor: "pointer",
                }}
            >
                <PersonIcon sx={{ fontSize: 52 }} />
            </Avatar>

            {/* Popover (Paper flutuante) */}
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                PaperProps={{
                    sx: { 
                        p: 2,
                        borderRadius: 2,
                        zIndex: 9999, // garante que fica por cima de tudo
                        width: 250,
                        backgroundColor: "#B3D4F5",
                        margin: 2,
                    }
                }}
            >
                {/* Conteúdo que aparece dentro do Paper */}
                <Paper elevation={0} 
                    sx={{ 
                        p: 1, 
                        backgroundColor: "#B3D4F5",
                        height: "46dvh",
                    }}
                >
                    <Box //informações
                        sx={{
                            display: "flex",
                            margin:2,
                            flexDirection: "column",
                        }}
                    >
                        <Typography variant="h6" sx={{ mb: 1, color: "#ffff" }}>
                            Usuário
                        </Typography>
                        <TextField
                            disabled
                            id="outlined-disabled"
                            label={dados.nome || "Nome"}
                            error={!!erroLogin}
                            helperText={erroLogin}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    backgroundColor: "#ffffff", 
                                }
                            }}
                        />
                        <Typography variant="h6" sx={{ mb: 1, mt: 1, color: "#ffff" }}>
                            E-mail
                        </Typography>
                        <TextField
                            disabled
                            id="outlined-disabled"
                            label={dados.email || "Email"}
                            error={!!erroLogin}
                            helperText={erroLogin}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    backgroundColor: "#ffffff", 
                                }
                            }}
                        />
                    </Box>

                    <Box //botoes
                        sx={{
                            display: "flex",
                            margin: 1,
                        }}
                    >
                        <Button fullWidth variant="contained" onClick={onSair} sx={{ backgroundColor: "#4B5B9C", mb: 1, width: "8vw", height: "4vw" , marginRight: 1}}>
                            <Box sx={{marginRight: 1, fontSize: 22}}>Sair</Box> <ExitToAppIcon sx={{ fontSize: 32 }} />
                        </Button>
                        <Button fullWidth variant="contained" onClick={onConfig} sx={{ backgroundColor: "rgba(75, 91, 156, 0.6)", mb: 1, width: "5vw", height: "4vw" }}>
                            <SettingsIcon sx={{ fontSize: 32 }} />
                        </Button>
                    </Box>
                </Paper>
            </Popover>
        </>
    );
};

export default AvatarIcone;
