import React from "react";
import { 
    Box,
    IconButton, 
    Tooltip,
} from "@mui/material";
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const actionBtnStyle = {
    border: '2px solid #e0e0e0', borderRadius: 2, transition: 'all 0.2s',
    '&:hover': { bgcolor: '#e3f2fd', borderColor: '#2196f3', transform: 'translateY(-2px)' }
};


interface VoltarProps {
    onClick?: () => void;
    title?: string;
}  

const Concluir: React.FC<VoltarProps> = ({ onClick, title = "Voltar" }) => {
    return(
        <Box>
            <Tooltip title={title}>
                <IconButton 
                    onClick={onClick}
                    sx={{ ...actionBtnStyle, borderColor: '#4caf50', marginRight: 1 }}>
                    <CheckBoxIcon color="success" sx={{ fontSize: 50 }} />
                </IconButton>
            </Tooltip>
        </Box>
    )
};

export default Concluir;