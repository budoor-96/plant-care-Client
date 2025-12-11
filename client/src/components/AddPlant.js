
import { Container, Row, Col, FormGroup, Label, Button } from "reactstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPlantThunk } from "../slices/plantSlice";
import { useNavigate } from "react-router-dom";

export default function AddPlant() {
  const [plantName, setPlantName] = useState("");
  const [species, setSpecies] = useState("indoor");
  const [wateringFrequency, setWateringFrequency] = useState("");
  const [lastWateredDate, setLastWateredDate] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleAddPlant = async (e) => {
    e.preventDefault();

    if (!user || !user._id) {
      alert("You must be logged in to add a plant.");
      navigate("/login");
      return;
    }

    if (!plantName || !species || !wateringFrequency || !lastWateredDate) {
      alert("Please fill all required fields.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("userId", user._id);
    formData.append("plantName", plantName);
    formData.append("species", species);
    formData.append("wateringFrequency", Number(wateringFrequency));
    formData.append("lastWateredDate", lastWateredDate);
    if (image) formData.append("image", image);

    try {
      await dispatch(addPlantThunk(formData));
      navigate("/dashboard");
    } catch (error) {
      console.error("Error adding plant:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={{ padding: "30px", backgroundColor: "#f1f8e9", minHeight: "88vh" }}>
      <Row className="text-center mb-4">
        <Col>
          <h2 data-testid="page-title" style={{ color: "#388e3c", fontWeight: "bold" }}>Add a New Plant</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="6">
          <form encType="multipart/form-data">
            <FormGroup>
              <Label>Plant Name *</Label>
              <input
                type="text"
                className="form-control"
                value={plantName}
                onChange={(e) => setPlantName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Species *</Label>
              <div>
                <label>
                  <input
                    type="radio"
                    value="Indoor"
                    checked={species === "Indoor"}
                    onChange={(e) => setSpecies(e.target.value)}
                  />
                  Indoor
                </label>
                <label style={{ marginLeft: "15px" }}>
                  <input
                    type="radio"
                    value="Outdoor"
                    checked={species === "Outdoor"}
                    onChange={(e) => setSpecies(e.target.value)}
                  />
                  Outdoor
                </label>
              </div>
            </FormGroup>

            <FormGroup>
              <Label>Watering Frequency (days) *</Label>
              <input data-testid="watering-frequency"
                type="number"
                className="form-control"
                value={wateringFrequency}
                onChange={(e) => setWateringFrequency(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Last Watered Date *</Label>
              <input
                type="date"
                className="form-control"
                value={lastWateredDate}
                onChange={(e) => setLastWateredDate(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Plant Image (optional)</Label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleImageChange}
              />
              {preview && (
                <div style={{ marginTop: "10px", textAlign: "center" }}>
                  <img
                    src={preview}
                    alt="Preview"
                    style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "8px" }}
                  />
                </div>
              )}
            </FormGroup>
            <div className="d-flex justify-content-end gap-2 mt-3">
              <Button data-testid='cancel'
                color="secondary"
                className="w-35 mt-3"
                onClick={() => navigate("/dashboard")}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button  data-testid='add plant'
                color="success"
                className="w-35 mt-3"
                onClick={handleAddPlant}
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Plant"}
              </Button>
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  );
}
