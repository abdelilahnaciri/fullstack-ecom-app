import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Text,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../app/store";
import { setOnCloseDrawerAction } from "../app/features/cartDrawerSlice";
import { RootState } from "../app/store";
import { setClearCartItemsAction } from "../app/features/cartSlice";
import CartDrawerItem from "./CartDrawerItem";

const CartDrawer = () => {
  const btnRef = useRef<HTMLElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { isOpenDrawer } = useSelector((state: RootState) => state.cartDrawer);
  const { cartItems } = useSelector((state: RootState) => state.cart);

  // ** Handlers:
  const onCloseHandler = () => dispatch(setOnCloseDrawerAction());
  const onClearAllHandler = () => {
    dispatch(setClearCartItemsAction());
    onCloseHandler();
  };

  return (
    <>
      <Drawer
        isOpen={isOpenDrawer}
        placement="right"
        onClose={onCloseHandler}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>
          <DrawerBody>
            <Text textAlign={"right"} fontWeight={"semibold"}>
              Total: $169.99
            </Text>
            {cartItems.map((item) => (
              <CartDrawerItem key={item.id} product={item} />
            ))}
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant="outline"
              mr={3}
              colorScheme="red"
              onClick={onClearAllHandler}
            >
              Clear All
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartDrawer;
