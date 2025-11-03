import PropTypes from "prop-types";
import { useContext } from "react";
import { CartContext } from "../../context/CartProvider";

const CartItem = ({ cartItem }) => {
  const {
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  return (
    <tr className="cart-item">
      <td></td>
      <td className="cart-image">
        <img src={cartItem.img[0]} alt="" />
        <i
          className="bi bi-x delete-cart"
          onClick={() => removeFromCart(cartItem._id)}
        ></i>
      </td>
      <td>{cartItem.name}</td>
      <td>₺{cartItem.price.toFixed(2)}</td>
      <td className="product-quantity">
        <div className="quantity-buttons">
          <button
            type="button"
            onClick={() => decreaseQuantity(cartItem._id)}
            className="qty-btn"
          >
            –
          </button>
          <span className="qty-display">{cartItem.quantity}</span>
          <button
            type="button"
            onClick={() => increaseQuantity(cartItem._id)}
            className="qty-btn"
          >
            +
          </button>
        </div>
      </td>
      <td className="product-subtotal">
        ₺{(cartItem.price * cartItem.quantity).toFixed(2)}
      </td>
    </tr>
  );
};

export default CartItem;

CartItem.propTypes = {
  cartItem: PropTypes.object,
};
