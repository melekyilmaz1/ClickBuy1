import { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Login = ({ role }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/auth/${role}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data));
        message.success("Giriş başarılı.");
        navigate("/");
      } else {
        message.error("Giriş başarısız.");
      }
    } catch (error) {
      console.log("Login hatası:", error);
    }
  };

  return (
    <div className="account-column">
      <h2>{role.charAt(0).toUpperCase() + role.slice(1)} Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            <span>Email <span className="required">*</span></span>
            <input type="text" name="email" onChange={handleInputChange} required />
          </label>
        </div>
        <div>
          <label>
            <span>Password <span className="required">*</span></span>
            <input type="password" name="password" onChange={handleInputChange} required />
          </label>
        </div>
        <p className="remember">
          <label>
            <input type="checkbox" /> <span>Remember me</span>
          </label>
          <button className="btn btn-sm">Login</button>
        </p>
      </form>
    </div>
  );
};

Login.propTypes = { role: PropTypes.string.isRequired };
export default Login;
