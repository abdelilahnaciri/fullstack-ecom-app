import {
  Button,
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
  useGetDashboardCategoriesQuery,
  useGetDashboardProductsQuery,
  useRemoveDashboardProductMutation,
} from "../app/services/products";

import { useEffect, useState } from "react";
import { IAdminProduct, ICategory } from "../interface";
import { defaultProductObj } from "../data";
import FormModal from "./FormModal";
import { Link } from "react-router-dom";
import imgFalBack from "../assets/img-placeholder.png";
import { AiOutlineEye } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import CustomAlertDialog from "../shared/AlertDialog";
import CreateProductModal from "./CreateProductModal";
import UpdateCategoryModal from "./UpdateCategoryModal";
import CreateCategoryModal from "./CreateCategoryModal";

const DashboardCategoriesTable = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [categoryToEdit, setCategotyToEdit] = useState<ICategory>({
    ...defaultProductObj,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();
  const {
    isOpen: isOpenCreateModal,
    onOpen: onOpenCreateModal,
    onClose: onCloseCreateModal,
  } = useDisclosure();
  const { isLoading, data } = useGetDashboardCategoriesQuery({});
  const [destroyProduct, { isLoading: isDestroying, isSuccess }] =
    useRemoveDashboardProductMutation();

  useEffect(() => {
    if (isSuccess) {
      setSelectedCategoryId(null);
      onClose();
    }
  }, [isSuccess]);

  if (isLoading) return <TableSkeleton />;
  return (
    <>
      <Button
        display={"flex"}
        ml={"auto"}
        mb={"10px"}
        colorScheme="blue"
        onClick={() => {
          // console.log("clicked");
          onOpenCreateModal();
        }}
      >
        Create
      </Button>
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
            Categories Total: {data.categories.length ?? 0}
          </TableCaption>
          <Thead>
            <Tr>
              <Th isNumeric>ID</Th>
              <Th>TITLE</Th>
              <Th isNumeric>ACTION</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.categories.map((category: ICategory) => (
              <Tr key={category.id}>
                <Td isNumeric>{category.id}</Td>
                <Td>{category.title}</Td>
                <Td isNumeric>
                  <Button
                    colorScheme="red"
                    variant={"solid"}
                    mr={3}
                    onClick={() => {
                      onOpen();
                      setSelectedCategoryId(category.id);
                    }}
                  >
                    <BsTrash size={17} />
                  </Button>
                  <Button
                    colorScheme="blue"
                    variant={"solid"}
                    onClick={() => {
                      setCategotyToEdit(category);
                      onOpenModal();
                    }}
                  >
                    <FiEdit size={17} />
                  </Button>
                </Td>
              </Tr>
            ))}
            {/* {data.products.map((product: IAdminProduct) => (
              <Tr key={product.id}>
                <Td isNumeric>{product.id}</Td>
                <Td>{product.title}</Td>
                <Td>{product.category?.title}</Td>
                <Td>
                  <Image
                    src={`${import.meta.env.VITE_SERVER_URL}${product.thumbnail?.url}`}
                    alt={product.title}
                    w={"80px"}
                    h={"80px"}
                    rounded={"full"}
                    objectFit={"cover"}
                    fallbackSrc={imgFalBack}
                  />
                </Td>
                <Td isNumeric>{product.price}</Td>
                <Td isNumeric>{product.stock}</Td>
                <Td>
                  <Button
                    colorScheme="red"
                    variant={"solid"}
                    mr={3}
                    onClick={() => {
                      onOpen();
                      setSelectedProductId(product.id);
                    }}
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
            ))} */}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th isNumeric>ID</Th>
              <Th>TITLE</Th>
              <Th isNumeric>ACTION</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>

      <CustomAlertDialog
        isOpen={isOpen}
        onClose={onClose}
        title={"Are you sure?"}
        description="Do you really want to destroy this product/ This product cannot be undone."
        okTxt="Destroy"
        variant="outline"
        isLoading={isDestroying}
        onOkHandler={() => destroyProduct(selectedCategoryId)}
      />

      <UpdateCategoryModal
        clickedCategory={categoryToEdit}
        isOpen={isOpenModal}
        onCloseModal={onCloseModal}
      />
      <CreateCategoryModal
        isOpen={isOpenCreateModal}
        onCloseModal={onCloseCreateModal}
      />
    </>
  );
};

export default DashboardCategoriesTable;