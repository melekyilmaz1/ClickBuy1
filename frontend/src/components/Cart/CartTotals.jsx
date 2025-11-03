import { useContext, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { CartContext } from "../../context/CartProvider";
import { Spin, message } from "antd";

const CartTotals = () => {
  const [hizliKargoSecili, setHizliKargoSecili] = useState(false);
  const [loading, setLoading] = useState(false);
  const { cartItems } = useContext(CartContext);
  const stripePublicKey = import.meta.env.VITE_API_STRIPE_PUBLIC_KEY;
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const urunToplamlari = cartItems.map((item) => {
    const toplam = item.price * item.quantity;
    return toplam;
  });

  const araToplam = urunToplamlari.reduce((onceki, simdiki) => {
    return onceki + simdiki;
  }, 0);

  const kargoUcreti = 15;

  const genelToplam = hizliKargoSecili
    ? (araToplam + kargoUcreti).toFixed(2)
    : araToplam.toFixed(2);

  const odemeIslemi = async () => {
    setLoading(true);
    if (!user) {
      return message.info("Ödeme yapabilmek için giriş yapmalısınız!");
    }

    const veri = {
      products: cartItems,
      user: user,
      cargoFee: hizliKargoSecili ? kargoUcreti : 0,
    };

    try {
      const stripe = await loadStripe(stripePublicKey);

      const res = await fetch(`${apiUrl}/api/payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(veri),
      });

      if (!res.ok) {
        return message.error("Ödeme işlemi başarısız oldu.");
      }

      const session = await res.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart-totals">
      <h2>Sepet Toplamı</h2>
      <table>
        <tbody>
          <tr className="cart-subtotal">
            <th>Ara Toplam</th>
            <td>
              <span id="subtotal">{araToplam.toFixed(2)}₺</span>
            </td>
          </tr>
          <tr>
            <th>Kargo</th>
            <td>
              <ul>
                <li>
                  <label>
                    Hızlı Kargo: 15₺
                    <input
                      type="checkbox"
                      id="fast-cargo"
                      checked={hizliKargoSecili}
                      onChange={() => setHizliKargoSecili(!hizliKargoSecili)}
                    />
                  </label>
                </li>
                <li>
                  <a href="#">Adresi Değiştir</a>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <th>Genel Toplam</th>
            <td>
              <strong id="cart-total">{genelToplam}₺</strong>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="checkout">
        <Spin spinning={loading}>
          <button className="btn btn-lg" onClick={odemeIslemi}>
            Ödemeye Geç
          </button>
        </Spin>
      </div>
    </div>
  );
};

export default CartTotals;