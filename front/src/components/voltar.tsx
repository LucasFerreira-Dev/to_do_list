import React from "react";
import { 
    Box,
    IconButton, 
    Tooltip,
} from "@mui/material";
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';

const actionBtnStyle = {
    border: '2px solid #B3D4F5', borderRadius: 2, transition: 'all 0.2s',
    '&:hover': { bgcolor: '#e3f2fd', borderColor: '#2196f3', transform: 'translateY(-2px)' }
};

interface VoltarProps {
    onClick?: () => void;
    title?: string;
}

const Voltar: React.FC<VoltarProps> = ({ onClick, title = "Voltar" }) => {
    return (
        <Box>
            <Tooltip title={title}>
                <IconButton 
                    onClick={onClick}
                    sx={{ ...actionBtnStyle, borderColor: '#B3D4F5', marginRight: 1 }}
                >
                    <AssignmentReturnIcon sx={{ fontSize: 50, color: "#B3D4F5" }} />
                </IconButton>
            </Tooltip>
        </Box>
    );
};

export default Voltar;
