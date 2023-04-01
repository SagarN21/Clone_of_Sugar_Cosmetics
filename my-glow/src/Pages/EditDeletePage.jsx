import {
  Box,
  Heading,
  Image,
  Text,
  Tag,
  Grid,
  Button,
  Flex,
  Spacer,
  useToast,
  Center,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteProduct,
  getSingleProduct,
  get_products,
} from "../Redux/productReducer/action";
import { BsStarHalf, BsCart4, BsCart2 } from "react-icons/bs";
import Sidebar from "../Components/Sidebar";
import { useNavigate } from "react-router-dom";

export const EditDeletePage = () => {
  const [cartIcon, setCartIcon] = useState(false);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => {
    // console.log(state.productReducer.products);
    return state.productReducer;
  });

  const state = useSelector((state)=>{
    return state
  })
  const toast = useToast();

  const handleEdit = (e) => {
    dispatch(getSingleProduct(e.target.id))
      .then(() => navigate("/edit"))
      .catch((err) => console.log(err));
  };

  const handleDelete = (e) => {
    console.log(e.target.id);
    dispatch(deleteProduct(e.target.id))
      .then((res) => {
        dispatch(get_products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let count = false;

  useEffect(() => {
    dispatch(get_products);
  }, []);
  return (
    <Box w="70%" ml="4rem">
      <Flex gap={"10%"}>
        <Sidebar />
        <Center>
          <Box>
            <Heading color="red" mb={"5%"}>
              Admin Panel
            </Heading>
            <Center>
              <Grid templateColumns="repeat(5, 1fr)" gap={10}>
                {products.length !== 0 &&
                  products.map((item) => {
                    return (
                      <Box
                        key={item.id}
                        boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px"
                        textAlign="center"
                        p={"1rem .5rem"}
                        borderRadius="8px"
                        lineHeight={"25px"}
                      >
                        <Image src={item.image1} height="15rem" m="auto" />
                        <Text>{item.title}</Text>
                        <Text>{item.brand}</Text>
                        <Tag
                          d={"inline"}
                          bg="white"
                          color="grey"
                          textDecoration="line-through"
                          fontSize={".8rem"}
                        >
                          Rs.200
                        </Tag>
                        <Tag d={"inline"} bg="white">
                          Rs.{item.price}
                        </Tag>
                        <Tag d={"inline"} bg="white" color="pink.300">
                          {item.discount}%Off
                        </Tag>

                        <Text>
                          {item.rating}{" "}
                          <Tag bg="white">
                            <BsStarHalf color="red" />
                          </Tag>
                        </Text>

                        <Flex w="90%" m="auto">
                          <Button
                            fontSize="1.5rem"
                            bg="pink.100"
                            onClick={handleEdit}
                            id={item.id}
                          >
                            Edit
                          </Button>
                          <Spacer />
                          <Button
                            p={"1rem 2rem"}
                            bg="pink.100"
                            id={item.id}
                            onClick={(e) => handleDelete(e)}
                          >
                            Delete
                          </Button>
                        </Flex>
                      </Box>
                    );
                  })}
              </Grid>
            </Center>
            <Box m={"2rem 1rem"}>
              <Button bg="pink.100">Previous</Button>
              <Button mr={"1rem"} ml={"1rem"}>
                {page}
              </Button>
              <Button bg="pink.100">Next</Button>
            </Box>
          </Box>
        </Center>
      </Flex>
    </Box>
  );
};