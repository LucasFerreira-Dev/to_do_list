import React from "react";
import logoImg from "../assets/logo.png"
import pagAtividade from "../assets/pagAtividades.png"
import pagLogin from "../assets/pagLogin.png"
import { useNavigate } from "react-router-dom"; //para as rotas funcionar
import { 
    Box,
    Typography,
    Button,
} from "@mui/material";

const Index: React.FC = () => {

    const navigate = useNavigate(); // criar a função de navegação utilizando rotas

    return(
        <Box
            sx={{ //background
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                width: '100%',
            }}
        >
            <Box //nave
                sx={{
                    display: 'flex',
                    minHeight: '9vh',
                    alignItems: 'center',
                    width: '100%',
                    justifyContent: "space-between", // espalha um para cada lado
                }}
            >
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
                    <Box // ilustração com a pag de atividades
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
                            alt="pagina com as atividades"
                            style={{ width: "90%", height: "90%", objectFit: "cover", borderRadius: 8 }}
                        />
                    </Box>
                </Box>
                <Box // texto ilustrativo
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '99%',
                        borderRadius: '2',
                        minHeight: '28vh',
                    }}
                >
                    <Box //1 frase
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            "&:hover": { backgroundColor: "#B3D4F5" , color:"white"},
                            borderRadius: 3,
                            width: '16vw',
                            minHeight: '11vh',
                        }}
                    >
                        <Typography variant="h5" fontWeight={600} 
                            sx={{ textAlign: "center"}}
                        >
                            Organize seu <br/>dia em segundos.
                        </Typography>
                    </Box>
                    <Box //2 frase
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            "&:hover": { backgroundColor: "#B3D4F5" , color:"white"},
                            borderRadius: 3,
                            width: '16vw',
                            minHeight: '11vh',
                        }}
                    >
                        <Typography variant="h5" fontWeight={600} 
                            sx={{ textAlign: "center"}}
                        >
                            Tarefas claras, <br/>mente tranquila.
                        </Typography>
                    </Box>
                    <Box //3 frase
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            "&:hover": { backgroundColor: "#B3D4F5" , color:"white"},
                            borderRadius: 3,
                            width: '16vw',
                            minHeight: '11vh',
                        }}
                    >
                        <Typography variant="h5" fontWeight={600} 
                            sx={{ textAlign: "center"}}
                        >
                            Anote, faça, <br/>conclua.
                        </Typography>
                    </Box>
                </Box>
                <Box // ilustração com a pag de login
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '60vh',
                        width: '99%',
                        borderRadius: '2',
                        margin: 1,
                    }}
                >
                    <Box // ilustração com a pag de login
                        sx={{
                            backgroundColor: "rgba(94, 114, 195, 0.58)",  // no figma uso o #E9E9E9
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minHeight: '65vh',
                            width: '50%',
                            borderRadius: 8,
                            margin: 1,
                        }}
                    >
                        <img
                            src={pagLogin}
                            alt="pagina com as atividades"
                            style={{ width: "90%", height: "90%", objectFit: "cover", borderRadius: 8 }}
                        />
                    </Box>
                    <Box // texto
                        sx={{
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
                            Faça login e organize sua rotina com facilidade
                        </Typography>
                        <Typography variant="h6" component="h6" fontWeight={600} 
                            sx={{ textAlign: "center", maxWidth: "30vw" }}
                        >
                            Acesse sua conta e tenha controle total do seu dia.
                        </Typography>
                    </Box>
                </Box>
                <Box // texto ilustrativo
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '99%',
                        borderRadius: '2',
                    }}
                >
                    <Box //1 frase
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minHeight: '16vh',
                            "&:hover": { backgroundColor: "#B3D4F5" , color:"white"},
                            borderRadius: 3,
                            width: '20vw',
                        }}
                    >
                        <Typography variant="h5" fontWeight={600} 
                            sx={{ textAlign: "center"}}
                        >
                            Entre e comece a <br/>transformar suas tarefas <br/>em resultados.
                        </Typography>
                    </Box>
                    <Box //2 frase
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minHeight: '16vh',
                            "&:hover": { backgroundColor: "#B3D4F5" , color:"white"},
                            borderRadius: 3,
                            width: '20vw',
                        }}
                    >
                        <Typography variant="h5" fontWeight={600} 
                            sx={{ textAlign: "center"}}
                        >
                            Planeje suas tarefas, <br/>não suas preocupações.
                        </Typography>
                    </Box>
                    <Box //3 frase
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minHeight: '16vh',
                            "&:hover": { backgroundColor: "#B3D4F5" , color:"white"},
                            borderRadius: 3,
                            width: '20vw',
                        }}
                    >
                        <Typography variant="h5" fontWeight={600} 
                            sx={{ textAlign: "center"}}
                        >
                            Gestão inteligente <br/>do seu tempo.
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
};

export default Index;