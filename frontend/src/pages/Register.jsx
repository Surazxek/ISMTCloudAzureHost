import { useState } from "react";
import api from "../api/api";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      alert("Registered successfully! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleRegister} className="form-card">
        <h1>Register</h1>
        <input
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        <select
          value={form.role}
          onChange={e => setForm({ ...form, role: e.target.value })}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Register</button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
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
          background-image: url('https://himalayanbuilders.com/wp-content/uploads/2023/05/DSC_0192-1024x684.jpg');
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

        .form-card h1 {
          text-align: center;
          margin-bottom: 20px;
          color: #333;
        }

        .form-card input,
        .form-card select {
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
          background-color: #28a745;
          color: #fff;
          font-weight: bold;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .form-card button:hover {
          background-color: #218838;
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

export default Register;
