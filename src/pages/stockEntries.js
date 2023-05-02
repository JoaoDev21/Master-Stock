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
  
  const StockEntries = () => {
    const [amount, setAmount] = useState("");
    const [product_id, setProduct_id] = useState("0");
    const [listStockEntries, setStockEntries] = useState([]);
    const [listProducts, setListProducts] = useState([]);
    const [date, setDate] = useState("");
  
    useEffect(() => {
      const db_stock_entries = localStorage.getItem("db_stock_entries")
        ? JSON.parse(localStorage.getItem("db_stock_entries"))
        : [];
  
      setStockEntries(db_stock_entries);
  
      const db_products = localStorage.getItem("db_products")
        ? JSON.parse(localStorage.getItem("db_products"))
        : [];
  
      setListProducts(db_products);
    }, []);
  
    const handleNewEntry = () => {
      if (!amount | (product_id === "0") | !date) {
        return alert("Selecione o produto e a quantidade!");
      }
  
      const id = Math.random().toString(36).substring(2);
  
      if (listStockEntries && listStockEntries.length) {
        localStorage.setItem(
          "db_stock_entries",
          JSON.stringify([...listStockEntries, { id, amount, date, product_id }])
        );
  
        setStockEntries([...listStockEntries, { id, amount, date, product_id }]);
      } else {
        localStorage.setItem(
          "db_stock_entries",
          JSON.stringify([{ id, amount, date, product_id }])
        );
  
        setStockEntries([{ id, amount, date, product_id }]);
      }
  
      setAmount("");
      setDate("");
      setProduct_id("0");
    };
  
    const removeEntries = (id) => {
      const newArray = listStockEntries.filter((item) => item.id !== id);
  
      localStorage.setItem("db_stock_entries", JSON.stringify(newArray));
  
      setStockEntries(newArray);
    };
  
    const getProductById = (id) => {
      return listProducts.filter((item) => item.id === id)[0]?.name;
    };
  
    return (
      <Flex h="100vh" flexDirection="column" bgColor={"blue.900"}>
        <Header />
  
        <Flex w="100%" my="6" maxW={1120} mx="auto" px="6" h="100vh">
          <Sidebar />
  
          <Box w="100%">
            <SimpleGrid minChildWidth={200} h="fit-content" spacing="1">
              
              <Input
              color={"gray"}
              placeholder="DATA"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              />

              <Select
                color={"gray"}
                value={product_id}
                onChange={(e) => setProduct_id(e.target.value)}
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
                placeholder="Quantidade"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <Button w="auto" onClick={handleNewEntry}>
                SALVAR
              </Button>
            </SimpleGrid>
  
            <Box overflowY="auto" height="70vh" marginTop={"5"} borderRadius={"10"} /*backgroundColor={"gray.100"}*/>
              <Table 
                mt="0">

                <Thead>
                  <Tr>
                  <Th fontWeight="bold" fontSize="14px" color={"gray"}>
                      DATA
                    </Th>
                    <Th fontWeight="bold" fontSize="14px" color={"gray"}>
                      Nome
                    </Th>
                    <Th fontWeight="bold" fontSize="14px" color={"gray"}>
                      Qtd.
                    </Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {listStockEntries.map((item, i) => (
                    <Tr key={i}>
                      <Td color="gray.500">{item.date}</Td>
                      <Td color="gray.500">{getProductById(item.product_id)}</Td>
                      <Td color="gray.500">{item.amount}</Td>
                      <Td textAlign="end">
                        <Button
                          p="2"
                          h="auto"
                          fontSize={11}
                          color="red.500"
                          fontWeight="bold"
                          onClick={() => removeEntries(item.id)}
                        >
                          DELETAR
                        </Button>
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
  
  export default StockEntries;