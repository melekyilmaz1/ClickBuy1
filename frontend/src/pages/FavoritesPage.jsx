import { useFavorites } from "../context/FavoriteContext";
import Header from "../components/Layout/Header/Header";
import "./FavoritesPage.css";

const FavoritesPage = () => {
  const { favorites, removeFromFavorites } = useFavorites();

  const handleRemoveFavorite = (id) => {
    removeFromFavorites(id);
  };

  return (
    <>
      <main className="favorites-page">
        <div className="container">
          <h2>Favori Ürünleriniz</h2>

          {favorites.length === 0 ? (
            <p>Henüz favori ürün eklenmedi.</p>
          ) : (
            <div className="favorites-table">
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>Ürün</th>
                    <th>Fiyat</th>
                  </tr>
                </thead>
                <tbody>
                  {favorites.map((product) => {
                    const discounted =
                      product.price.current -
                      (product.price.current * product.price.discount) / 100;

                    return (
                      <tr key={product._id}>
                        <td>
                          <button
                            className="favorite-remove"
                            onClick={() => handleRemoveFavorite(product._id)}
                          >
                            <i className="bi bi-x"></i>
                          </button>
                        </td>
                        <td className="favorite-product">
                          <img
                            src={product.img[0]}
                            alt={product.name}
                            className="favorite-img"
                          />
                          <span>{product.name}</span>
                        </td>
                        <td>
                          <strong>₺{discounted.toFixed(2)}</strong>
                          <br />
                          <small className="old-price">
                            ₺{product.price.current.toFixed(2)}
                          </small>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default FavoritesPage;
