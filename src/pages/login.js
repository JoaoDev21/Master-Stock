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
    useDisclosure
} from "@chakra-ui/react";
import React, { useState } from 'react';
import { Image } from '@chakra-ui/react'
import { relative } from "path";

const Login = () => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const validUserLogin = () => {

        if (!user || !password) {
            alert()
        } 
        else {
            window.location.href = "/";
        }
        //window.location.href = "/";
    };

    return (

        <Flex 
            h="100vh" 
            flexDir="column" 
            bgColor={"blue.900"}
        >
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
                    
                    <Button w="auto" marginTop={"2"} onClick={validUserLogin}>
                        SALVAR
                    </Button>
                     
                </Box>
            </Flex>
        </Flex>
    )
}

export default Login;