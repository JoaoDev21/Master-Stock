import {
  Box,
  Button,
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
import Head from "next/head";
import { MongoClient } from 'mongodb';

const mongoURI = 'mongodb://localhost:27017';
const dbName = 'Master-Estoque';
const collectionName = 'products';

const Produtos = () => {
  const [name, setName] = useState("");
  const [listProducts, setListProducts] = useState([]);
  const [editedProductId, setEditedProductId] = useState("");
  const [editedProductName, setEditedProductName] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const client = new MongoClient(mongoURI);
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection(collectionName);
      const result = await collection.find({}).toArray();
      setListProducts(result);
      await client.close();
    } catch (error) {
      console.error('Erro ao recuperar produtos do MongoDB:', error);
    }
  };

  const handleNewProduct = async () => {
    if (!name) return;
    const exists = await verifyProductName();
    if (exists) {
      alert("Produto já cadastrado!");
      return;
    }

    const id = Math.random().toString(36).substring(2);

    try {
      const client = new MongoClient(mongoURI);
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection(collectionName);

      const newProduct = { id, name };
      await collection.insertOne(newProduct);

      setListProducts([...listProducts, newProduct]);
      setName("");

      await client.close();
    } catch (error) {
      console.error('Erro ao inserir produto no MongoDB:', error);
    }
  };

  const verifyProductName = async () => {
    try {
      const client = new MongoClient(mongoURI);
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection(collectionName);
      const existingProduct = await collection.findOne({ name });
      await client.close();
      return !!existingProduct;
    } 
    catch (error) {
      console.error('Erro ao verificar produto no MongoDB:', error);
      return false;
    }
  };

  const removeProduct = async (id) => {
    try {
      const client = new MongoClient('mongodb://localhost:27017');
      await client.connect();
      const db = client.db('Master-Estoque');
      const collection = db.collection('products');

      // ... Lógica para verificar movimentações

      await collection.deleteOne({ id });
      const newArray = listProducts.filter((prod) => prod.id !== id);
      setListProducts(newArray);

      await client.close();
    } catch (error) {
      console.error('Erro ao remover produto do MongoDB:', error);
    }
  };

  const cancelEdit = () => {
    setEditedProductId("");
    setEditedProductName("");
  };

  const editProduct = async (id) => {
    try {
      const client = new MongoClient('mongodb://localhost:27017');
      await client.connect();
      const db = client.db('Master-Estoque');
      const collection = db.collection('products');

      const updatedProducts = listProducts.map((product) => {
        if (product.id === id) {
          return { ...product, name: editedProductName };
        }
        return product;
      });

      await collection.updateOne({ id }, { $set: { name: editedProductName } });
      setListProducts(updatedProducts);
      setEditedProductId("");
      setEditedProductName("");

      await client.close();
    } catch (error) {
      console.error('Erro ao editar produto no MongoDB:', error);
    }
  };

  return (
    <Flex h="100vh" flexDirection="column" bgColor={"blue.900"}>
      <Head>
        <title>PROD. X-GLOBAL</title>
      </Head>
      <Header />

      <Flex w="100%" my="6" maxW={1440} mx="auto" px="6" h="100vh">
        <Sidebar />

        <Box w="100%">
          <SimpleGrid minChildWidth={240} h="fit-content" spacing="6">
            <Input
              color={"gray"}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome do produto"
            />
            <Button w="40" onClick={handleNewProduct}>
              CADASTRAR
            </Button>
          </SimpleGrid>

          <Box overflowY="auto" height="70vh" my={"5"}>
            <Table mt="0" borderInline={"black"}>
              <Thead>
                <Tr>
                  <Th fontWeight="bold" fontSize="14px" color={"gray"}>
                    Nome
                  </Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {listProducts.map((item, i) => (
                  <Tr key={i}>
                    <Td>
                      {item.id !== editedProductId ? (
                        <Text color="gray.500">{item.name}</Text>
                      ) : (
                        <Input
                          color="gray"
                          value={editedProductName}
                          onChange={(e) => setEditedProductName(e.target.value)}
                          placeholder="Novo nome"
                        />
                      )}
                    </Td>
                    <Td textAlign="end">
                      {item.id !== editedProductId ? (
                        <>
                          <Button
                            p="2"
                            h="auto"
                            fontSize={11}
                            color="blue.500"
                            fontWeight="bold"
                            onClick={() => {
                              setEditedProductId(item.id);
                              setEditedProductName(item.name);
                            }}
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
                            onClick={() => removeProduct(item.id)}
                          >
                            DELETAR
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            p="2"
                            h="auto"
                            fontSize={11}
                            color="green.500"
                            fontWeight="bold"
                            onClick={() => editProduct(item.id)}
                          >
                            SALVAR
                          </Button>
                          <Button
                            p="2"
                            h="auto"
                            ml={2}
                            fontSize={11}
                            color="red.500"
                            fontWeight="bold"
                            onClick={() => cancelEdit()}
                          >
                            CANCELAR
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

export default Produtos;

