import {
    Box,
    Button,
    Flex,
    Input,
    Select,
    SimpleGrid,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
  } from "@chakra-ui/react";
  import React, { useEffect, useState } from "react";
  import Header from "../components/Header";
  import Sidebar from "../components/Sidebar";
  import Head from "next/head";
  
  const StockOutputs = () => {
    const [amount, setAmount] = useState("");
    const [company, setCompany] = useState("");
    const [date, setDate] = useState("");
    const [product_id, setProduct_id] = useState("0");
    const [listStockOutputs, setStockOutputs] = useState([]);
    const [listProducts, setListProducts] = useState([]);
    const [editingOutputId, setEditingOutputId] = useState(null);
    const [editingAmount, setEditingAmount] = useState("");
    const [editingCompany, setEditingCompany] = useState("");
    const [editingDate, setEditingDate] = useState("");
    const [editingProductId, setEditingProductId] = useState("0");
    const [editingProductName, setEditingProductName] = useState(""); // Novo estado para nome do produto
  
    useEffect(() => {
      const db_stock_outputs = localStorage.getItem("db_stock_outputs")
        ? JSON.parse(localStorage.getItem("db_stock_outputs"))
        : [];
  
      setStockOutputs(db_stock_outputs);
  
      const db_products = localStorage.getItem("db_products")
        ? JSON.parse(localStorage.getItem("db_products"))
        : [];
  
      setListProducts(db_products);
    }, []);
  
    const handleNewOutput = () => {
      if (!amount || product_id === "0" || !date || !company) {
        return alert("Selecione o produto e a quantidade!");
      }
  
      const id = Math.random().toString(36).substring(2);
  
      if (listStockOutputs && listStockOutputs.length) {
        localStorage.setItem(
          "db_stock_outputs",
          JSON.stringify([...listStockOutputs, { id, amount, date, company, product_id }])
        );
  
        setStockOutputs([...listStockOutputs, { id, amount, date, company, product_id }]);
      } else {
        localStorage.setItem(
          "db_stock_outputs",
          JSON.stringify([{ id, amount, date, company, product_id }])
        );
  
        setStockOutputs([{ id, amount, date, company, product_id }]);
      }
  
      setAmount("");
      setCompany("");
      setDate("");
      setProduct_id("0");
    };
  
    const removeOutput = (id) => {
      const newArray = listStockOutputs.filter((item) => item.id !== id);
  
      localStorage.setItem("db_stock_outputs", JSON.stringify(newArray));
  
      setStockOutputs(newArray);
    };
  
    const getProductById = (id) => {
      return listProducts.filter((item) => item.id === id)[0]?.name;
    };
  
    //________________________________________________________________________________________
    const startEditing = (output) => {
      setEditingOutputId(output.id);
      setEditingAmount(output.amount);
      setEditingCompany(output.company);
      setEditingDate(output.date);
      setEditingProductId(output.product_id);
      setEditingProductName(getProductById(output.product_id)); // Preenche o nome do produto
    };
  
    const cancelEditing = () => {
      setEditingOutputId(null);
      setEditingAmount("");
      setEditingCompany("");
      setEditingDate("");
      setEditingProductId("0");
      setEditingProductName(""); // Limpa o nome do produto
    };
  
    const saveEditing = () => {
      if (!editingAmount || editingProductId === "0" || !editingDate || !editingCompany) {
        return alert("Preencha todos os campos!");
      }
  
      const updatedOutputs = listStockOutputs.map((output) =>
        output.id === editingOutputId
          ? {
              ...output,
              amount: editingAmount,
              company: editingCompany,
              date: editingDate,
              product_id: editingProductId,
            }
          : output
      );
  
      localStorage.setItem("db_stock_outputs", JSON.stringify(updatedOutputs));
      setStockOutputs(updatedOutputs);
  
      cancelEditing();
    };
    //________________________________________________________________________________________
  
    return (
      <Flex h="100vh" flexDirection="column" bgColor={"blue.900"}>
        <Head>
          <title>PROD. X-GLOBAL</title>
        </Head>
        <Header />
  
        <Flex w="100%" my="6" maxW={1400} mx="auto" px="6" h="100vh">
          <Sidebar />
  
          <Box w="100%">
            <SimpleGrid minChildWidth={160} h="fit-content" spacing="1">
              <Input
                color={"gray"}
                placeholder="DATA"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <Input
                color={"gray"}
                placeholder="Empresa"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
              <Select
                color={"gray"}
                value={product_id}
                onChange={(e) => setProduct_id(e.target.value)}
              >
                <option value="0">Produto</option>
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
                placeholder="Quantidade"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <Button w="auto" onClick={handleNewOutput}>
                SALVAR
              </Button>
            </SimpleGrid>
  
            <Box overflowY="auto" height="70vh" my={"5"}>
              <Table mt="0">
                <Thead>
                  <Tr>
                    <Th fontWeight="bold" fontSize="14px" color={"gray"}>
                      DATA
                    </Th>
                    <Th fontWeight="bold" fontSize="14px" color={"gray"}>
                      EMPRESA
                    </Th>
                    <Th fontWeight="bold" fontSize="14px" color={"gray"}>
                      Produto
                    </Th>
                    <Th fontWeight="bold" fontSize="14px" color={"gray"}>
                      Qtd.
                    </Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {listStockOutputs.map((output, index) => (
                    <Tr key={index}>
                      <Td color="gray.500">
                        {editingOutputId === output.id ? (
                          <Input
                            color={"gray"}
                            type="date"
                            value={editingDate}
                            onChange={(e) => setEditingDate(e.target.value)}
                          />
                        ) : (
                          output.date
                        )}
                      </Td>
                      <Td color="gray.500">
                        {editingOutputId === output.id ? (
                          <Input
                            color={"gray"}
                            placeholder="Empresa"
                            type="text"
                            value={editingCompany}
                            onChange={(e) => setEditingCompany(e.target.value)}
                          />
                        ) : (
                          output.company
                        )}
                      </Td>
                      <Td color="gray.500">
                        {editingOutputId === output.id ? (
                          <Select
                            color={"gray"}
                            value={editingProductId}
                            onChange={(e) => setEditingProductId(e.target.value)}
                          >
                            <option value="0">Produto</option>
                            {listProducts.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.name}
                              </option>
                            ))}
                          </Select>
                        ) : (
                          getProductById(output.product_id)
                        )}
                      </Td>
                      <Td color="gray.500">
                        {editingOutputId === output.id ? (
                          <Input
                            color={"gray"}
                            placeholder="Quantidade"
                            type="number"
                            value={editingAmount}
                            onChange={(e) => setEditingAmount(e.target.value)}
                          />
                        ) : (
                          output.amount
                        )}
                      </Td>
                      <Td textAlign="end">
                        {editingOutputId === output.id ? (
                          <>
                            <Button
                              p="1"
                              width={"20"}
                              h="auto"
                              fontSize={11}
                              color="green.500"
                              fontWeight="bold"
                              onClick={saveEditing}
                            >
                              SALVAR
                            </Button>
                            <Button
                              p="1"
                              width={"20"}
                              h="auto"
                              ml={2}
                              fontSize={11}
                              color="red.500"
                              fontWeight="bold"
                              onClick={cancelEditing}
                            >
                              CANCELAR
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              p="2"
                              h="auto"
                              fontSize={11}
                              color="blue.500"
                              fontWeight="bold"
                              onClick={() => startEditing(output)}
                            >
                              EDITAR
                            </Button>
                            <Button
                              p="2"
                              h="auto"
                              ml={2}
                              fontSize={11}
                              color="red.500"
                              fontWeight="bold"
                              onClick={() => removeOutput(output.id)}
                            >
                              DELETAR
                            </Button>
                          </>
                        )}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </Box>
        </Flex>
      </Flex>
    );
  };
  
  export default StockOutputs;
  