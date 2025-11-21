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

const COLLAPSED = 64;
const EXPANDED = 200;

const Config: React.FC<ConfigProps> = ({ logoPath = logoImg }) => {
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
        const res = await fetch("/api/user");
        if (!res.ok) throw new Error("Erro ao carregar");
        const data = await res.json();

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
      setMessage({
        type: "error",
        text: "Preencha nome e e-mail.",
      });
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
      setMessage({ type: "error", text: "Erro ao salvar." });
    } finally {
      setLoading(false);
    }
  };

  // Sidebar abre apenas em telas grandes
  const computedIsOpen = mdUp ? isOpen : true;
  const sidebarWidth = computedIsOpen ? EXPANDED : COLLAPSED;

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100dvh",
        bgcolor: "#f4f5f6",
      }}
    >
      {/* =================== SIDEBAR =================== */}
      <Box
        component="aside"
        onMouseEnter={() => mdUp && setIsOpen(true)}
        onMouseLeave={() => mdUp && setIsOpen(false)}
        sx={{
          position: "fixed",
          left: 0,
          top: 0,
          width: sidebarWidth,
          height: "100dvh",
          bgcolor: "#cfe9ff",
          transition: "width 220ms ease",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 2,
          px: 1,
          boxShadow: "2px 0 6px rgba(0,0,0,0.08)",
          zIndex: 1000,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box component="img" src={logoPath} sx={{ width: 48, height: 48 }} />
          {computedIsOpen && <Typography sx={{ fontWeight: 600 }}>Meu App</Typography>}
        </Box>

        <Box sx={{ mt: 4, width: "100%", textAlign: "center" }}>
          <IconButton
            onClick={() => setActiveSidebar("settings")}
            sx={{
              bgcolor: activeSidebar === "settings" ? "#9fd6ff" : "#bfe1ff",
              "&:hover": { bgcolor: "#9fd6ff" },
              borderRadius: 3,
              width: "100%",
            }}
          >
            <SettingsIcon />
          </IconButton>

          {computedIsOpen && <Typography sx={{ mt: 1 }}>Configurações</Typography>}
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ width: "100%", mb: 2, textAlign: "center" }}>
          <IconButton
            onClick={() => {
              setActiveSidebar("back");
              window.history.back();
            }}
            sx={{
              bgcolor: activeSidebar === "back" ? "#9fd6ff" : "#bfe1ff",
              "&:hover": { bgcolor: "#9fd6ff" },
              borderRadius: 3,
              width: "100%",
            }}
          >
            <ArrowBackIcon />
          </IconButton>

          {computedIsOpen && <Typography sx={{ mt: 1 }}>Voltar</Typography>}
        </Box>
      </Box>

      {/* =================== CONTEÚDO =================== */}
      <Box
        sx={{
          flexGrow: 1,
          // usa a largura atual da sidebar para o offset (evita sobreposição)
          ml: `${sidebarWidth}px`,
          p: 3,
          width: "100%",
          // GRID: colunas responsivas -> grande espaço em branco (1fr) + coluna fixa para o card (480px)
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1000px" },
          gap: 4,
          alignItems: "center", // centraliza verticalmente o conteúdo nas telas maiores
        }}
      >
        {/* Espaço grande à esquerda (coluna 1) - você pode colocar conteúdo ali no futuro */}
        <Box
          sx={{
            // deixa visual limpo; pode remover se quiser conteúdo real à esquerda
            height: { xs: "auto", md: "80vh" },
            display: { xs: "none", md: "block" },
          }}
        />

        {/* PAPER (formulário) posicionado na coluna 2 em md+, e ocupa a única coluna em xs */}
        <Paper
          elevation={6}
          sx={{
            gridColumn: { xs: 1, md: 2 },
            width: "100%",
            maxWidth: "450px",
            p: 4,
            borderRadius: 2,
            alignSelf: "center", // centraliza verticalmente dentro da grid cell
          }}
        >
          <Typography
            variant="h5"
            align="center"
            sx={{ mb: 3, fontWeight: 700 }}
          >
            Editar informações
          </Typography>

          {/* BANNER DE MENSAGEM */}
          {message && (
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                mb: 2,
                display: "flex",
                gap: 1,
                alignItems: "center",
                bgcolor:
                  message.type === "success"
                    ? "rgba(220, 250, 230)"
                    : "rgba(255, 230, 230)",
              }}
            >
              {message.type === "success" ? (
                <CheckCircleIcon color="success" />
              ) : (
                <ErrorOutlineIcon color="error" />
              )}
              <Typography>{message.text}</Typography>
            </Box>
          )}

          {/* FORMULÁRIO */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Nome"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              label="Usuário"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Senha"
              type={showPassword ? "text" : "password"}
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              sx={{ mt: 2, px: 4 }}
              onClick={handleSave}
              disabled={!dirty || loading}
            >
              {loading ? "Salvando..." : "Salvar"}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Config;
