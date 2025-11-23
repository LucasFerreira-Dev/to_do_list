import React, { useState } from 'react';
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
  type AlertColor 
} from '@mui/material';

// Ícones
import PersonIcon from '@mui/icons-material/Person';
import BarChartIcon from '@mui/icons-material/BarChart';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import logoImg from "../assets/logo.png";

// --- 1. Interfaces ---
interface Task {
  id: number;
  text: string;
  completed: boolean;
  selected: boolean; 
}

// --- 2. Componente "Molde" ---
interface TaskItemProps {
  task: Task;
  onToggleSelect: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleSelect }) => {
  return (
    <Box 
      onClick={onToggleSelect}
      sx={{ 
        display: 'flex', alignItems: 'center', gap: 2, mb: 2, cursor: 'pointer',
        transition: 'all 0.2s',
        transform: task.selected ? 'scale(1.02)' : 'scale(1)',
        filter: task.completed ? 'grayscale(100%) opacity(0.6)' : 'none'
      }}
    >
      <Box
        sx={{
          width: 40, height: 40, borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: task.selected ? '3px solid #ff9800' : '2px solid #9e9e9e',
          bgcolor: task.completed ? '#e8f5e9' : (task.selected ? '#fff3e0' : 'white'),
          boxShadow: task.selected ? '0 0 8px rgba(255, 152, 0, 0.5)' : 'none'
        }}
      >
        {task.completed && <Typography sx={{ color: 'green', fontWeight: 'bold', fontSize: '1.5rem' }}>✓</Typography>}
        {!task.completed && task.selected && <Box sx={{ width: 10, height: 10, bgcolor: '#ff9800', borderRadius: '50%' }} />}
      </Box>

      <Paper
        elevation={task.selected ? 6 : 2}
        sx={{
          flex: 1, p: 2,
          bgcolor: task.selected ? '#42a5f5' : '#90caf9',
          border: task.selected ? '1px solid #1976d2' : 'none',
          color: 'white', fontWeight: 'bold', fontSize: '1.1rem',
          textDecoration: task.completed ? 'line-through' : 'none',
        }}
      >
        {task.text}
      </Paper>
    </Box>
  );
};

// --- 3. Página Principal ---
export default function TodoListPage() {
  const [tasks, setTasks] = useState<Task[]>([]); 
  const [tempInput, setTempInput] = useState("");

  // --- Estado da Notificação ---
  const [notification, setNotification] = useState<{ open: boolean; message: string; severity: AlertColor }>({
    open: false,
    message: '',
    severity: 'success'
  });

  const showNotification = (message: string, severity: AlertColor = 'success') => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseNotification = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setNotification({ ...notification, open: false });
  };

  // --- Navegação ---
  const handleGoToStats = () => showNotification("Navegando para Estatísticas...", "info");
  const handleGoToNewPage = () => showNotification("Abrindo página de Nova Tarefa...", "info");

  // --- Interação ---
  const toggleSelectTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, selected: !t.selected } : t));
  };

  // --- Ações ---
  const handleCompleteSelected = () => {
    const hasSelection = tasks.some(t => t.selected);
    if (!hasSelection) {
      showNotification("Selecione uma tarefa primeiro!", "warning");
      return;
    }
    setTasks(tasks.map(t => t.selected ? { ...t, completed: true, selected: false } : t));
    showNotification("Tarefas marcadas como concluídas!", "success");
  };

  const handleDeleteSelected = () => {
    const selectedCount = tasks.filter(t => t.selected).length;
    if (selectedCount === 0) {
      showNotification("Selecione algo para apagar!", "warning");
      return;
    }
    if (window.confirm("Tem certeza que deseja excluir?")) {
      setTasks(tasks.filter(t => !t.selected));
      showNotification(`${selectedCount} tarefa(s) removida(s)!`, "error");
    }
  };

  const devAddNewTask = () => {
    if (!tempInput) return;
    const newTask: Task = { id: Date.now(), text: tempInput, completed: false, selected: false };
    setTasks([...tasks, newTask]);
    setTempInput("");
    showNotification("Tarefa criada com sucesso!", "success");
  };

  const actionBtnStyle = {
    border: '2px solid #e0e0e0', borderRadius: 2, p: 1, transition: 'all 0.2s',
    '&:hover': { bgcolor: '#e3f2fd', borderColor: '#2196f3', transform: 'translateY(-2px)' }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4, minHeight: '100vh', bgcolor: 'white' }}>
      
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', mb: 4, borderBottom: '1px solid #eee', pb: 4 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar sx={{ width: 56, height: 56, bgcolor: 'transparent', border: '2px solid black', color: 'black' }}>
            <PersonIcon sx={{ fontSize: 32 }} />
          </Avatar>
          <Box>
            <Box sx={{ bgcolor: '#bbdefb', px: 1, borderRadius: 1, width: 'fit-content' }}>
              <Box 
               component="img"
               src={logoImg}  // A variável que importamos lá em cima
               alt="Logo To Do List"
               sx={{ 
                 height: 60,      
                 width: 'auto',  
                 mb: 0.5,         
                 borderRadius: 1  
               }}
            />
            </Box>
          </Box>
        </Stack>

        <Stack direction="row" spacing={2} mt={{ xs: 2, md: 0 }}>
          <Tooltip title="Dashboard">
            <IconButton onClick={handleGoToStats} sx={actionBtnStyle}>
              <BarChartIcon color="primary" fontSize="large" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Criar nova tarefa">
            <IconButton onClick={handleGoToNewPage} sx={actionBtnStyle}>
              <FolderOpenIcon sx={{ color: '#00bcd4' }} fontSize="large" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Concluir Selecionados">
            <IconButton onClick={handleCompleteSelected} sx={{ ...actionBtnStyle, borderColor: '#4caf50' }}>
              <CheckBoxIcon color="success" fontSize="large" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Apagar Selecionados">
            <IconButton onClick={handleDeleteSelected} sx={{ ...actionBtnStyle, borderColor: '#ef5350' }}>
              <DeleteForeverIcon color="error" fontSize="large" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>

      <Box sx={{ minHeight: 200 }}>
        {tasks.length === 0 ? (
          <Typography align="center" color="text.secondary" sx={{ mt: 8, fontStyle: 'italic' }}>
            Nenhuma tarefa visível... <br/> 
            (Adicione abaixo para ver o molde aparecer)
          </Typography>
        ) : (
          tasks.map(task => (
            <TaskItem key={task.id} task={task} onToggleSelect={() => toggleSelectTask(task.id)} />
          ))
        )}
      </Box>

        {/* --- Área de Teste Dev --- REMOVER QUANDO PRONTO --- */}
      <Box sx={{ mt: 8, pt: 4, borderTop: '1px dashed #ccc' }}>
        <Typography variant="caption" color="gray">Área de Teste</Typography>
        <Stack direction="row" spacing={2} mt={1}>
          <TextField size="small" placeholder="Digite para testar..." value={tempInput} onChange={(e) => setTempInput(e.target.value)} fullWidth />
          <Button variant="contained" onClick={devAddNewTask}>CRIAR</Button>
        </Stack>
      </Box>

      <Snackbar 
        open={notification.open} 
        autoHideDuration={3000} 
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity} 
          sx={{ width: '100%', boxShadow: 3 }}
          variant="filled"
        >
          {notification.message}
        </Alert>
      </Snackbar>

    </Container>
  );
}