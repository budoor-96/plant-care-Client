import { Container, Row, Col, FormGroup, Label } from "reactstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import regFormValidationSchema from "../validations/registerValidation";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerThunk, reset } from "../slices/userSlice.js";


export default function Register() {
  const { msg, loading, success } = useSelector((state) => state.user);



  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(regFormValidationSchema)
  });

  const onSubmit = (data) => {
    dispatch(registerThunk(data));
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch(reset());
        navigate("/login");
      }, 1500);
    } else if (msg && !success) {
      setTimeout(() => {
        dispatch(reset());
      }, 3000);
    }
  }, [success, msg, dispatch, navigate]);
  return (
    <Container fluid className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh", backgroundColor: "#dbead5", fontFamily: "'Segoe UI', sans-serif" }}
    >
      <Container style={{ backgroundColor: "#4a654a", borderRadius: "12px", padding: "30px", maxWidth: "400px", color: "#fff" }}>
        <Row className="text-center mb-4">
          <Col>
            <h3 style={{ fontWeight: "bold" }}>Join Plant Care</h3>
            <p style={{ fontSize: "14px" }}>Start your plant care journey today</p>
          </Col>
        </Row>

      
        {msg && (
          <Row>
            <Container
              className={`alert ${success ? "alert-success" : "alert-danger"} mt-2`}
              style={{ borderRadius: "8px", fontWeight: "bold" }}
            >
              <p className="text-center mb-0">{msg}</p>
            </Container>
          </Row>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label>Name</Label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              {...register("name")}
              style={{ borderRadius: "8px", padding: "10px", backgroundColor: "#f0f0f0", border: "none" }}
            />
            <span className="text-danger">{errors.name?.message}</span>
          </FormGroup>

          <FormGroup>
            <Label>Email</Label>
            <input
              type="email"
              className="form-control"
              placeholder="you@example.com"
              {...register("email")}
              style={{ borderRadius: "8px", padding: "10px", backgroundColor: "#f0f0f0", border: "none" }}
            />
            <span className="text-danger">{errors.email?.message}</span>
          </FormGroup>

          <FormGroup>
            <Label>Password</Label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••"
              {...register("password")}
              style={{ borderRadius: "8px", padding: "10px", backgroundColor: "#f0f0f0", border: "none" }}
            />
            <span className="text-danger">{errors.password?.message}</span>
          </FormGroup>

          <FormGroup>
            <Label>Confirm Password</Label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••"
              {...register("confirmPassword")}
              style={{ borderRadius: "8px", padding: "10px", backgroundColor: "#f0f0f0", border: "none" }}
            />
            <span className="text-danger">{errors.confirmPassword?.message}</span>
          </FormGroup>


          <button
            type="submit"
            className="btn btn-dark w-100 mt-3"
            disabled={loading}
            style={{ borderRadius: "8px", fontWeight: "bold" }}
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <Row className="mt-3">
          <Col className="text-center">
            <p>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#a8e6cf", fontWeight: "bold" }}>
                Login
              </Link>
            </p>
          </Col>
        </Row>
      </Container>
    </Container>
  );

}
