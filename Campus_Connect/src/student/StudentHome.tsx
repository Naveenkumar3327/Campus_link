import React from "react";
import { useNavigate } from "react-router-dom";

const StudentHome = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("userData");
        navigate("/login");
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>👋 Welcome, Student!</h1>
            <p style={styles.subheading}>This is your dashboard in Campus Connect 🎓</p>

            <div style={styles.sectionBox}>
                <h3>📢 Announcements</h3>
                <p>All your campus updates will appear here.</p>
            </div>

            <div style={styles.sectionBox}>
                <h3>🎒 My Subjects</h3>
                <ul>
                    <li>Web Development</li>
                    <li>Data Structures</li>
                    <li>DBMS</li>
                </ul>
            </div>

            <div style={styles.sectionBox}>
                <h3>📨 Messages</h3>
                <p>You have 2 unread messages.</p>
            </div>

            <button style={styles.logoutBtn} onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default StudentHome;

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        padding: "30px",
        fontFamily: "Arial, sans-serif",
        background: "#f5f7fa",
        minHeight: "100vh",
    },
    heading: {
        fontSize: "2.2rem",
        marginBottom: "10px",
        color: "#1b1b1b",
    },
    subheading: {
        fontSize: "1.1rem",
        marginBottom: "30px",
        color: "#5a5a5a",
    },
    sectionBox: {
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
    logoutBtn: {
        marginTop: "30px",
        padding: "10px 25px",
        background: "#d63b3b",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px",
    },
};
