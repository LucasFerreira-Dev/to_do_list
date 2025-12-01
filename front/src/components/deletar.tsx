import React from "react";
import { 
    Box,
    IconButton, 
    Tooltip,
} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { pink } from "@mui/material/colors";

const actionBtnStyle = {
    border: '2px solid #e0e0e0', 
    borderRadius: 2, 
    transition: 'all 0.2s', 
    boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
    '&:hover': { 
        bgcolor: '#e3f2fd', 
        borderColor: pink[500], 
        transform: 'translateY(-2px)',
        boxShadow: '0px 6px 12px rgba(0,0,0,0.3)',
    },
    // ⭐ aqui muda a cor do ícone no hover
    '&:hover svg': {
        color: pink[500]
    }
};


interface VoltarProps {
    onClick?: () => void;
    title?: string;
}  

const Deletar: React.FC<VoltarProps> = ({ onClick, title = "Deletar" }) => {
    return(
        <Box>
            <Tooltip title={title}>
                <IconButton 
                    onClick={onClick}
                    sx={{ ...actionBtnStyle, borderColor: "#B3D4F5", marginRight: 1 }}>
                    <ClearIcon color="success" sx={{ fontSize: 50, color: "#B3D4F5" }} />
                </IconButton>
            </Tooltip>
        </Box>
    )
};

export default Deletar;