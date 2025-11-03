import { useState } from "react";
import PropTypes from "prop-types";
import { message } from "antd";

const ReviewForm = ({ singleProduct, setSingleProduct }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const handleRatingChange = (e, newRating) => {
    e.preventDefault();
    setRating(newRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      return message.warning("Puan seçiniz!");
    }

    const newReview = {
      text: review,
      rating: parseInt(rating),
      user: user.id || user._id,
    };

    try {
      const res = await fetch(`${apiUrl}/api/products/${singleProduct._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reviews: [...singleProduct.reviews, newReview],
        }),
      });

      if (!res.ok) {
        message.error("Bir şeyler yanlış gitti.");
        return;
      }

      setSingleProduct((prev) => ({
        ...prev,
        reviews: [...prev.reviews, newReview],
      }));

      setReview("");
      setRating(0);
      message.success("Yorum başarıyla eklendi.");
    } catch (error) {
      console.log(error);
      message.error("Bir şeyler yanlış gitti.");
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <p className="comment-notes">
        E-posta adresiniz yayınlanmayacak. Gerekli alanlar
        <span className="required">*</span> ile işaretlenmiştir.
      </p>
      <div className="comment-form-rating">
        <label>
          Puanınız
          <span className="required">*</span>
        </label>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((val) => (
            <a
              key={val}
              href="#"
              className={`star ${rating === val ? "active" : ""}`}
              onClick={(e) => handleRatingChange(e, val)}
            >
              {[...Array(val)].map((_, i) => (
                <i key={i} className="bi bi-star-fill"></i>
              ))}
            </a>
          ))}
        </div>
      </div>

      <div className="comment-form-comment form-comment">
        <label htmlFor="comment">
          Yorumunuz
          <span className="required">*</span>
        </label>
        <textarea
          id="comment"
          cols="50"
          rows="10"
          onChange={(e) => setReview(e.target.value)}
          value={review}
          required
        ></textarea>
      </div>

      <div className="comment-form-cookies">
        <input id="cookies" type="checkbox" />
        <label htmlFor="cookies">
          Bir sonraki yorumum için adımı, e-posta adresimi ve site adresimi bu
          tarayıcıya kaydet.
        </label>
      </div>

      <div className="form-submit">
        <input type="submit" className="btn submit" value="Yorumu Gönder" />
      </div>
    </form>
  );
};

export default ReviewForm;

ReviewForm.propTypes = {
  singleProduct: PropTypes.object,
  setSingleProduct: PropTypes.func,
};
