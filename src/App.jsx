import { Routes, Route, Link } from 'react-router-dom'
import { FaCarSide, FaUserAlt, FaSignInAlt, FaPlusCircle, FaHome } from 'react-icons/fa';
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


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
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '1rem' }}>
        Welcome to UberSafe
      </h1>
      <p style={{ textAlign: 'center', color: '#555', marginBottom: '2rem' }}>
        Find or offer rides easily and travel smarter.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Link to="/search">
          <button>Search for a Ride</button>
        </Link>
        <Link to="/post-ride">
          <button>Post a Ride</button>
        </Link>
      </div>
    </div>
  )
}


const LoginPage = () => {
  return (
    <div className="form-wrapper">
      <h2>Login</h2>
      <form>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}


const RegisterPage = () => {
  return (
    <div className="form-wrapper">
      <h2>Register</h2>
      <form>
        <input type="text" placeholder="Full Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}


const PostRidePage = () => {
  const [startDate, setStartDate] = useState(null);

  return (
    <div className="form-wrapper">
      <h2>Post a Ride</h2>
      <form>
  <input type="text" placeholder="Starting Location" />
  
  <input type="text" placeholder="Destination" style={{ marginBottom: '0.75rem' }} />

  <label
    style={{
      marginBottom: '0.25rem',
      display: 'block',
      fontWeight: '600',
      marginTop: '-0.5rem' 
    }}
  >
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

  <input type="number" placeholder="Available Seats" />
  <input type="number" placeholder="Price per Seat (Ksh)" />
  <button type="submit">Post Ride</button>
      </form>
    </div>
  )
}


const ProfilePage = () => {
  return (
    <div className="form-wrapper">
      <h2 style={{ textAlign: 'center', color: '#333' }}>My Profile</h2>
      <div style={{ marginBottom: '1.5rem', fontSize: '16px', color: '#333' }}>
        <p><strong>Name:</strong> John Zakayo</p>
        <p><strong>Email:</strong> johnzakayo@gmail.com</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <button style={{ backgroundColor: 'red' }}>Delete Account</button>
        <button style={{ backgroundColor: '#007BFF' }}>Reset Password</button>
      </div>
    </div>
  )
}


const SearchRidesPage = () => {
  return (
    <div className="form-wrapper">
      <h2>Search for a Ride</h2>
      <form>
        <input type="text" placeholder="Starting Location" />
        <input type="text" placeholder="Destination" />
        <button type="submit">Search</button>
      </form>
    </div>
  )
}


 
 
 

export default App
