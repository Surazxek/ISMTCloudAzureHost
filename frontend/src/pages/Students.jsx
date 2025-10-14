import { useEffect, useState } from "react";
import api from "../api/api";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", age: "" });
  const [editingId, setEditingId] = useState(null);

  // Fetch all students
  const fetchStudents = async () => {
    try {
      const res = await api.get("/students");
      setStudents(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch students");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle form submit (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/students/${editingId}`, form);
        setEditingId(null);
      } else {
        await api.post("/students", form);
      }
      setForm({ name: "", email: "", age: "" });
      fetchStudents();
    } catch (err) {
      console.error(err);
      alert("Error saving student");
    }
  };

  // Handle Edit
  const handleEdit = (student) => {
    setForm({ name: student.name, email: student.email, age: student.age });
    setEditingId(student._id);
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await api.delete(`/students/${id}`);
      fetchStudents();
    } catch (err) {
      console.error(err);
      alert("Error deleting student");
    }
  };

  return (
    <div className="students-container">
      <h1>Manage Students</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="student-form">
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
          type="number"
          placeholder="Age"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
          required
        />
        <button type="submit">{editingId ? "Update Student" : "Add Student"}</button>
      </form>

      {/* List */}
      <ul className="student-list">
        {students.map((s) => (
          <li key={s._id} className="student-item">
            <span>{s.name} ({s.email}) — Age: {s.age}</span>
            <div className="student-actions">
              <button onClick={() => handleEdit(s)} className="edit-btn">Edit</button>
              <button onClick={() => handleDelete(s._id)} className="delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Embedded CSS */}
      <style>{`
        .students-container {
          padding: 40px;
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: auto;
        }

        .students-container h1 {
          font-size: 28px;
          margin-bottom: 20px;
          color: #333;
        }

        .student-form {
          background-color: #fff;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          margin-bottom: 30px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .student-form input {
          padding: 10px;
          border-radius: 6px;
          border: 1px solid #ccc;
          font-size: 14px;
        }

        .student-form button {
          padding: 10px;
          border: none;
          border-radius: 6px;
          background-color: #007bff;
          color: #fff;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .student-form button:hover {
          background-color: #0056b3;
        }

        .student-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .student-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #f0f2f5;
          padding: 12px 15px;
          border-radius: 8px;
        }

        .student-actions button {
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
      `}</style>
    </div>
  );
};

export default Students;
