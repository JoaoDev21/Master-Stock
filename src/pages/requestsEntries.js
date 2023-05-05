import {
    Box,
    Select,
    Button,
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
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
  import Header from "../components/Header";
  import Sidebar from "../components/Sidebar";
  //import requests from "../components/requests"
  
  const requestsEntries = () => {

    const [date, setDate] = useState("");
    const [client, setClient] = useState("");
    const [qtd, setQtd] = useState("");
    const [modelBatery, setModelBatery] = useState("");
    const [modelEquipament, setModelEquipament] = useState("");
    const [plate, setPlate] = useState("");
    const [listProducts, setListProducts] = useState([]);

    useEffect(() => {
    const db_products = localStorage.getItem("db_products")
      ? JSON.parse(localStorage.getItem("db_products"))
      : [];

    setListProducts(db_products);
  }, []);

  const handleNewProduct = () => {
    if (!name) return;
    if (verifyProductName()) {
      alert("Produto já cadastrado!");
      return;
    }

    const id = Math.random().toString(36).substring(2);

    if (listProducts && listProducts.length) {
      localStorage.setItem(
        "db_products",
        JSON.stringify([...listProducts, { id, name }])
      );

      setListProducts([...listProducts, { id, name }]);
    } else {
      localStorage.setItem("db_products", JSON.stringify([{ id, name }]));

      setListProducts([{ id, name }]);
    }

    setDate("");
    setClient("");
    setQtd("");
    setModelEquipament("");
    setModelBatery("");
    setPlate("");
  };

  const verifyProductName = () => {
    return !!listProducts.find((prod) => prod.name === name);
  };

  const getProductById = (id) => {
    return listProducts.filter((item) => item.id === id)[0]?.name;
  };

  const removeRequest = (id) => {
    const db_stock_outputs = localStorage.getItem("db_stock_outputs")
      ? JSON.parse(localStorage.getItem("db_stock_outputs"))
      : [];

    const db_stock_entries = localStorage.getItem("db_stock_entries")
      ? JSON.parse(localStorage.getItem("db_stock_entries"))
      : [];

    const hasOutputs = db_stock_outputs.filter(
      (item) => item.product_id === id
    ).length;
    const hasEntries = db_stock_entries.filter(
      (item) => item.product_id === id
    ).length;

    if (hasEntries || hasOutputs) {
      alert("Esse produto possuí movimentações!");
      return;
    }

    const newArray = listProducts.filter((prod) => prod.id !== id);

    localStorage.setItem("db_products", JSON.stringify(newArray));

    setListProducts(newArray);
  };

    return(
      <Flex h="100vh" flexDirection="column" bgColor={"blue.900"}>
        <Header />
        
        <Flex w="100%" my="6" maxW={1120} mx="auto" px="6" h="100vh">
          <Sidebar />

          <Box w="100%" >

            <SimpleGrid minChildWidth={150} h="fit-content" spacing="1">
              <Input
                color={"gray"}
                value={date}
                type="date"
                onChange={(e) => setDate(e.target.value)}
              />
              <Input
                color={"gray"}
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder="CLIENTE"
              />
              <Input
                color={"gray"}
                value={qtd}
                type="number"
                onChange={(e) => setQtd(e.target.value)}
                placeholder="QTD."
              />
              <Select
                color={"gray"}
                value={modelEquipament}
                onChange={(e) => modelEquipament(e.target.value)}
              >
                <option value="0">Selecione um item</option>
                {listProducts &&
                  listProducts.length > 0 &&
                  listProducts.map((item, i) => (
                    <option key={i} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </Select>
              
              <Input
                color={"gray"}
                value={modelBatery}
                onChange={(e) => setModelBatery(e.target.value)}
                placeholder="BATERIA"
              />
              <Input
                color={"gray"}
                value={plate}
                onChange={(e) => setPlate(e.target.value)}
                placeholder="Placa"
              />
              <Button w="40" onClick={handleNewProduct}>
                CADASTRAR
              </Button>

            </SimpleGrid>
          </Box>

          <Box
            overflowY="auto" 
            height="70vh" 
            marginTop={"5"} 
            borderRadius={"10"}
          >
            <Table 
              mt="0" 
            >
                
              <Thead>
                <Tr>
                  <Th fontWeight="bold" fontSize="14px" color={"gray"}>
                    DATA
                  </Th>
                  <Th fontWeight="bold" fontSize="14px" color={"gray"}>
                    CLIENTE
                  </Th>
                  <Th fontWeight="bold" fontSize="14px" color={"gray"}>
                    QTD.
                  </Th>
                  <Th fontWeight="bold" fontSize="14px" color={"gray"}>
                    BATERIA
                  </Th>
                  <Th fontWeight="bold" fontSize="14px" color={"gray"}>
                    EQUIPAMENTO
                  </Th>
                  <Th fontWeight="bold" fontSize="14px" color={"gray"}>
                    PLACA
                  </Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {listProducts.map((item, i) => (
                  <Tr key={i}>
                    <Td color="gray.500">{item.date}</Td>
                    <Td color="gray.500">{item.client}</Td>
                    <Td color="gray.500">{item.qtd}</Td>
                    <Td color="gray.500">{item.modelBatery}</Td>
                    <Td color="gray.500">{item.modelEquipament}</Td>
                    <Td color="gray.500">{item.plate}</Td>

                    
                    
                    <Td textAlign="end">
                      <Button
                        p="2"
                        h="auto"
                        fontSize={11}
                        color="red.500"
                        fontWeight="bold"
                        onClick={() => removeRequest(item.id)}
                      >
                        DELETAR
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Flex>
      </Flex>
    )

  };
  export default requestsEntries