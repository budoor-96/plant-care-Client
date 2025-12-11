
import { Container, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import reminderIcon from "../images/water.png"; 
import dashboardIcon from "../images/plant.png";
import locationIcon from "../images/location.png";

export default function Home() {
  return (
    <div style={{ backgroundColor: "#dbead5", minHeight: "88vh", fontFamily: "'Segoe UI', sans-serif" }}>
      <Container className="text-center py-5">
        {/* Hero Section */}
        <h1 style={{ fontSize: "48px", fontWeight: "bold", color: "#2e4d2e" }}>
          Welcome to PlantCare
        </h1>
        <p style={{ fontSize: "18px", color: "#333", marginTop: "15px", maxWidth: "700px", margin: "0 auto" }}>
          Your personal plant care assistant. Never let a leaf wither again.
          Track watering schedules, get AI-powered advice, and watch your indoor garden thrive.
        </p>

        {/* Buttons */}
        <div style={{ marginTop: "30px" }}>
          <Link to="/register">
            <Button size="lg" style={{ backgroundColor: "#2e4d2e", color: "#fff", border: "none", marginRight: "15px" }}>
              Get Started For Free
            </Button>
          </Link>
          <Link to="/about">
            <Button size="lg" style={{ backgroundColor: "#f8e8e8", color: "#2e4d2e", fontWeight: "bold", border: "none" }}>
              Learn More
            </Button>
          </Link>
        </div>

        {/* Features Section */}
        <h2 style={{ marginTop: "60px", color: "#2e4d2e", fontWeight: "bold" }}>Features</h2>
        <Row className="mt-4">
          <Col md="4" className="text-center">
            <img src={reminderIcon} alt="Smart Reminders" style={{ width: "50px", marginBottom: "10px" }} />
            <h4 style={{ color: "#2e4d2e", fontWeight: "bold" }}>Smart Reminders</h4>
            <p style={{ color: "#555" }}>
              Set custom watering schedules for each plant. We'll remind you when it's time to water, so you don't have to remember.
            </p>
          </Col>
          <Col md="4" className="text-center">
            <img src={dashboardIcon} alt="Plant Dashboard" style={{ width: "50px", marginBottom: "10px" }} />
            <h4 style={{ color: "#2e4d2e", fontWeight: "bold" }}>Plant Dashboard</h4>
            <p style={{ color: "#555" }}>
              Keep all your plants organized in one beautiful dashboard. Add, edit, and remove plants with ease.
            </p>
          </Col>
          <Col md="4" className="text-center">
            <img src={locationIcon} alt="Location" style={{ width: "50px", marginBottom: "10px" }} />
            <h4 style={{ color: "#2e4d2e", fontWeight: "bold" }}>Location</h4>
            <p style={{ color: "#555" }}>
              Discover local plant stores and nurseries near you to get everything your plants need.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
