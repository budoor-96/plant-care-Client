
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const NearbyNurseries = () => {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [nurseries, setNurseries] = useState([]);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLat(latitude);
        setLon(longitude);

        
        try {
          const res = await fetch(
            `http://localhost:7500/nearby-nurseries?lat=${latitude}&lon=${longitude}`
          );
          if (!res.ok) throw new Error("Failed to fetch nurseries");
          const data = await res.json();
          setNurseries(data);
        } catch (err) {
          setError(err.message);
        }
      },
      () => {
        setError("Permission denied or unable to retrieve location");
      }
    );
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Nearby Nurseries</h2>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {lat && lon && (
        <MapContainer
          center={[lat, lon]}
          zoom={13}
          style={{ height: "400px", width: "100%", marginTop: "20px" }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[lat, lon]}>
            <Popup>You are here</Popup>
          </Marker>

          {nurseries
            .filter(n => n.latitude && n.longitude)
            .map((n, index) => (
              <Marker key={index} position={[n.latitude, n.longitude]}>
                <Popup>
                  <strong>{n.name}</strong><br />
                  {n.address}
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      )}
    </div>
  );
};

export default NearbyNurseries;

