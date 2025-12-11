import { Container, Row, Col, Button, Card, CardBody, CardTitle, CardText } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlantsThunk, deletePlantThunk } from "../slices/plantSlice";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ added for navigation
  const { plants, loading } = useSelector((state) => state.plant);
  const user = useSelector((state) => state.user.user);

  // Fetch plants when user is available
  useEffect(() => {
    if (user?._id) {
      dispatch(fetchPlantsThunk(user._id));
    }
  }, [dispatch, user]);

  const handleDelete = (id) => {
    dispatch(deletePlantThunk(id));
  };

  // ✅ Updated to navigate to NearbyNurseries page
  const goToNearbyNurseries = () => {
    navigate("/nearby-nurseries");
  };

  return (
    <div style={{ backgroundColor: "#dbead5", minHeight: "100vh", fontFamily: "'Segoe UI', sans-serif" }}>
      <Container style={{ padding: "30px" }}>
        {/* Page Title */}
        <Row className="mb-4 text-center">
          <Col>
            <h2 style={{ color: "#2e4d2e", fontWeight: "bold" }}>My Garden</h2>
          </Col>
        </Row>

        {/* Add New Plant Button */}
        <Row className="mb-4 align-items-center">
          <Col className="text-end">
            <Link to="/add-plant">
              <Button style={{ backgroundColor: "#4a654a", color: "#fff", fontWeight: "bold" }}>
                Add New Plant
              </Button>
            </Link>
          </Col>
        </Row>

        {/* Plant Section */}
        {loading ? (
          <Row className="text-center">
            <Col><p>Loading plants...</p></Col>
          </Row>
        ) : plants.length === 0 ? (
          <Row className="text-center">
            <Col>
              <p style={{ fontSize: "18px", color: "#333" }}>
                No plants added yet. Start by adding your first plant!
              </p>
            </Col>
          </Row>
        ) : (
          <Row>
            {plants.map((plant) => (
              <Col md="4" key={plant._id} className="mb-4">
                <Card style={{ borderRadius: "12px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", backgroundColor: "#fff" }}>
                  <CardBody>
                    {/* Image Handling */}
                    {plant.imageUrl? (
                      <img
                        src={`http://localhost:7500${plant.imageUrl}`}
                        alt={plant.plantName}
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                          borderTopLeftRadius: "12px",
                          borderTopRightRadius: "12px",
                        }}
                        onError={(e) => (e.target.src = "/default-plant.jpg")}
                      />
                    ) : (
                      <img
                        src="/default-plant.jpg"
                        alt="Default Plant"
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                          borderTopLeftRadius: "12px",
                          borderTopRightRadius: "12px",
                        }}
                      />
                    )}

                    <CardTitle tag="h5" style={{ fontWeight: "bold", color: "#333", marginTop: "15px" }}>
                      {plant.plantName}
                    </CardTitle>
                    <CardText style={{ color: "#333" }}>
                      Species: {plant.species}<br />
                      Water every {plant.wateringFrequency} days<br />
                      Last Watered: {new Date(plant.lastWateredDate).toLocaleDateString()}<br />
                      Next Watering: {new Date(plant.nextWateringDate).toLocaleDateString()}
                    </CardText>
                    <div className="d-flex justify-content-center gap-2">
                      <Link to={`/update-plant/${plant._id}`}>
                        <Button style={{ backgroundColor: "#ccc", color: "#000", fontWeight: "bold" }}>Edit</Button>
                      </Link>
                      <Button
                        style={{ backgroundColor: "#ccc", color: "#000", fontWeight: "bold" }}
                        onClick={() => handleDelete(plant._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* Nearby Nurseries Button */}
        <Row className="mt-5 text-center">
          <Col>
            <Button
              onClick={goToNearbyNurseries} // ✅ navigate instead of fetching
              style={{ backgroundColor: "#4a654a", color: "#fff", fontWeight: "bold", padding: "10px 20px" }}
            >
              Find Nearby Nurseries
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
