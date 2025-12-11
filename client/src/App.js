import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import plantCareStore from "./store/plantCareStore";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import AddPlant from "./components/AddPlant";
import UpdatePlant from "./components/UpdatePlant";
import NearbyNurseries from "./components/NearbyNurseries"; // ✅ import page

function App() {
  return (
    <Provider store={plantCareStore}>
      <BrowserRouter>
        {/* Header */}
        <Header />

        {/* Main Content */}
        <div style={{ backgroundColor: "#dbead5" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-plant" element={<AddPlant />} />
            <Route path="/update-plant/:id" element={<UpdatePlant />} />
            <Route path="/nearby-nurseries" element={<NearbyNurseries />} /> {/* ✅ new route */}
          </Routes>
        </div>

        {/* Footer */}
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
