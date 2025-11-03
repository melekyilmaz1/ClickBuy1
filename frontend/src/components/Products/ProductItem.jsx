import PropTypes from "prop-types";
import { useContext } from "react";
import { CartContext } from "../../context/CartProvider";
import { useFavorites } from "../../context/FavoriteContext";
import "./ProductItem.css";
import { Link } from "react-router-dom";

const ProductItem = ({ productItem }) => {
  const { cartItems, addToCart } = useContext(CartContext);
  const { favorites, toggleFavorite } = useFavorites();

  const originalPrice = productItem.price.current;
  const discountPercentage = productItem.price.discount;
  const discountedPrice =
    originalPrice - (originalPrice * discountPercentage) / 100;

  const isFavorited = favorites.some((item) => item._id === productItem._id);

  return (
    <div className="product-item">
      <div className="product-image">
        <Link to={`/product/${productItem._id}`}>
          <img src={productItem.img[0]} alt={productItem.name} className="img1" />
          {productItem.img[1] && (
            <img src={productItem.img[1]} alt={productItem.name} className="img2" />
          )}
        </Link>
      </div>

      <div className="product-info">
        <Link to={`/product/${productItem._id}`} className="product-title">
          {productItem.name}
        </Link>

        <ul className="product-star">
          <li><i className="bi bi-star-fill"></i></li>
          <li><i className="bi bi-star-fill"></i></li>
          <li><i className="bi bi-star-fill"></i></li>
          <li><i className="bi bi-star-fill"></i></li>
          <li><i className="bi bi-star-half"></i></li>
        </ul>

        <div className="product-prices">
          <strong className="new-price">₺{discountedPrice.toFixed(2)}</strong>
          <span className="old-price">₺{originalPrice.toFixed(2)}</span>
        </div>

        <span className="product-discount">-%{discountPercentage}</span>

        <div className="product-links">
          {/* 🛒 Sepete Ekle */}
          <button
            className="add-to-cart"
            onClick={() =>
              addToCart({
                ...productItem,
                price: discountedPrice,
              })
            }
            title="Sepete Ekle"
          >
            <i className="bi bi-basket-fill"></i>
          </button>

          {/* ❤️ Favori */}
          <button
            className="favorite-button"
            onClick={() => toggleFavorite(productItem)}
            title={isFavorited ? "Favorilerden Çıkar" : "Favorilere Ekle"}
          >
            <i className={isFavorited ? "bi bi-heart-fill" : "bi bi-heart"}></i>
          </button>

          {/* 👁 Ürün Detay */}
          <Link to={`/product/${productItem._id}`} className="product-link" title="Detay">
            <i className="bi bi-eye-fill"></i>
          </Link>

          {/* 🔗 Paylaş */}
          <button className="product-share" title="Paylaş">
            <i className="bi bi-share-fill"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

ProductItem.propTypes = {
  productItem: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    img: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.shape({
      current: PropTypes.number.isRequired,
      discount: PropTypes.number.isRequired,
    }).isRequired,
  }),
};

export default ProductItem;
