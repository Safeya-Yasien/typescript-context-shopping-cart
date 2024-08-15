import { createContext, ReactNode, useContext, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";

type TShoppingCartContext = {
  cartItems: CartItem[];
  openCart: () => void;
  closeCart: () => void;
  cartQuantity: number;
  getItemQuantity: (id: number) => number;
  handleIncrement: (id: number) => void;
  handleDecrement: (id: number) => void;
  handleRemove: (id: number) => void;
};

type TShoppingCartProvider = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
};

export const ShoppingCartContext = createContext<TShoppingCartContext>(
  {} as TShoppingCartContext
);

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

export const ShoppingCartProvider = ({ children }: TShoppingCartProvider) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  //   show / hide shopping cart offcanvas
  const openCart = () => {
    setIsOpen(true);
  };

  const closeCart = () => {
    setIsOpen(false);
  };

  // product operations

  const cartQuantity = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  const getItemQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  const handleIncrement = (id: number) => {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === id) === undefined) {
        return [...currentItems, { id, quantity: 1 }];
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const handleDecrement = (id: number) => {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === id)?.quantity === 1) {
        return currentItems.filter((item) => item.id !== id);
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const handleRemove = (id: number) => {
    setCartItems((currentItems) => {
      return currentItems.filter((item) => item.id !== id);
    });
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        openCart,
        closeCart,
        cartQuantity,
        getItemQuantity,
        handleIncrement,
        handleDecrement,
        handleRemove,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
};
