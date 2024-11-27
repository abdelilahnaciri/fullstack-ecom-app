import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  useDisclosure,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import TableSkeleton from "./TableSkeleton";
import {
  useGetDashboardProductsQuery,
  useRemoveDashboardProductMutation,
} from "../app/services/products";

import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import CustomModel from "../shared/Modal";
import { IAdminProduct } from "../interface";
import { defaultProductObj } from "../data";
import ProductTable from "./ProductTable";
import { useForm } from "react-hook-form";
import FormModal from "./FormModal";
import { Link } from "react-router-dom";
import imgFalBack from "../assets/img-placeholder.png";
import { AiOutlineEye } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";

const DashboardProductsTable = () => {
  // const [selectedProductId, setSelectedProductId] = useState<number | null>(
  //   null
  // );
  // const initialRef = useRef<null | HTMLInputElement>(null);
  const [productToEdit, setProductToEdit] = useState<IAdminProduct>({
    ...defaultProductObj,
  });
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();
  const { isLoading, data } = useGetDashboardProductsQuery({ page: 1 });
  // const [destroyProduct, { isLoading: isDestroying, isSuccess }] =
  //   useRemoveDashboardProductMutation();

  // useEffect(() => {
  //   if (isSuccess) {
  //     setSelectedProductId(null);
  //     onClose();
  //   }
  // }, [isSuccess]);

  // console.log(productToEdit);

  const { register, handleSubmit } = useForm();

  // ** Handlers:
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  // console.log(productToEdit?.title);
  if (isLoading) return <TableSkeleton />;
  // console.log(data);
  // console.log("product to edit:", productToEdit);
  return (
    <>
      <h1>Hello</h1>
      {/* <ProductTable products={data.products} /> */}
      <TableContainer
        maxW={"100%"}
        mx={"auto"}
        css={{
          "&::-webkit-scrollbar": {
            height: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#0987a0",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#0987cd",
          },
        }}
      >
        <Table variant="simple">
          <TableCaption>
            Products Total: {data.products.length ?? 0}
          </TableCaption>
          <Thead>
            <Tr>
              <Th isNumeric>ID</Th>
              <Th>TITLE</Th>
              <Th>CATEGORY</Th>
              <Th>THUMBNAIL</Th>
              <Th isNumeric>PRICE</Th>
              <Th isNumeric>STOCK</Th>
              <Th>ACTION</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.products.map((product: IAdminProduct) => (
              <Tr key={product.id}>
                <Td isNumeric>{product.id}</Td>
                <Td>{product.title}</Td>
                <Td>{product.category.title}</Td>
                <Td>
                  <Image
                    src={`${import.meta.env.VITE_SERVER_URL}${product.thumbnail?.url}`}
                    alt={product.title}
                    w={"80px"}
                    h={"80px"}
                    rounded={"full"}
                    // objectFit={"cover"}
                    fallbackSrc={imgFalBack}
                  />
                </Td>
                <Td isNumeric>{product.price}</Td>
                <Td isNumeric>{product.stock}</Td>
                <Td>
                  <Button
                    as={Link}
                    to={`/products/${product.id}`}
                    colorScheme="purple"
                    variant={"solid"}
                    mr={3}
                    target="_blank"
                    onClick={() => {}}
                  >
                    <AiOutlineEye size={17} />
                  </Button>
                  <Button
                    colorScheme="red"
                    variant={"solid"}
                    mr={3}
                    // onClick={() => {
                    //   onOpen();
                    //   setSelectedProductId(product.id);
                    // }}
                  >
                    <BsTrash size={17} />
                  </Button>
                  <Button
                    colorScheme="blue"
                    variant={"solid"}
                    mr={3}
                    onClick={() => {
                      setProductToEdit(product);
                      onOpenModal();
                    }}
                  >
                    <FiEdit size={17} />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th isNumeric>ID</Th>
              <Th>TITLE</Th>
              <Th>CATEGORY</Th>
              <Th>THUMBNAIL</Th>
              <Th isNumeric>PRICE</Th>
              <Th isNumeric>STOCK</Th>
              <Th>ACTION</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>

      {/* <CustomAlertDialog
        isOpen={isOpen}
        onClose={onClose}
        title={"Are you sure?"}
        description="Do you really want to destroy this product/ This product cannot be undone."
        okTxt="Destroy"
        variant="outline"
        isLoading={isDestroying}
        onOkHandler={() => destroyProduct(selectedProductId)}
      /> */}

      <FormModal
        clickedProduct={productToEdit}
        isOpen={isOpenModal}
        onCloseModal={onCloseModal}
      />
    </>
  );
};

export default DashboardProductsTable;
