import React from "react";
import { 
    Box,
    IconButton, 
    Tooltip,
} from "@mui/material";
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const actionBtnStyle = {
    border: '2px solid #e0e0e0', 
    borderRadius: 2, 
    transition: 'all 0.2s', 
    boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
    '&:hover': { 
        bgcolor: '#e3f2fd', 
        borderColor: '#4CAF50', 
        transform: 'translateY(-2px)',
        boxShadow: '0px 6px 12px rgba(0,0,0,0.3)',
    },
    // ⭐ aqui muda a cor do ícone no hover
    '&:hover svg': {
        color: '#4CAF50'
    }
};

interface VoltarProps {
    onClick?: () => void;
    title?: string;
}  

const Concluir: React.FC<VoltarProps> = ({ onClick, title = "Concluir" }) => {
    return(
        <Box>
            <Tooltip title={title}>
                <IconButton 
                    onClick={onClick}
                    sx={{ ...actionBtnStyle, borderColor: "#B3D4F5", marginRight: 1 }}>
                    <CheckBoxIcon sx={{ fontSize: 50, color: "#B3D4F5" }} />
                </IconButton>
            </Tooltip>
        </Box>
    )
};

export default Concluir;