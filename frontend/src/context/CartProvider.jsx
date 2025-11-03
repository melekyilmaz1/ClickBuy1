import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );

  // Her sepet değişiminde localStorage güncelle
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Sepete ürün ekleme
  const addToCart = (cartItem) => {
    const existingItem = cartItems.find((item) => item._id === cartItem._id);
    if (existingItem) {
      setCartItems((prevCart) =>
        prevCart.map((item) =>
          item._id === cartItem._id
            ? { ...item, quantity: item.quantity + cartItem.quantity }
            : item
        )
      );
    } else {
      setCartItems((prevCart) => [
        ...prevCart,
        {
          ...cartItem,
          quantity: cartItem.quantity || 1,
        },
      ]);
    }
  };

  // Ürünü sepetten çıkar
  const removeFromCart = (itemId) => {
    const filtered = cartItems.filter((item) => item._id !== itemId);
    setCartItems(filtered);
  };

  // Ürün adedini artır
  const increaseQuantity = (productId) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item._id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Ürün adedini azalt (en az 1 olmalı)
  const decreaseQuantity = (productId) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item._id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Sepeti backend'e gönder (isteğe bağlı)
  const updateCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.token) {
        console.error("Kullanıcı oturumu yok.");
        return;
      }

      const response = await fetch("/api/users/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          cart: cartItems.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
          })),
        }),
      });

      if (!response.ok) throw new Error("Sepet güncellenemedi");

      const data = await response.json();
      console.log("✅ Backend sepet güncellendi:", data.cart);
    } catch (err) {
      console.error("❌ Sepet güncellenirken hata:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        updateCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

CartProvider.propTypes = {
  children: PropTypes.node,
};
