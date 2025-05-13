# UberSafe - Carpool App

UberSafe is a full-stack carpooling web application that connects drivers and riders. Drivers can post available rides, and riders can search and book them. The app includes real-time seat availability updates, user profile management with image uploads via Cloudinary, and role-based navigation.

## 🔧 Tech Stack

- **Frontend**: React, React Router, Axios,Html,Css,Javascript
- **Backend**: Express.js, MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Token)
- **Image Upload**: Cloudinary (via unsigned upload preset)

---

## 📦 Features

### 🔐 Authentication
- User registration and login with role selection (Driver or Rider)
- JWT-based session handling

### 🚗 Drivers
- Post a ride (starting location, destination, date/time, seats, price)
- View list of posted rides
- (Update/Delete disabled for version 1)

### 🧍 Riders
- Search rides by destination, date, and starting location
- Book rides (seats update in real-time)

### 👤 Profile Page
- View profile info (name, email, role)
- Upload/change profile picture via Cloudinary
- Delete account
- Logout

---

## 🛠️ Installation

### 📁 Clone the repo
```bash
git clone https://github.com/jimmy-oss/ubersafe.git
cd ubersafe
```

### ⚙️ Set up backend
```bash
cd backend
npm install
```

#### Create `.env` in `backend` folder:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### ⚙️ Set up frontend
```bash
cd ../frontend
npm install
```

#### Create `.env` in `frontend` folder:
```env
VITE_CLOUDINARY_NAME=your_cloudinary_cloud_name
VITE_CLOUDINARY_PRESET=your_unsigned_preset_name
```

### ▶️ Start both servers
```bash
# In backend directory:
npm run dev

# In frontend directory (separate terminal):
npm run dev
```

---

## 🌐 Cloudinary Setup
1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Create a new upload preset (unsigned)
3. Allow uploads without authentication
4. Note your **cloud name** and **upload preset**
5. Set those values in your frontend `.env`

---

## ⚠️ Account Deletion
- When a user clicks **Delete Account**, their profile and posted/related data are permanently deleted.

---

## 📸 Demo Screenshots
- Post Ride Form
- Search Page (riders)
- Profile Page with image upload
- Booking success alert

*(Optional: Add images here)*

---

## 🚀 Future Improvements
- Enable drivers to edit/delete rides
- Add ride history for riders
- Add admin dashboard for reporting and stats

---

## 🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License
This project is licensed under the MIT License.

---

## 💬 Acknowledgments
- Icons: [React Icons](https://react-icons.github.io/)
- UI inspiration: uikit, Tailwind, Poppins font

---

> Built with ❤️ by jimmyoss.
