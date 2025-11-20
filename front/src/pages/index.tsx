import React from "react";
import logoImg from "../assets/logo.png"
import pagAtividade from "../assets/pagAtividades.png"
import { useNavigate } from "react-router-dom"; //para as rotas funcionar
import { 
    Box,
    Typography,
    Button,
} from "@mui/material";

const Index: React.FC = () => {

    const navigate = useNavigate(); // 👈 criar a função de navegação utilizando rotas

    return(
        <Box
            sx={{ //background
                backgroundColor: "#FFFFFF",  
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                width: '100%',
                borderRadius: '8',
            }}
        >
            <Box //nave
                sx={{
                    display: 'flex',
                    minHeight: '20vh',
                    alignItems: 'center',
                    width: '100%',
                    justifyContent: "space-between", // espalha um para cada lado
                }}
            >
                <Box //inicio
                    sx={{
                        backgroundColor: "#ffffffff",  
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        width: 'auto',
                    }}
                >
                    <Box //local da logo
                        sx={{
                            backgroundColor: "#ffffffff",  
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minHeight: '20vh',
                            width: '20%',
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
                                height: "3dvh",
                                mx: "auto",
                                background: "#ffffffff",
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
                <Box //fim
                    sx={{  
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                        width: 'auto',
                        margin: 1,
                    }}
                >
                    <Button
                        sx={{
                            color:"black",
                            "&:hover": { backgroundColor: "#2ae419ff", color: "white"  },
                            borderRadius: 2,
                            mr: 1,
                        }}
                        onClick={() => navigate("/login")}
                    >
                        <Typography variant="h6" component="h6" fontWeight={600} >
                            Login
                        </Typography>
                    </Button>

                    <Button
                        variant="contained"
                        sx={{ 
                            backgroundColor: "#B3D4F5", 
                            "&:hover": { backgroundColor: "#2ae419ff" },
                            borderRadius: 2,
                            mr: 1,
                        }}
                        onClick={() => navigate("/cadastro")} // QUANDO CLICAR VAI PARA PAG /cadastro
                    >
                        <Typography variant="h6" component="h6" fontWeight={600} >
                            Cadastrar
                        </Typography>
                    </Button>
                </Box>
            </Box>

            <Box //main
                sx={{
                    //backgroundColor: "#800c8fff", 
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    width: '100%',
                    borderRadius: '2',
                    margin: 1,
                }}
            >   
                <Box //1 conteudo
                    sx={{
                        //backgroundColor: "#ffffffff", 
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '60vh',
                        width: '99%',
                        borderRadius: '2',
                        margin: 1,
                    }}
                >
                    <Box // texto
                        sx={{
                            //backgroundColor: "#ffffffff", 
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minHeight: '70vh',
                            width: '50%',
                            margin: 1,
                        }}
                    >
                        <Typography variant="h3" component="h6" fontWeight={600} 
                            sx={{ textAlign: "center", maxWidth: "40vw" }}
                        >
                            Transforme seus dias em conquistas
                        </Typography>
                        <Typography variant="h6" component="h6" fontWeight={600} 
                            sx={{ textAlign: "center", maxWidth: "30vw" }}
                        >
                            Organize suas tarefas de  forma simples e prática. Menos estresse, mais  produtividade!
                        </Typography>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#B3D4F5", 
                                "&:hover": { backgroundColor: "#2ae419ff" },
                                borderRadius: 2,
                                mt: 1,
                            }}
                            onClick={() => navigate("/login")}
                        >
                            <Typography variant="h6" component="h6" fontWeight={600} >
                                Começar
                            </Typography>
                        </Button>
                    </Box>
                    <Box // ilustração
                        sx={{
                            backgroundColor: "rgba(94, 114, 195, 0.58)", 
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minHeight: '70vh',
                            width: '50%',
                            borderRadius: 8,
                            margin: 1,
                        }}
                    >
                        <img
                            src={pagAtividade}
                            alt="Logo"
                            style={{ width: "90%", height: "90%", objectFit: "cover", borderRadius: 8 }}
                        />
                    </Box>
                </Box>
                <Box
                    sx={{
                        backgroundColor: "#0c8f63ff", 
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '100vh',
                        width: '99%',
                        borderRadius: '2',
                        margin: 1,
                    }}
                >
                    <Typography variant="h6" component="h6" fontWeight={600} >
                        vazio
                    </Typography>
                </Box>
                

                {/*Irá conter o conteudo do site*/}
            </Box>
        </Box>
    )
};

export default Index;