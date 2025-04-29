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
        <Route path="/search" element={<SearchRidesPage />} />
      </Routes>
    </div>
  )
}

const HomePage = () => {
  return (
    <div className="form-wrapper">
      <h1 style={{ textAlign: 'center' }}>Welcome to UberSafe</h1>
      <p style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        Find or offer rides easily and travel smarter.
      </p>
      <div style={{ display: 'flex', gap: '1rem' }}>
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
    <div style={formContainer}>
      <h2>Login</h2>
      <form style={formStyle}>
        <input type="email" placeholder="Email" style={inputStyle} />
        <input type="password" placeholder="Password" style={inputStyle} />
        <button type="submit">Login</button>
      </form>
      </div>
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
  return (
    <div className="form-wrapper">
      <h2>Post a Ride</h2>
      <form>
        <input type="text" placeholder="Starting Location" />
        <input type="text" placeholder="Destination" />
        <input type="datetime-local" />
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
      <h2>My Profile</h2>
      <div style={{ marginBottom: '1.5rem', fontSize: '16px' }}>
        <p><strong>Name:</strong> John Zakayo</p>
        <p><strong>Email:</strong> johnzakayo@gmail.com</p>
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
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

 
const navStyle = {
  padding: '20px',
  backgroundColor: '#333',
  color: 'white',
}

 
 

export default App
