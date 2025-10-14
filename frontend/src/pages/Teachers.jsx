import { useEffect, useState } from "react";
import api from "../api/api";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", subject: "" });
  const [editingId, setEditingId] = useState(null);

  // Fetch all teachers
  const fetchTeachers = async () => {
    try {
      const res = await api.get("/teachers");
      setTeachers(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch teachers");
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  // Handle form submit (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/teachers/${editingId}`, form);
        setEditingId(null);
      } else {
        await api.post("/teachers", form);
      }
      setForm({ name: "", email: "", subject: "" });
      fetchTeachers();
    } catch (err) {
      console.error(err);
      alert("Error saving teacher");
    }
  };

  // Handle Edit
  const handleEdit = (teacher) => {
    setForm({ name: teacher.name, email: teacher.email, subject: teacher.subject });
    setEditingId(teacher._id);
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await api.delete(`/teachers/${id}`);
      fetchTeachers();
    } catch (err) {
      console.error(err);
      alert("Error deleting teacher");
    }
  };

  return (
    <div className="teachers-container">
      <h1>Manage Teachers</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="teacher-form">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          placeholder="Subject"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          required
        />
        <button type="submit">{editingId ? "Update Teacher" : "Add Teacher"}</button>
      </form>

      {/* List */}
      <ul className="teacher-list">
        {teachers.map((t) => (
          <li key={t._id} className="teacher-item">
            <span>{t.name} ({t.email}) — Subject: {t.subject}</span>
            <div className="teacher-actions">
              <button onClick={() => handleEdit(t)} className="edit-btn">Edit</button>
              <button onClick={() => handleDelete(t._id)} className="delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Embedded CSS */}
      <style>{`
        .teachers-container {
          padding: 40px 20px;
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: auto;
          background-color: #f5f7fa;
          min-height: 100vh;
        }

        .teachers-container h1 {
          text-align: center;
          font-size: 32px;
          margin-bottom: 30px;
          color: #2c3e50;
        }

        .teacher-form {
          background-color: #ffffff;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          margin-bottom: 30px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .teacher-form input {
          padding: 10px;
          border-radius: 6px;
          border: 1px solid #ccc;
          font-size: 14px;
        }

        .teacher-form button {
          padding: 10px;
          border: none;
          border-radius: 6px;
          background-color: #007bff;
          color: #fff;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .teacher-form button:hover {
          background-color: #0056b3;
        }

        .teacher-list {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .teacher-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #ffffff;
          padding: 12px 15px;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .teacher-actions button {
          padding: 6px 12px;
          border: none;
          border-radius: 6px;
          font-size: 13px;
          color: #fff;
          cursor: pointer;
          margin-left: 5px;
        }

        .edit-btn {
          background-color: #ffc107;
        }

        .edit-btn:hover {
          background-color: #e0a800;
        }

        .delete-btn {
          background-color: #dc3545;
        }

        .delete-btn:hover {
          background-color: #c82333;
        }

        @media (max-width: 600px) {
          .teacher-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }

          .teacher-actions {
            display: flex;
            gap: 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default Teachers;
