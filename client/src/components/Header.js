
import { Navbar, Nav, Container, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "../images/logo.png";

export default function Header() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "user/logout" });
    navigate("/login");
  };

  return (
    <Navbar
      expand="md"
      style={{
        backgroundColor: "#c8d8c0",
        padding: "10px 20px",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <Container className="d-flex justify-content-between align-items-center">
        {/* Logo */}
        <Link
          to="/"
          className="d-flex align-items-center"
          style={{
            color: "#2e4d2e",
            fontWeight: "bold",
            fontSize: "24px",
            textDecoration: "none",
          }}
        >
          <img src={logo} alt="Plant Care Logo" style={{ width: "40px", marginRight: "10px" }} />
          PlantCare
        </Link>

        {/* Navigation */}
        <Nav className="ms-auto d-flex align-items-center">
          <Link to="/" style={{ color: "#2e4d2e", marginRight: "15px", textDecoration: "none" }}>Home</Link>
          <Link to="/about" style={{ color: "#2e4d2e", marginRight: "15px", textDecoration: "none" }}>About</Link>

          {!user ? (
            <>
              <Link to="/login" style={{ color: "#2e4d2e", marginRight: "15px", textDecoration: "none" }}>Login</Link>
              <Link to="/register">
                <Button style={{ backgroundColor: "#2e4d2e", color: "#fff", fontWeight: "bold" }}>Sign Up</Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" style={{ color: "#2e4d2e", marginRight: "15px", textDecoration: "none" }}>My Plants</Link>
              <Button color="danger" onClick={handleLogout}>Logout</Button>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
