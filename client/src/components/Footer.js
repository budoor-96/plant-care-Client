
import { Container } from "reactstrap";

export default function Footer() {
  return (
    <Container
      fluid
      style={{
        backgroundColor: "#c8d8c0", // Light green footer background
        color: "#333", // Dark text
        padding: "15px",
        textAlign: "center",
        fontSize: "14px",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <p style={{ margin: "0" }}>
        © 2025 Plant Care. All rights reserved
      </p>
      <p style={{ margin: "0" }}>
        Helping you grow a greener world, one plant at a time.
      </p>
    </Container>
  )
};