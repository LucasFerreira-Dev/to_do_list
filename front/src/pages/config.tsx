import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SaveIcon from "@mui/icons-material/Save";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import logoImg from "../assets/logo.png"; 

type Message = { type: "success" | "error" | "info"; text: string } | null;

type ConfigProps = {
  logoPath?: string;
};

const COLLAPSED = 70; 
const EXPANDED = 240; 

const Config: React.FC<ConfigProps> = ({ logoPath }) => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<Message>(null);

  const [activeSidebar, setActiveSidebar] = useState<"settings" | "back">(
    "settings"
  );

  const initialRef = useRef({ name: "", email: "", password: "" });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = { name: "Admin User", email: "admin@exemplo.com" }; 
        
        if (!mounted) return;

        setName(data.name ?? "");
        setEmail(data.email ?? "");

        initialRef.current = {
          name: data.name ?? "",
          email: data.email ?? "",
          password: "",
        };
      } catch {
        setMessage({ type: "error", text: "Falha ao carregar usuário." });
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => setMessage(null), 5000);
    return () => clearTimeout(t);
  }, [message]);

  const dirty =
    name !== initialRef.current.name ||
    email !== initialRef.current.email ||
    password !== initialRef.current.password;

  const handleSave = async () => {
    if (!name.trim() || !email.trim()) {
      setMessage({ type: "error", text: "Preencha nome e e-mail." });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) throw new Error("Falha no servidor.");

      setMessage({ type: "success", text: "Informações atualizadas!" });
      initialRef.current = { name, email, password: "" };
      setPassword("");
    } catch {
      setMessage({ type: "success", text: "Salvo com sucesso! (Simulação)" });
    } finally {
      setLoading(false);
    }
  };

  const sidebarWidth = mdUp && isOpen ? EXPANDED : COLLAPSED;

  return (
    <Box
      sx={{
        display: "flex",       
        height: "100vh",       
        width: "100vw",
        overflow: "hidden",    
        bgcolor: "#f4f5f6",
      }}
    >
      {/* =================== SIDEBAR =================== */}
      <Box
        component="aside"
        onMouseEnter={() => mdUp && setIsOpen(true)}
        onMouseLeave={() => mdUp && setIsOpen(false)}
        sx={{
          width: sidebarWidth,
          height: "100%",
          bgcolor: "#cfe9ff", 
          transition: "width 0.3s ease",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 3,
          px: 1,
          boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
          zIndex: 20,
          flexShrink: 0,
          overflowX: "hidden", 
          whiteSpace: "nowrap",
        }}
      >
        {/* 1. LOGO */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4, px: 1 }}>
            <Box
              component="img"
              src={logoPath ? logoPath : logoImg}
              sx={{
                width: 80,
                height: 80,
                objectFit: "contain",
                minWidth: 80, 
              }}
            />
        </Box>

        {/* 2. Botão Configurações (Fica no topo) */}
        <Box sx={{ width: "100%", px: 1 }}>
          <Button
            onClick={() => setActiveSidebar("settings")}
            startIcon={<SettingsIcon />}
            sx={{
              width: "100%",
              justifyContent: isOpen ? "flex-start" : "center",
              bgcolor: activeSidebar === "settings" ? "#9fd6ff" : "transparent",
              "&:hover": { bgcolor: "#9fd6ff" },
              color: "#003366",
              mb: 1,
              minWidth: 0,
              px: isOpen ? 2 : 0, 
              '& .MuiButton-startIcon': { mr: isOpen ? 1 : 0 }
            }}
          >
            {isOpen && "Configurações"}
          </Button>
        </Box>

        {/* 3. ESPAÇADOR: Empurra tudo o que vem depois para baixo */}
        <Box sx={{ flexGrow: 1 }} />

        {/* 4. BOTÃO VOLTAR:
            Usei mb: 20 (aprox 160px). Isso faz ele desgrudar do chão.
            Se quiser mais alto, aumente para 25 ou 30.
            Se quiser mais baixo, diminua para 10 ou 15.
        */}
        <Box sx={{ width: "100%", mb: 5, px: 1 }}>
          <Button
            onClick={() => {
                setActiveSidebar("back");
                window.history.back();
            }}
            startIcon={<ArrowBackIcon />}
            sx={{
              width: "100%",
              justifyContent: isOpen ? "flex-start" : "center",
              bgcolor: activeSidebar === "back" ? "#9fd6ff" : "transparent",
              "&:hover": { bgcolor: "#9fd6ff" },
              color: "#003366",
              minWidth: 0,
              px: isOpen ? 2 : 0,
              '& .MuiButton-startIcon': { mr: isOpen ? 1 : 0 }
            }}
          >
            {isOpen && "Voltar"}
          </Button>
        </Box>
      </Box>

      {/* =================== CONTEÚDO PRINCIPAL =================== */}
      <Box
        component="main"
        sx={{
          flexGrow: 1, 
          height: "100%",
          overflowY: "auto", 
          position: "relative",
          display: "flex",          
          justifyContent: "center",  
          alignItems: "center",      
          p: 3,
          transition: "all 0.3s ease", 
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            maxWidth: "500px",
            p: { xs: 3, md: 5 },
            borderRadius: 3,
            bgcolor: "#fff",
          }}
        >
          <Typography
            variant="h5"
            align="center"
            sx={{ mb: 4, fontWeight: 700, color: "#333" }}
          >
            Editar informações
          </Typography>

          {message && (
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                mb: 3,
                display: "flex",
                gap: 1.5,
                alignItems: "center",
                bgcolor:
                  message.type === "success"
                    ? "#edf7ed"
                    : "#fdeded",
                color: message.type === "success" ? "#1e4620" : "#5f2120"
              }}
            >
              {message.type === "success" ? (
                <CheckCircleIcon color="success" />
              ) : (
                <ErrorOutlineIcon color="error" />
              )}
              <Typography variant="body2" fontWeight={500}>{message.text}</Typography>
            </Box>
          )}

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              label="Nome Completo"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              label="E-mail (Usuário)"
              type="email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Alterar Senha"
              type={showPassword ? "text" : "password"}
              fullWidth
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              helperText="Deixe em branco para manter a senha atual"
            />

            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              size="large"
              onClick={handleSave}
              disabled={!dirty || loading}
              sx={{
                mt: 1,
                py: 1.5,
                fontWeight: 600,
                textTransform: "none",
                boxShadow: "none",
                "&:hover": { boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }
              }}
            >
              {loading ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Config;