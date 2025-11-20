import React, { useState } from "react";
import logoImg from "../assets/logo.png";
import {
  Button,
  Box,
  Typography,
  Paper,
  TextField,
  Alert,
} from "@mui/material";
import { z } from "zod";

// 📌 Validações com Zod (como no seu código original)
const emailSchema = z.string().email("Email inválido");

//aqui onde altera o tamanho minimo da senha e as regras da validação
const passwordSchema = z
.string()
.min(6, "A senha deve ter pelo menos 6 caracteres")
.regex(/[A-Z]/, "A senha deve conter ao menos uma letra maiúscula")
.regex(/[0-9]/, "A senha deve conter ao menos um número")
.regex(/[^A-Za-z0-9]/, "A senha deve conter ao menos um caractere especial");

const LoginCadastrar: React.FC = () => {
    // estados para email, senha e mensagem de erro
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");
    const [username, setUsername] = useState("");
    const [success, setSuccess] = useState("");

    // validações usando zod
    const emailValid = emailSchema.safeParse(email).success;
    const senhaParse = passwordSchema.safeParse(senha);
    const senhaValid = senhaParse.success;
    const senhaError = senhaParse.success ? "" : senhaParse.error.issues[0].message;
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!emailValid || !senhaValid || username.trim() === "") {
            setError("Preencha os campos corretamente.");
            return;
        }

        setError("");

        setSuccess("Login válido!"); //confirma q enviou visualmente

        // Aqui você faz o login real (axios, etc.)
        
    };

    return (
        <Box
            sx={{
                backgroundColor: "#B3D4F5",   // COR DE FUNDO SOMENTE NO LOGIN
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                width: '100%',
                borderRadius: '8',
            }}
        >
            <Paper elevation={3} sx={{ p: 4 , position: "relative", overflow: "visible"}}>
                <Box textAlign="center" mb={2}>
                    <Box
                        sx={{
                            width: "120px",
                            height: "80px",
                            mx: "auto",
                            mb: 2, // espaçamento abaixo do logo
                            background: "#B3D4F5",
                            borderRadius: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "bold",
                            color: "#fff",
                        }}
                    >
                        <img
                            src={logoImg}
                            alt="Logo"
                            style={{ width: "80%", height: "80%", objectFit: "cover" }}
                        />
                    </Box>
                    <Typography variant="h6" component="h1" fontWeight={600} mb={1}>
                        Bem-vindo testes
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                        Faça login para acessar o sistema
                    </Typography>
                        {/* Exemplo de mensagem de erro? */}
                    {error && (
                        <Alert severity="error">
                                {error}
                        </Alert>
                    )}
                    {success && (
                        <Alert severity="success" >
                            {success}
                        </Alert>
                    )}
                    <Box component="form" onSubmit={handleSubmit}
                        sx={{
                            width: "100%",
                            maxWidth: 400, // deixa TUDO mais estreito
                            mx: "auto",
                        }}
                    >
                        <TextField
                            label="Usuário"
                            type="text"
                            fullWidth
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            sx={{
                                mt:2,
                                "& .MuiOutlinedInput-root": {
                                    "&.Mui-focused fieldset": {
                                        borderColor: "green",
                                    },
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                    color: "green",
                                },
                            }}
                        />

                        <TextField
                            label="Email"
                            type="email"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={email.length > 0 && !emailValid}
                            helperText={!emailValid && email.length > 0 ? "Email inválido" : ""}   
                            FormHelperTextProps={{ style: { minHeight: 22 } }}
                            sx={{ 
                                mt:2,
                                "& .MuiOutlinedInput-root" : {
                                 "&.Mui-focused fieldset":{
                                        borderColor: email.length > 0 && emailValid ? "green" : undefined,
                                    },
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                    color: email.length > 0 && emailValid ? "green" : undefined,
                                },

                            }} 
                        />
                        <TextField
                            label="Senha"
                            type="password"
                            fullWidth
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            error={senha.length > 0 && !senhaValid}
                            helperText={senha.length > 0 && !senhaValid ? senhaError : ""}
                            FormHelperTextProps={{ style: { minHeight: 22 } }}
                            sx={{ 
                                mt:2,
                                "& .MuiOutlinedInput-root": {
                                    "&.Mui-focused fieldset": {
                                        borderColor: senha.length > 0 && senhaValid ? "green" : undefined,
                                    },
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                    color: senha.length > 0 && senhaValid ? "green" : undefined,
                                }, 
                            }} 
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={!emailValid || !senhaValid || !username}
                            sx={{
                                mt: 3,
                                background: "#B3D4F5",
                            }}
                        >
                            <Box display="flex" alignItems="center" gap={1}>
                                Entrar
                            </Box>
                        </Button>

                    </Box>
                </Box>
            </Paper>
        </Box>
        
    )
};

export default LoginCadastrar;