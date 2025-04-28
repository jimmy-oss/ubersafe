import { Routes, Route, Link } from 'react-router-dom'

function App() {
  return (
    <div>
      <nav style={navStyle}>
        <Link to="/">Home</Link> | 
        <Link to="/login">Login</Link> | 
        <Link to="/register">Register</Link> | 
        <Link to="/post-ride">Post Ride</Link> | 
        <Link to="/profile">Profile</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/post-ride" element={<PostRidePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  )
}

const HomePage = () => {
  return (
    <div style={homeStyle}>
      <h1>Welcome to UberSafe </h1>
      <p>Find or offer rides easily and travel smarter.</p>
      <div style={buttonContainer}>
        <Link to="/search">
          <button style={buttonStyle}>Search for a Ride</button>
        </Link>
        <Link to="/post-ride">
          <button style={buttonStyle}>Post a Ride</button>
        </Link>
      </div>
    </div>
  )
  
}
const LoginPage = () => {
  return (
    <div style={formContainer}>
      <h2>Login</h2>
      <form style={formStyle}>
        <input type="email" placeholder="Email" style={inputStyle} />
        <input type="password" placeholder="Password" style={inputStyle} />
        <button type="submit" style={submitButton}>Login</button>
      </form>
    </div>
  )
}

const RegisterPage = () => {
  return (
    <div style={formContainer}>
      <h2>Register</h2>
      <form style={formStyle}>
        <input type="text" placeholder="Full Name" style={inputStyle} />
        <input type="email" placeholder="Email" style={inputStyle} />
        <input type="password" placeholder="Password" style={inputStyle} />
        <input type="password" placeholder="Confirm Password" style={inputStyle} />
        <button type="submit" style={submitButton}>Register</button>
      </form>
    </div>
  )
}
const PostRidePage = () => {
  return (
    <div style={formContainer}>
      <h2>Post a New Ride</h2>
      <form style={formStyle}>
        <input type="text" placeholder="Starting Location" style={inputStyle} />
        <input type="text" placeholder="Destination" style={inputStyle} />
        <input type="datetime-local" placeholder="Date and Time" style={inputStyle} />
        <input type="number" placeholder="Available Seats" style={inputStyle} />
        <input type="number" placeholder="Price per Seat (ksh)" style={inputStyle} />
        <button type="submit" style={submitButton}>Post Ride</button>
      </form>
    </div>
  )
}
const ProfilePage = () => {
  return (
    <div style={formContainer}>
      <h2>My Profile</h2>
      <div style={profileInfo}>
        <p><strong>Name:</strong> John Zakayo</p>
        <p><strong>Email:</strong> johnzakayo@gmail.com</p>
      </div>
      <div style={buttonContainer}>
        <button style={dangerButton}>Delete Account</button>
        <button style={resetButton}>Reset Password</button>
      </div>
    </div>
  )
}
const profileInfo = {
  marginBottom: '20px',
  fontSize: '18px',
}

const dangerButton = {
  padding: '10px 20px',
  backgroundColor: 'red',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  fontSize: '16px',
  cursor: 'pointer',
}

const resetButton = {
  padding: '10px 20px',
  backgroundColor: '#007BFF',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  fontSize: '16px',
  cursor: 'pointer',
}


const formContainer = {
  maxWidth: '400px',
  margin: '50px auto',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
}

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
}

const inputStyle = {
  marginBottom: '15px',
  padding: '10px',
  fontSize: '16px',
}

const submitButton = {
  padding: '10px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  fontSize: '18px',
  borderRadius: '5px',
  cursor: 'pointer',
}



const navStyle = {
  padding: '20px',
  backgroundColor: '#333',
  color: 'white',
}

const homeStyle = {
  textAlign: 'center',
  marginTop: '50px',
}

const buttonContainer = {
  marginTop: '30px',
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
}

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '18px',
  cursor: 'pointer',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
}

export default App
