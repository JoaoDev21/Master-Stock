import {
    Box,
    Button,
    Center,
    Divider,
    Flex,
    Input,
    SimpleGrid,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    CloseButton,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from 'react';
import { Image } from '@chakra-ui/react'
import Head from "next/head";
import { relative } from "path";


const Login = () => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [resetEmail, setResetEmail] = useState("");
    const [showResetPopup, setShowResetPopup] = useState(false);

    const validUserLogin = () => {

        if (!user || !password) {
            alert("Preencha os campos de Usuario e Senha!")
        } 
        else {
            window.location.href = "/";
        }
    };
    const sendResetLink  = () => {
        if(resetEmail === ''){
            alert('Preencha o campo E-mail!')
        }
        else{
            alert(`Um link de recuperação foi enviado para ${resetEmail}`);
        }
    }
    const closeAlert = () => {

    }

    return (

        <Flex 
         
            h="100vh" 
            flexDir="column" 
            bgColor={"blue.900"}
        >
            <Head>
                <title>PROD. X-GLOBAL</title>
            </Head>
            <Flex 
                w="30%" 
                my="6" 
                maxW={1120} 
                mx="auto" 
                px="6" 
                h="90vh" 
                //bgColor={"gray.500"} 
                borderRadius={"15"}
                bgColor={"blue.900"}
            >
                <Box 
                    w="100%"
                    my={"30%"}
                    //bg={asPath === "/login" ? "gray.200" : ""}
                >
                    <Image
                        borderRadius='completo'
                        boxSize=''
                        ml={""}
                        src='https://plataforma.xglobal.com.br/static/media/logo_xglobal.278ac71e.png'
                        alt='X-Global'
                    />
                    <Input
                        my={"5"}
                        mt={"10"}
                        color={"gray.500"}
                        placeholder="USUÁRIO"
                        type="text"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                    />

                    <Input
                        my={"5"}
                        placeholder="SENHA"
                        color={"gray.500"}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button 
                    w="auto" 
                    marginTop={"0"} 
                    bg={"0"} 
                    color={"red"} 
                    onClick={() => setShowResetPopup(true)}
                    >
                        Esqueceu a senha?
                    </Button><br></br>

                    <Button 
                    w="auto" 
                    marginTop={"4"} 
                    //bg={"gray"} 
                    color={"black"} 
                    onClick={validUserLogin}
                    >
                        Entrar
                    </Button>

    
                </Box>
            </Flex>
            {showResetPopup && (
                <Box
                    position="fixed"
                    top="0"
                    left="0"
                    right="0"
                    bottom="0"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    bgColor="rgba(0, 0, 0, 0.5)"
                >
                    <Box
                        bg="white"
                        p="4"
                        borderRadius="md"
                        boxShadow="lg"
                        maxW="400px"
                        w="100%"
                    >
                        <CloseButton
                            position="absolute"
                            right="2"
                            top="2"
                            onClick={() => setShowResetPopup(false)}
                        />
                        <Text mb="4">Digite seu e-mail para redefinir a senha:</Text>
                        <Box mb="4" position="relative" visibility={false}>
                            <Input
                                placeholder="E-mail"
                                value={resetEmail}
                                borderColor={resetEmail === '' ? 'red' : 'gray.300'}
                                //borderColor={resetEmail === '' ? 'red' : 'gray.300'}
                                onChange={(e) => setResetEmail(e.target.value)}
                            />
                            {resetEmail === '' && (
                                <Text color="red.500" position="absolute" bottom="-20px" left="0">
                                    Preencha o campo E-mail
                                </Text>
                            )}
                        </Box>
                        <Button colorScheme="blue" top={"8px"} onClick={() => {
                            //closeAlert();
                            sendResetLink();
                            setShowResetPopup(false); // Fechar o modal após enviar o link
                        }}>
                            Enviar link de recuperação
                        </Button>
                        <Button top={"8px"} ml="50" onClick={() => {
                            setShowResetPopup(false); // Fechar o modal após enviar o link
                        }}>
                            Cancelar
                        </Button>
                    </Box>
                </Box>
            )}
        </Flex>
    )
}

export default Login;