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
        <Route path="/post-ride" element={<h1>Post Ride Page</h1>} />
        <Route path="/profile" element={<h1>Profile Page</h1>} />
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
