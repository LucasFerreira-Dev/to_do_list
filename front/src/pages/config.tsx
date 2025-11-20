import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SaveIcon from "@mui/icons-material/Save";
import logoImg from "../assets/logo.png";

type ConfigProps = {
  logoPath?: string;
};

const Config: React.FC<ConfigProps> = ({
    logoPath = logoImg,
}) => {
    // estados para os campos do formulário
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSave = async () => {
    if (!name.trim() || !email.trim()) {
      alert("Preencha nome e usuário (e-mail).");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Erro ao salvar");
      }
      const data = await res.json();
      console.log("Salvo:", data);
      alert("Informações salvas com sucesso.");
    } catch (err: unknown) {
      console.error(err);
      const message = err instanceof Error ? err.message : String(err);
      alert("Falha ao salvar: " + message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        width: "100vw",        // garante ocupar toda a largura da viewport
        bgcolor: "#f4f5f6",
        overflowX: "hidden",   // evita barras horizontais quando sidebar expande
      }}
    >
      {/* Sidebar — fixa em md+ para ficar encostada no canto esquerdo */}
      <Box
        component="aside"
        sx={{
          position: { xs: "relative", md: "fixed" }, // fixada no canto em desktop
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1200,
          width: { xs: "100%", md: 150 }, // largura colapsada em md
          height: { xs: 64, md: "100vh" },
          transition: "width 220ms ease",
          bgcolor: "#cfe9ff",
          display: "flex",
          flexDirection: { xs: "row", md: "column" },
          alignItems: "center",
          px: { xs: 2, md: 1 },
          py: { xs: 0, md: 2 },
          boxShadow: "inset -1px 0 0 rgba(0,0,0,0.06)",
          "&:hover": {
            width: { md: 250 }, // expande ao passar o mouse (mantive a sua ideia)
            "& .sidebarLabel": {
              opacity: 1,
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: { xs: "flex-start", md: "flex-start" },
            width: { xs: "auto", md: "100%" },
            mb: { xs: 0, md: 3 },
            mr: { xs: 2, md: 0 },
            mt: { xs: 0, md: 1 },
          }}
        >
          <img
            src={logoPath}
            alt="logo"
            style={{
              height: 100,
              width: "auto",
              display: "block",
              marginLeft: "10px",

            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: { xs: "flex-end", md: "flex-start" },
            width: { xs: "100%", md: "100%" },
            mt: { xs: 0, md: 1 },
          }}
        >
          <IconButton
            aria-label="configurações"
            size="large"
            sx={{
              borderRadius: 5,
              px: 2.1,
              py: 0.7,
              bgcolor: "#bfe1ff",
              "&:hover": { bgcolor: "#bfe1ff" },
              ml: { xs: "auto", md: 3 },
            }}
          >
            <SettingsIcon />
          </IconButton>

          <Typography
            component="span"
            className="sidebarLabel"
            sx={{
              ml: 1,
              display: { xs: "none", md: "block" },
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              opacity: 0,
              transition: "opacity 220ms ease",
            }}
          >
            Configurações
          </Typography>
        </Box>
      </Box>

      {/* Conteúdo principal */}
      <Box
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 4 },
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          width: "100%",
          ml: { xs: 0, md: "220px" },
        }}
      >
        <Paper
          elevation={8}
          sx={{
            width: "min(560px, 90%)",
            borderRadius: 2,
            p: { xs: 3, md: 4 },
            mt: { xs: 3, md: 6 },
            position: "relative",
            boxShadow: "8px 8px 0 rgba(0,0,0,0.12)",
          }}
        >
          <Typography variant="h5" align="center" sx={{ fontWeight: 700, mb: 3 }}>
            Editar informações
          </Typography>

          <Box component="form" noValidate autoComplete="off" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                Nome
              </Typography>
              <TextField 
              fullWidth 
              size="small" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Usuario" />

            </Box>

            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                Usuário
              </Typography>
              <TextField
                fullWidth
                size="small"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
              />
            </Box>

            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                Senha
              </Typography>
              <TextField
                fullWidth
                size="small"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword((s) => !s)} edge="end" size="small">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                disabled={loading}
                sx={{
                  textTransform: "none",
                  px: 5,
                  boxShadow: "4px 6px 0 rgba(0,0,0,0.12)",
                }}
              >
                Salvar
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Config;
