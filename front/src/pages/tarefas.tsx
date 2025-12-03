import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Box, 
  Container, 
  Typography, 
  IconButton, 
  Paper, 
  Avatar, 
  Stack,
  Tooltip,
  Button,
  TextField,
  Snackbar, 
  Alert,
  type AlertColor,
  CircularProgress
} from '@mui/material';

// Ícones do MUI
import PersonIcon from '@mui/icons-material/Person';
import BarChartIcon from '@mui/icons-material/BarChart';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// --- ALTERAÇÃO AQUI: Importando a logo localmente ---
// Certifique-se de que a imagem "logo.png" existe na pasta "src/assets/"
import logoImg from "../assets/logo.png"; 
import Logo from '../components/logo';
import AvatarIcone from '../components/avatar';
// ----------------------------------------------------

const API_URL = "http://back:3333/tarefas";

interface BackendTask {
  id: number;
  titulo: string;
  descricao: string;
  concluida: boolean;
}

interface Task {
  id: number;
  text: string;     
  description?: string; 
  completed: boolean;
  selected?: boolean; 
}

interface TaskItemProps {
  task: Task;
  onToggleSelect: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleSelect }) => {
  const navigate = useNavigate(); 

  const handleOpenActivity = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    
    // Rota alterada para /tarefa/:id
    navigate(`/tarefa/${task.id}`, {
      state: {
        titulo: task.text,
        descricao: task.description || "Sem descrição disponível (Tarefa Local).", 
        ehTeste: false
      }
    }); 
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', alignItems: 'center', gap: 2, mb: 2, 
        transition: 'all 0.2s',
        transform: task.selected ? 'scale(1.02)' : 'scale(1)',
        filter: task.completed ? 'grayscale(100%) opacity(0.6)' : 'none'
      }}
    >
      <Box
        onClick={onToggleSelect} 
        sx={{
          cursor: 'pointer',
          width: 40, height: 40, borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: task.selected ? '3px solid #ff9800' : '2px solid #9e9e9e',
          bgcolor: task.completed ? '#e8f5e9' : (task.selected ? '#fff3e0' : 'white'),
          boxShadow: task.selected ? '0 0 8px rgba(255, 152, 0, 0.5)' : 'none',
          '&:hover': { transform: 'scale(1.1)' },
          transition: 'transform 0.1s'
        }}
      >
        {task.completed && <Typography sx={{ color: 'green', fontWeight: 'bold', fontSize: '1.5rem' }}>✓</Typography>}
        {!task.completed && task.selected && <Box sx={{ width: 10, height: 10, bgcolor: '#ff9800', borderRadius: '50%' }} />}
      </Box>

      <Paper
        elevation={task.selected ? 6 : 2}
        onDoubleClick={handleOpenActivity} 
        sx={{
          flex: 1, 
          p: 2,
          cursor: 'pointer',
          bgcolor: task.selected ? '#42a5f5' : '#90caf9',
          border: task.selected ? '1px solid #1976d2' : 'none',
          color: 'white', fontWeight: 'bold', fontSize: '1.1rem',
          textDecoration: task.completed ? 'line-through' : 'none',
          userSelect: 'none',
          '&:hover': { bgcolor: task.selected ? '#1e88e5' : '#64b5f6', filter: 'brightness(1.05)' }
        }}
      >
        <Tooltip title="Dê 2 cliques para abrir" placement="top-start" enterDelay={1000}>
            <Typography variant="inherit" component="span" sx={{ width:'100%', display:'block'}}>
                {task.text} 
            </Typography>
        </Tooltip>
      </Paper>
    </Box>
  );
};

