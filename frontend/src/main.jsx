import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Layout } from "./layouts/Layout";
import CartProvider from "./context/CartProvider";
import { FavoriteProvider } from "./context/FavoriteContext"; // ✅ Favori context eklendi
import App from "./App";
import ScrollToTop from "./components/ScrollToTop";

// ✅ Slick carousel CSS (slider için gerekli)
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// ✅ Kendi genel stilin
import "./index.css";

// React uygulamasını başlat
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ScrollToTop />
    <CartProvider>
      <FavoriteProvider> {/* ✅ FAVORİLER PROVIDER İLE SARMALANDI */}
        <Layout>
          <App />
        </Layout>
      </FavoriteProvider>
    </CartProvider>
  </BrowserRouter>
);
