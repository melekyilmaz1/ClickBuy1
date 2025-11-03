import { useContext } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { CartContext } from "../../../context/CartProvider";
import { useFavorites } from "../../../context/FavoriteContext";
import "./Header.css";

const Header = ({ setIsSearchShow }) => {
  const { cartItems } = useContext(CartContext);
  const { favorites } = useFavorites();
  const user = localStorage.getItem("user");
  const { pathname } = useLocation();

  return (
    <header>
      <div className="global-notification">
        <div className="container">
          <p>
          TÜM ÜRÜNLER İÇİN YAZ İNDİRİMİ VE ÜCRETSİZ TESLİMAT - %70'E VARAN İNDİRİM! ŞİMDİ
            <a href="shop.html"> ALIŞVERİŞ YAPIN</a>
          </p>
        </div>
      </div>

      <div className="header-row">
        <div className="container">
          <div className="header-wrapper">
            <div className="header-mobile">
              <i className="bi bi-list" id="btn-menu"></i>
            </div>

            <div className="header-left">
              <Link to="/" className="logo">
               Click-Buy
              </Link>
            </div>

            <div className="header-center" id="sidebar">
              <nav className="navigation">
                <ul className="menu-list">
                  <li className="menu-list-item">
                    <Link
                      to="/"
                      className={`menu-link ${pathname === "/" ? "active" : ""}`}
                    >
                      ANASAYFA <i className="bi bi-chevron-down"></i>
                    </Link>
                  </li>
                  <li className="menu-list-item">
                    <Link
                      to="/shop"
                      className={`menu-link ${pathname === "/shop" ? "active" : ""}`}
                    >
                      TÜM KATEGORİLER <i className="bi bi-chevron-down"></i>
                    </Link>
                  </li>
                  <li className="menu-list-item">
                    <Link
                      to="/contact"
                      className={`menu-link ${pathname === "/contact" ? "active" : ""}`}
                    >
                      İLETİŞİM
                    </Link>
                  </li>
                </ul>
              </nav>
              <i className="bi-x-circle" id="close-sidebar"></i>
            </div>

            <div className="header-right">
              <div className="header-right-links">
                {/* 👤 Kullanıcı */}
                <Link to="/auth" className="header-account">
                  <i className="bi bi-person"></i>
                </Link>

                {/* 🔍 Arama */}
                <button
                  className="search-button"
                  onClick={() => setIsSearchShow(true)}
                >
                  <i className="bi bi-search"></i>
                </button>

                {/* ❤️ Favoriler */}
                <div className="header-favorites">
                  <Link to="/favorites" className="header-fav-link">
                    <i className="bi bi-heart"></i>
                    {favorites.length > 0 && (
                      <span className="favorites-count">{favorites.length}</span>
                    )}
                  </Link>
                </div>

                {/* 🛒 Sepet */}
                <div className="header-cart">
                  <Link to="/cart" className="header-cart-link">
                    <i className="bi bi-bag"></i>
                    {cartItems.length > 0 && (
                      <span className="header-cart-count">{cartItems.length}</span>
                    )}
                  </Link>
                </div>

                {/* 🔓 Çıkış */}
                {user && (
                  <button
                    className="search-button"
                    onClick={() => {
                      if (window.confirm("Çıkış yapmak istediğinize emin misiniz?")) {
                        localStorage.removeItem("user");
                        window.location.href = "/";
                      }
                    }}
                  >
                    <i className="bi bi-box-arrow-right"></i>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  setIsSearchShow: PropTypes.func,
};

export default Header;
