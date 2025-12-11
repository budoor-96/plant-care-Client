
import { Container, FormGroup, Label, Row, Col } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { loginThunk } from "../slices/userSlice.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const msg = useSelector((state) => state.user.msg);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const loginData = { email, password };
    dispatch(loginThunk(loginData));
  };

  useEffect(() => {
    if (msg === "Login successful") {
      navigate("/dashboard"); // Redirect to Plant Dashboard
    }
  }, [msg, navigate]);

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center"
      style={{
        height: "100vh",
        backgroundColor: "#dbead5", // Light green background
        fontFamily: "'Segoe UI', sans-serif"
      }}
    >
      <Container
        style={{
          backgroundColor: "#4a654a", // Dark green box
          borderRadius: "12px",
          padding: "30px",
          maxWidth: "400px",
          color: "#fff"
        }}
      >
        <Row className="text-center mb-4">
          <Col>
            <h3 style={{ fontWeight: "bold" }}>Welcome Back!</h3>
            <p style={{ fontSize: "14px" }}>Login to manage your plant family</p>
          </Col>
        </Row>

        <Row>
          <form>
            {/* Email */}
            <FormGroup>
              <Label>Email</Label>
              <input
                type="email"
                className="form-control"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  borderRadius: "8px",
                  padding: "10px",
                  backgroundColor: "#f0f0f0",
                  border: "none"
                }}
              />
            </FormGroup>

            {/* Password */}
            <FormGroup>
              <Label>Password</Label>
              <input
                type="password"
                className="form-control"
                placeholder="••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  borderRadius: "8px",
                  padding: "10px",
                  backgroundColor: "#f0f0f0",
                  border: "none"
                }}
              />
            </FormGroup>

            {/* Submit Button */}
            <FormGroup className="text-center mt-4">
              <button
                className="btn"
                onClick={handleLogin}
                style={{
                  backgroundColor: "#333", // Dark gray button
                  color: "#fff",
                  fontWeight: "bold",
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  fontSize: "16px"
                }}
              >
                Login
              </button>
            </FormGroup>

            {/* Sign Up Link */}
            <FormGroup className="text-center mt-3">
              <Label>
                Don't have an account?
                <Link to="/register" style={{ color: "#f8e8e8", fontWeight: "bold", marginLeft: "8px" }}>
                  Sign Up
                </Link>
              </Label>
            </FormGroup>
          </form>
        </Row>

        {/* Error Message */}
        {msg && (
          <Row>
            <Container
              className="alert alert-danger mt-3"
              style={{ borderRadius: "8px", fontWeight: "bold" }}
            >
              <p className="text-center">{msg}</p>
            </Container>
          </Row>
        )}
      </Container>
    </Container>
  );
}
