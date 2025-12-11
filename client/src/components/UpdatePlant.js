
import { Container, Row, Col, FormGroup, Label, Button } from "reactstrap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePlantThunk } from "../slices/plantSlice";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdatePlant() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { plants } = useSelector((state) => state.plant);

  const [plantName, setPlantName] = useState("");
  const [species, setSpecies] = useState("indoor");
  const [wateringFrequency, setWateringFrequency] = useState("");
  const [lastWateredDate, setLastWateredDate] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const plant = plants.find((p) => p._id === id);
    if (plant) {
      setPlantName(plant.plantName);
      setSpecies(plant.species);
      setWateringFrequency(plant.wateringFrequency);
      setLastWateredDate(plant.lastWateredDate.split("T")[0]);
      if (plant.image) setPreview(`http://localhost:7500${plant.image}`);
    }
  }, [plants, id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpdatePlant = async (e) => {
    e.preventDefault();

    if (!plantName || !species || !wateringFrequency || !lastWateredDate) {
      alert("Please fill all required fields.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("plantName", plantName);
    formData.append("species", species);
    formData.append("wateringFrequency", Number(wateringFrequency));
    formData.append("lastWateredDate", lastWateredDate);
    if (image) formData.append("image", image);

    try {
      await dispatch(updatePlantThunk({ id, formData }));
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating plant:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={{ padding: "30px", backgroundColor: "#f1f8e9", minHeight: "88vh" }}>
      <Row className="text-center mb-4">
        <Col>
          <h2 style={{ color: "#388e3c", fontWeight: "bold" }}>Update Plant</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="6">
          <form encType="multipart/form-data">
            <FormGroup>
              <Label>Plant Name *</Label>
              <input type="text" className="form-control" value={plantName} onChange={(e) => setPlantName(e.target.value)} />
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
              <input type="number" className="form-control" value={wateringFrequency} onChange={(e) => setWateringFrequency(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label>Last Watered Date *</Label>
              <input type="date" className="form-control" value={lastWateredDate} onChange={(e) => setLastWateredDate(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label>Update Image (optional)</Label>
              <input type="file" className="form-control" accept="image/*" onChange={handleImageChange} />
              {preview && (
                <div style={{ marginTop: "10px", textAlign: "center" }}>
                  <img src={preview} alt="Preview" style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "8px" }} />
                </div>
              )}
            </FormGroup>
            <div className="d-flex justify-content-end gap-2 mt-3">
              <Button
                color="secondary"
                className="w-35 mt-3"
                onClick={() => navigate("/dashboard")}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button color="success" className="w-35 mt-3" onClick={handleUpdatePlant} disabled={loading}>
                {loading ? "Updating..." : "Update Plant"}
              </Button>
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  );
}
