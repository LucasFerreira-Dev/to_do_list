import React from "react";
import { 
    Box,
    IconButton, 
    Tooltip,
} from "@mui/material";
import EditDocumentIcon from '@mui/icons-material/EditDocument';


const actionBtnStyle = {
    border: '2px solid #e0e0e0', 
    borderRadius: 2, 
    transition: 'all 0.2s', 
    boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
    '&:hover': { 
        bgcolor: '#e3f2fd', 
        borderColor: "#f0e000ff", 
        transform: 'translateY(-2px)',
        boxShadow: '0px 6px 12px rgba(0,0,0,0.3)',
    },
    // ⭐ aqui muda a cor do ícone no hover
    '&:hover svg': {
        color: "#f0e000ff"
    }
};


interface VoltarProps {
    onClick?: () => void;
    title?: string;
}  

const Editar: React.FC<VoltarProps> = ({ onClick, title = "Editar" }) => {
    return(
        <Box>
            <Tooltip title={title}>
                <IconButton 
                    onClick={onClick}
                    sx={{ ...actionBtnStyle, borderColor: "#B3D4F5", marginRight: 1 }}>
                    <EditDocumentIcon sx={{ fontSize: 50, color: "#B3D4F5" }} />
                </IconButton>
            </Tooltip>
        </Box>
    )
};

export default Editar;