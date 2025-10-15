import { Link } from "react-router-dom";

const Dashboard = () => {
  // Get logged-in user info from localStorage
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  // Sample courses data
  const courses = [
    {
      name: "BSc (Hons) Computer Science",
      price: "NPR 7,50,000",
    },
    {
      name: "BSc (Hons) Cyber Security",
      price: "NPR 7,80,000",
    },
    {
      name: "BMH (Bachelor in Business Management & Hospitality)",
      price: "NPR 7,20,000",
    },
    {
      name: "MBA (Master of Business Administration)",
      price: "NPR 8,00,000",
    },
  ];

  return (
    <div className="dashboard-container">
      {/* User Info */}
      <div className="user-info">
        <h2>Welcome, {name}!</h2>
        <p>Role: {role.charAt(0).toUpperCase() + role.slice(1)}</p>
      </div>

      <h1>Dashboard</h1>

      {/* Main Role-Based Dashboard Cards */}
      <div className="dashboard-cards">
        {role === "admin" && (
          <>
            <Link to="/students" className="dashboard-card">
              <div className="card-icon">👩‍🎓</div>
              <div className="card-text">Students</div>
            </Link>
            <Link to="/teachers" className="dashboard-card">
              <div className="card-icon">👨‍🏫</div>
              <div className="card-text">Teachers</div>
            </Link>
          </>
        )}
        {role === "teacher" && (
          <Link to="/students" className="dashboard-card">
            <div className="card-icon">👩‍🎓</div>
            <div className="card-text">Students</div>
          </Link>
        )}
        {role === "student" && (
          <span className="welcome-text">Welcome, Student!</span>
        )}
      </div>

      {/* Courses Section */}
      <div className="courses-section">
        <h2>Available Courses</h2>
        <div className="courses-grid">
          {courses.map((course, index) => (
            <div key={index} className="course-card">
              <h3>{course.name}</h3>
              <p className="course-price">{course.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Embedded CSS */}
      <style>{`
        .dashboard-container {
          min-height: 100vh;
          padding: 50px 20px;
          font-family: Arial, sans-serif;
          background-color: #f5f7fa;
          color: #333;
        }

        .user-info {
          text-align: center;
          margin-bottom: 20px;
        }

        .user-info h2 {
          font-size: 28px;
          font-weight: bold;
          color: #2c3e50;
        }

        .user-info p {
          font-size: 18px;
          color: #555;
        }

        .dashboard-container h1 {
          font-size: 36px;
          font-weight: bold;
          margin-bottom: 40px;
          text-align: center;
          color: #2c3e50;
        }

        .dashboard-cards {
          display: flex;
          flex-wrap: wrap;
          gap: 25px;
          justify-content: center;
        }

        .dashboard-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 180px;
          height: 180px;
          background-color: #ffffff;
          border-radius: 16px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          text-decoration: none;
          color: #2c3e50;
          font-weight: bold;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .dashboard-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }

        .card-icon {
          font-size: 48px;
          margin-bottom: 15px;
        }

        .card-text {
          font-size: 18px;
        }

        .welcome-text {
          font-size: 22px;
          font-weight: 600;
          text-align: center;
          color: #2c3e50;
        }

        /* ===== Courses Section ===== */
        .courses-section {
          margin-top: 60px;
          text-align: center;
        }

        .courses-section h2 {
          font-size: 30px;
          color: #004aad;
          margin-bottom: 30px;
        }

        .courses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 25px;
          justify-items: center;
          padding: 0 20px;
        }

        .course-card {
          background-color: #ffffff;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          width: 260px;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .course-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }

        .course-card h3 {
          font-size: 18px;
          color: #2c3e50;
          margin-bottom: 10px;
        }

        .course-price {
          font-size: 16px;
          color: #27ae60;
          font-weight: bold;
        }

        @media (max-width: 600px) {
          .dashboard-cards {
            flex-direction: column;
            align-items: center;
          }

          .course-card {
            width: 90%;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
