import { useState } from "react";
import api from "../api/api";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("role", res.data.user.role);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleLogin} className="form-card">
        <h2 className="school-title">ISMT</h2>
        <h1>Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>

      {/* Embedded CSS */}
      <style>{`
        body {
          margin: 0;
          font-family: Arial, sans-serif;
        }

        .form-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          /* School background image */
          background-image: url('https://ullens.edu.np/wp-content/themes/yootheme/cache/d4/home11banner-d4069d96.jpeg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .form-card {
          background-color: rgba(255, 255, 255, 0.9); /* semi-transparent */
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          width: 320px;
        }

        .school-title {
          text-align: center;
          font-size: 26px;
          font-weight: bold;
          color: #004aad; /* ISMT blue color */
          margin-bottom: 10px;
          letter-spacing: 1px;
        }

        .form-card h1 {
          text-align: center;
          margin-bottom: 20px;
          color: #333;
        }

        .form-card input {
          width: 100%;
          padding: 10px;
          margin-bottom: 15px;
          border-radius: 6px;
          border: 1px solid #ccc;
          font-size: 14px;
        }

        .form-card button {
          width: 100%;
          padding: 10px;
          background-color: #007bff;
          color: #fff;
          font-weight: bold;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .form-card button:hover {
          background-color: #0056b3;
        }

        .form-card p {
          text-align: center;
          font-size: 14px;
          color: #555;
        }

        .form-card a {
          color: #007bff;
          text-decoration: none;
        }

        .form-card a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default Login;
