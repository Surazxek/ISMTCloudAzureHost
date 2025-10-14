import { Link } from "react-router-dom";

const Dashboard = () => {
  // Get logged-in user info from localStorage
  const name = localStorage.getItem("name")
  const role = localStorage.getItem("role") 

  return (
    <div className="dashboard-container">
      {/* User Info */}
      <div className="user-info">
        <h2>Welcome, {name}!</h2>
        <p>Role: {role.charAt(0).toUpperCase() + role.slice(1)}</p>
      </div>

      <h1>Dashboard</h1>

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

        @media (max-width: 600px) {
          .dashboard-cards {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
