import React from "react";
import logoImg from "../assets/logo.png";
import { 
    Box,
    Typography,
} from "@mui/material";

const Logo: React.FC = () => {
    return(
        <Box //inicio
            sx={{ 
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                width: 'auto',
                minHeight: '10vh',
                minWidth: '8vw',
                padding:1, 
            }}
        >
            <Box //local da logo
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '10vh',
                    width: 'auto',
                    backgroundColor: "#22b92aff",
                    
                }}
            >
                <Box //logo
                    sx={{
                        width: "8vw",
                        height: "10dvh",
                        mx: "auto",
                        mb: 2,
                        background: "#B3D4F5",
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 1,
                    }}
                >
                    <img
                        src={logoImg}
                        alt="Logo"
                        style={{
                            width: "70%",
                            height: "70%",
                            objectFit: "cover",
                        }}
                    />
                </Box>
                <Box 
                    sx={{
                        width: "8vw",
                        height: "2dvh",
                        mx: "auto",
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Typography variant="body2" component="h6" fontWeight={600} color="text.primary">
                        ToDoList
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
};

export default Logo;