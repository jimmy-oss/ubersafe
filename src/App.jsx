import { Routes, Route, Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import {FaCar,FaSearchLocation,FaCarSide, FaUserAlt, FaSignInAlt, FaPlusCircle, FaHome } from 'react-icons/fa';
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Confetti from "react-confetti";
import api from "./api/axios";
 


function App() {
  return (
    <div>
     <nav className="navbar">
  <div style={{ fontWeight: 'bold', fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px', color: '#764ba2' }}>
  <FaCarSide />
  UberSafe
</div>
  <div style={{ display: 'flex', gap: '1.5rem' }}>
    <Link to="/"><FaHome /> Home</Link>
    <Link to="/login"><FaSignInAlt /> Login</Link>
    <Link to="/register"><FaUserAlt /> Register</Link>
    <Link to="/post-ride"><FaPlusCircle /> Post Ride</Link>
    <Link to="/profile"><FaUserAlt /> Profile</Link>
  </div>
</nav>


      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/post-ride" element={<PostRidePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/search" element={<SearchRidesPage />} />
      </Routes>
    </div>
  )
}

 
const HomePage = () => {
  return (
    <div className="form-wrapper">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <FaCar size={48} color="#764ba2" />
        <h1 style={{ color: '#333', marginTop: '1rem' , fontWeight: 'bold'}}>Welcome to UberSafe</h1>
        <p style={{ color: '#555', marginTop: '0.5rem' }}>
          Find or offer rides easily and travel smarter.
        </p>
      </div>

      <div className="home-options">
        <Link to="/search" className="home-card">
          <FaSearchLocation size={20} />
          <span>Search for a Ride</span>
        </Link>

        <Link to="/post-ride" className="home-card">
          <FaPlusCircle size={20} />
          <span>Post a Ride</span>
        </Link>
      </div>
    </div>
  );
};



const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return setErrors({ api: 'Email and password required' });
    try {
      const res = await api.post('/login', formData);
      const { isDriver } = res.data.user;
      setSuccess(true);
      setTimeout(() => navigate(isDriver ? '/post-ride' : '/search'), 2000);
    } catch (err) {
      setErrors({ api: err.response?.data?.message || 'Login failed' });
    }
  };

  return (
    <div className="form-wrapper">
      <h2>Login</h2>
      {success && <div className="success-message">✅ Login successful! Redirecting...</div>}
      {errors.api && <div className="error-message">{errors.api}</div>}
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};


 const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "rider"
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let timer;
    if (success) {
      timer = setTimeout(() => {
        setSuccess(false);
        resetForm();

        // redirect after 1s
        if (formData.role === "driver") {
          navigate("/post-ride");
        } else {
          navigate("/login");
        }
      }, 1000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [formData.role, navigate, success]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "rider"
    });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await api.post("/register", {
        fullName: formData.name,
        email: formData.email,
        password: formData.password,
        isDriver: formData.role === "driver"
      });

      console.log("✅ Registered:", res.data);
      setSuccess(true);
    } catch (err) {
      setErrors({
        api:
          err.response?.data?.message ||
          err.message ||
          "Registration failed"
      });
    }
  };

  return (
    <div className="form-wrapper">
      <h2>Register</h2>
      {success && (
        <div className="success-message">
          <span>✅ Registration successful! Redirecting...</span>
        </div>
      )}
      {errors.api && <div className="error-message">{errors.api}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "error" : ""}
          />
          {errors.name && (
            <span className="error-message">{errors.name}</span>
          )}
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "error" : ""}
          />
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? "error" : ""}
          />
          {errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>

        <div className="form-group">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={errors.confirmPassword ? "error" : ""}
          />
          {errors.confirmPassword && (
            <span className="error-message">
              {errors.confirmPassword}
            </span>
          )}
        </div>

        <div className="form-group">
          <label style={{ fontWeight: "600" }}>Register As:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="form-input"
          >
            <option value="rider">Rider</option>
            <option value="driver">Driver</option>
          </select>
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};



  const PostRidePage = () => {
  const [startLocation, setStartLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [seats, setSeats] = useState("");
  const [price, setPrice] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [error, setError] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!startLocation || !destination || !seats || !price || !startDate) {
      setError("All fields are required.");
      return;
    }

    if (parseInt(seats) <= 0 || parseInt(price) <= 0) {
      setError("Seats and Price must be greater than zero.");
      return;
    }

    if (startDate <= new Date()) {
      setError("Date & Time must be in the future.");
      return;
    }

    setError("");
    setShowConfetti(true);
    setShowSuccess(true);

    // Hide confetti & message after 5s
    setTimeout(() => {
      setShowConfetti(false);
      setShowSuccess(false);
    }, 5000);

    // Reset form
    setStartLocation("");
    setDestination("");
    setSeats("");
    setPrice("");
    setStartDate(null);
  };

  return (
    <div className="form-wrapper">
      {showConfetti && <Confetti numberOfPieces={250} recycle={false} />}

      {showSuccess && (
        <div style={{
          backgroundColor: "#d4edda",
          color: "#155724",
          padding: "1rem",
          borderRadius: "8px",
          textAlign: "center",
          marginBottom: "1.5rem",
          border: "1px solid #c3e6cb",
          animation: "fadeIn 0.4s ease"
        }}>
          ✅ Ride posted successfully!
        </div>
      )}

      <h2>Post a Ride</h2>
      {error && (
        <div style={{ color: "red", marginBottom: "1rem", textAlign: "center" }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Starting Location"
          value={startLocation}
          onChange={(e) => setStartLocation(e.target.value)}
        />

        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          style={{ marginBottom: '0.75rem' }}
        />

        <label style={{ marginBottom: "0.25rem", display: "block", fontWeight: "600", marginTop: "-0.5rem" }}>
          Date & Time
        </label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          showTimeSelect
          dateFormat="Pp"
          placeholderText="Select date and time"
          className="form-input"
        />

        <input
          type="number"
          placeholder="Available Seats"
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price per Seat (Ksh)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button type="submit">Post Ride</button>
      </form>
    </div>
  );
};

 


 const ProfilePage = () => {
  const [profilePic, setProfilePic] = useState('https://www.gravatar.com/avatar/default?s=200');

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="form-wrapper">
      <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '1.5rem' }}>My Profile</h2>
      
      {/* Profile Picture Section */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        marginBottom: '2rem'
      }}>
        <div style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '3px solid #764ba2',
          marginBottom: '1rem',
          boxShadow: '0 4px 12px rgba(118, 75, 162, 0.2)'
        }}>
          <img 
            src={profilePic} 
            alt="Profile" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>
        
        <label htmlFor="profile-pic-upload" style={{
          backgroundColor: 'white',
          color: '#764ba2',
          padding: '8px 20px',
          borderRadius: '20px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '600',
          border: '2px solid #764ba2',
          transition: 'all 0.3s ease',
          boxShadow: '0 2px 8px rgba(118, 75, 162, 0.1)'
        }}>
          Change Photo
          <input
            id="profile-pic-upload"
            type="file"
            accept="image/*"
            onChange={handleProfilePicChange}
            style={{ display: 'none' }}
          />
        </label>
      </div>
      
      {/* Profile Info */}
      <div style={{ 
        marginBottom: '2rem', 
        fontSize: '16px', 
        color: '#333',
        textAlign: 'center',
        lineHeight: '1.6'
      }}>
        <p><strong>Name:</strong> John Zakayo</p>
        <p><strong>Email:</strong> johnzakayo@gmail.com</p>
      </div>
      
      {/* Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <button style={{ 
          backgroundColor: '#764ba2',
          padding: '12px',
          borderRadius: '8px',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          fontWeight: '600',
          transition: 'all 0.3s ease',
          boxShadow: '0 2px 8px rgba(118, 75, 162, 0.2)'
        }}>
          Reset Password
        </button>
        <button style={{ 
          backgroundColor: '#f8f9fa',
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid #dc3545',
          color: '#dc3545',
          cursor: 'pointer',
          fontWeight: '600',
          transition: 'all 0.3s ease'
        }}>
          Delete Account
        </button>
      </div>
    </div>
  );
};
 const SearchRidesPage = () => {
  const [startLocation, setStartLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState(null);
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRides = async () => {
    setLoading(true);
    setError("");

    try {
      const params = {};
      if (startLocation) params.startLocation = startLocation;
      if (destination) params.destination = destination;
      if (date?.toISOString) {
        params.date = date.toISOString().split("T")[0]; // Format: yyyy-mm-dd
      }

      const res = await api.get("/rides", { params });
      setRides(res.data);
    } catch (err) {
      console.error("Error fetching rides:", err);
      setError("Failed to fetch rides");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRides(); // Load all rides on page load
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRides();
  };

  return (
    <div className="form-wrapper">
      <h2>Search for a Ride</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Starting Location"
          value={startLocation}
          onChange={(e) => setStartLocation(e.target.value)}
        />
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <DatePicker
          selected={date}
          onChange={(d) => setDate(d)}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select Date"
          className="form-input"
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p style={{ textAlign: "center" }}>Loading rides...</p>}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {!loading && !error && rides.length === 0 && (
  <div
    style={{
      backgroundColor: "#ffe5e5",
      color: "#a94442",
      border: "1px solid #f5c6cb",
      padding: "1rem",
      borderRadius: "8px",
      marginTop: "1.5rem",
      textAlign: "center",
      fontWeight: "600"
    }}
  >
    🚫 No rides found. Try a different location or date.
  </div>
)}

      <div style={{ marginTop: "2rem" }}>
        {rides.map((ride) => (
          <div
            key={ride._id}
            style={{
              background: "#f9f9f9",
              color: "#333",
              border: "1px solid #ddd",
              padding: "1rem",
              borderRadius: "8px",
              marginBottom: "1rem"
            }}
          >
            <p>
              <strong>From:</strong> {ride.startLocation}
            </p>
            <p>
              <strong>To:</strong> {ride.destination}
            </p>
            <p>
              <strong>Date & Time:</strong>{" "}
              {new Date(ride.departureTime).toLocaleString()}
            </p>
            <p>
              <strong>Seats:</strong> {ride.availableSeats}
            </p>
            <p>
              <strong>Price:</strong> Ksh {ride.price}
            </p>
            <p>
              <strong>Driver:</strong> {ride.driver?.fullName} ({ride.driver?.email})
            </p>
            <button style={{ marginTop: "0.5rem" }}>Book Ride</button>
          </div>
        ))}
      </div>
    </div>
  );
};

 
 
 

export default App
