import { createContext, useContext, useState, useEffect } from "react";

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Sayfa ilk yüklendiğinde localStorage'dan favorileri al
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Favoriler değiştikçe localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Favori ekle/çıkar (toggle)
  const toggleFavorite = (product) => {
    const exists = favorites.find((item) => item._id === product._id);
    if (exists) {
      setFavorites((prev) => prev.filter((item) => item._id !== product._id));
    } else {
      setFavorites((prev) => [...prev, product]);
    }
  };

  // Favorilerden kaldır (çarpı butonu için)
  const removeFromFavorites = (id) => {
    setFavorites((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <FavoriteContext.Provider
      value={{ favorites, toggleFavorite, removeFromFavorites }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoriteContext);
