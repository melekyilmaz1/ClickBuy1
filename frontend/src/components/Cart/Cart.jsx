import { useContext } from "react";
import { CartContext } from "../../context/CartProvider";
import "./Cart.css";
import CartCoupon from "./CartCoupon";
import CartProgress from "./CartProgress";
import CartTable from "./CartTable";
import CartTotals from "./CartTotals";

const Cart = () => {
  const { cartItems, updateCart } = useContext(CartContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateCart();               // Backend'e sepeti gönder
    window.location.reload();         // Sayfayı yeniden yükle (kaldığı yerde kalır)
  };

  return (
    <section className="cart-page">
      <div className="container">
        {cartItems.length > 0 ? (
          <div className="cart-page-wrapper">
            <form className="cart-form" onSubmit={handleSubmit}>
              <CartProgress />
              <div className="shop-table-wrapper">
                <CartTable />
                <CartCoupon />
              </div>
              <button type="submit" className="update-cart-btn">
                Sepeti Güncelle
              </button>
            </form>
            <div className="cart-collaterals">
              <CartTotals />
            </div>
          </div>
        ) : (
          <h2>Sepetinizde ürün bulunmamaktadır!</h2>
        )}
      </div>
    </section>
  );
};

export default Cart;