export default function TodoListPage() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<Task[]>([]); 
  const [tempInput, setTempInput] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Estado para saber se está criando a tarefa
  const [creating, setCreating] = useState(false); 

  const [notification, setNotification] = useState<{ open: boolean; message: string; severity: AlertColor }>({
    open: false, message: '', severity: 'success'
  });

  const showNotification = (message: string, severity: AlertColor = 'success') => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseNotification = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setNotification({ ...notification, open: false });
  };

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      // Timeout curto para carregar a lista também não travar a tela
      const response = await axios.get<BackendTask[]>(API_URL, { timeout: 2000 });
      
      const formattedTasks: Task[] = response.data.map((t) => ({
        id: t.id,
        text: t.titulo,     
        description: t.descricao, 
        completed: false,   
        selected: false
      }));
      
      setTasks(formattedTasks);
    } catch (error) {
      console.error(error); 
    } finally {
      setLoading(false);
    }
  }, []); 

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]); 

  const handleGoToStats = () => {
    showNotification("Navegando para Estatísticas...", "info");

    setTimeout(() => {
      navigate("/dashboard");
    }, 1000); // 1 segundo
  };

  const handleGoToNewPage = () => {
    showNotification("Abrindo página de Nova Tarefa...", "info");

    setTimeout(() => {
      navigate("/criar");
    }, 1000); // 1 segundo
  };

  const toggleSelectTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, selected: !t.selected } : t));
  };

  const handleDeleteSelected = async () => {
    const selectedTasks = tasks.filter(t => t.selected);
    if (selectedTasks.length === 0) {
      showNotification("Selecione algo para apagar!", "warning");
      return;
    }

    if (window.confirm("Tem certeza que deseja excluir?")) {
      try {
        for (const task of selectedTasks) {
          await axios.delete(`${API_URL}/${task.id}`);
        }
        showNotification(`${selectedTasks.length} tarefa(s) removida(s)!`, "success");
        fetchTasks(); 
      } catch (error) {
        setTasks(tasks.filter(t => !t.selected));
        showNotification("Backend off: Removido localmente.", "warning");
      }
    }
  };

  const handleAddNewTask = async () => {
    if (!tempInput) return;
    
    setCreating(true); // 1. Ativa indicador visual de carregamento

    try {
      // 2. Timeout de 1 segundo.
      await axios.post(API_URL, {
        titulo: tempInput,
        descricao: "Criada via lista rápida",
        concluida: false
      }, { timeout: 1000 }); 
      
      setTempInput("");
      showNotification("Tarefa salva no Servidor!", "success");
      fetchTasks(); 
    } catch (error) {
      console.error("Backend offline ou lento, criando localmente...", error);
      
      const novaTarefaLocal: Task = {
        id: Date.now(),
        text: tempInput,
        description: "Tarefa Local (Teste - Backend Offline)",
        completed: false,
        selected: false
      };

      setTasks(oldTasks => [...oldTasks, novaTarefaLocal]);
      setTempInput("");
      showNotification("Modo Offline: Criada localmente!", "warning");
    } finally {
      setCreating(false); // 3. Desativa indicador visual
    }
  };

  const actionBtnStyle = {
    border: '2px solid #e0e0e0', borderRadius: 2, transition: 'all 0.2s',
    p: 2, width: 70, height: 70, 
    '&:hover': { bgcolor: '#e3f2fd', borderColor: '#2196f3', transform: 'translateY(-2px)' }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'white' }}>
      
      <Paper elevation={0} 
        sx={{ 
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1100, 
          bgcolor: 'white', borderBottom: '1px solid #eee', px: 4, 
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          height: '120px'
        }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <AvatarIcone onSair={() => navigate("/")} onConfig={() => navigate("/config")} />
          <Logo />
        </Stack>

        <Stack direction="row" spacing={2}>
          <Tooltip title="Dashboard"><IconButton onClick={handleGoToStats} sx={actionBtnStyle}><BarChartIcon color="primary" sx={{ fontSize: 45 }} /></IconButton></Tooltip>
          <Tooltip title="Criar nova tarefa"><IconButton onClick={handleGoToNewPage} sx={actionBtnStyle}><FolderOpenIcon sx={{ color: '#00bcd4', fontSize: 45 }} /></IconButton></Tooltip>
          <Tooltip title="Concluir Selecionados"><IconButton onClick={() => showNotification('Use a página de detalhes para concluir', 'info')} sx={{ ...actionBtnStyle, borderColor: '#4caf50' }}><CheckBoxIcon color="success" sx={{ fontSize: 45 }} /></IconButton></Tooltip>
          <Tooltip title="Apagar Selecionados"><IconButton onClick={handleDeleteSelected} sx={{ ...actionBtnStyle, borderColor: '#ef5350' }}><DeleteForeverIcon color="error" sx={{ fontSize: 45 }} /></IconButton></Tooltip>
        </Stack>
      </Paper>

      <Container maxWidth="lg" sx={{ mt: 18, pb: 20 }}>
        <Box sx={{ minHeight: 200 }}>
          {loading ? (
             <Typography align="center" sx={{ mt: 4 }}>Carregando lista...</Typography>
          ) : tasks.length === 0 ? (
            <Typography align="center" color="text.secondary" sx={{ fontStyle: 'italic', mt: 4 }}>
              Nenhuma tarefa encontrada... <br/> (Adicione abaixo para testar)
            </Typography>
          ) : (
            tasks.map(task => (
              <TaskItem key={task.id} task={task} onToggleSelect={() => toggleSelectTask(task.id)} />
            ))
          )}
        </Box>
      </Container>

      <Paper elevation={10} sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000, bgcolor: 'white', borderTop: '1px solid #e0e0e0', py: 2 }}>
        <Container maxWidth="lg">
          <Typography variant="caption" color="gray" sx={{ ml: 1 }}>Adicionar nova tarefa</Typography>
          <Stack direction="row" spacing={2} mt={0.5}>
            <TextField 
              size="small" 
              placeholder="Digite o título..." 
              value={tempInput} 
              disabled={creating} // Desabilita input enquanto cria
              onChange={(e) => setTempInput(e.target.value)} 
              fullWidth 
              onKeyPress={(e) => { if (e.key === 'Enter') handleAddNewTask(); }}
            />
            <Button 
                variant="contained" 
                onClick={handleAddNewTask} 
                disabled={creating} // Botão fica desabilitado carregando
                sx={{ minWidth: 100, fontWeight: 'bold' }}
            >
              {creating ? <CircularProgress size={24} color="inherit" /> : "SALVAR"}
            </Button>
          </Stack>
        </Container>
      </Paper>

      <Snackbar open={notification.open} autoHideDuration={3000} onClose={handleCloseNotification} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%', boxShadow: 3 }} variant="filled">{notification.message}</Alert>
      </Snackbar>

    </Box>
  );
}