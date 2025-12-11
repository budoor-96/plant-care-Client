
import { Container, Row, Col } from "reactstrap";
import plantIcon from "../images/logo.png"; 

export default function About() {
  return (
    <Container
      fluid
      style={{
        padding: "40px",
        backgroundColor: "#dbead5", // Matches prototype
        fontFamily: "'Segoe UI', sans-serif",
        color: "#333",
      }}
    >
      <Row className="text-center mb-4">
        <Col>
          <img
            src={plantIcon}
            alt="Plant Icon"
            style={{ width: "80px", marginBottom: "15px" }}
          />
          <h2 style={{ color: "#2e4d2e", fontWeight: "bold" }}>About Plant Care</h2>
          <p style={{ fontSize: "18px", color: "#555" }}>
            Cultivating joy through healthy plants.
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md="8">
          <p style={{ fontSize: "16px", lineHeight: "1.8" }}>
            Plant Care started from a simple problem: we love plants, but we're not always the best at remembering to care for them.
            Life gets busy, schedules get complicated, and suddenly that beautiful fiddle-leaf fig in the corner starts looking a little sad.
            We knew there had to be a better way.
          </p>
          <p style={{ fontSize: "16px", lineHeight: "1.8" }}>
            We created Plant Care to be the ultimate digital companion for plant lovers of all levels.
            Whether you're a seasoned green thumb with a house full of exotic specimens or a beginner just starting with a single succulent,
            our app is designed to make plant care simple, intuitive, and enjoyable.
          </p>

          <h4 style={{ color: "#2e4d2e", marginTop: "20px", fontWeight: "bold" }}>Our Mission</h4>
          <p style={{ fontSize: "16px", lineHeight: "1.8" }}>
            Our mission is to empower everyone to build a thriving indoor garden.
            We believe that connecting with nature, even through houseplants, can bring immense joy and tranquility to our lives.
            By taking the guesswork out of plant care, we hope to help more people experience the satisfaction of watching their plants flourish.
          </p>

          <h4 style={{ color: "#2e4d2e", marginTop: "20px", fontWeight: "bold" }}>Tips for Beginners</h4>
          <div style={{ fontSize: "16px", lineHeight: "1.8" }}>
            - Start with easy-care plants.<br />
            - Always check soil moisture before watering.<br />
            - Use pots with good drainage.<br />
            - Regularly clean leaves to help your plants breathe.<br />
          </div>

          <p style={{ marginTop: "30px", fontSize: "14px", color: "#555", textAlign: "center" }}>
            Thank you for joining our community. Happy growing!
          </p>
        </Col>
      </Row>
    </Container>
  );
}
