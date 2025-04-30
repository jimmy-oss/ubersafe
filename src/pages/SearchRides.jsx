import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchRides = () => {
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [rides, setRides] = useState([]);

  const fetchRides = async () => {
    try {
      const query = [];
      if (destination) query.push(`destination=${destination}`);
      if (date) query.push(`date=${date}`);

      const queryString = query.length ? `?${query.join("&")}` : "";
      const response = await axios.get(`http://localhost:5000/api/rides${queryString}`);
      setRides(response.data);
    } catch (error) {
      console.error("Failed to fetch rides:", error.message);
    }
  };

  useEffect(() => {
    fetchRides(); // initial load
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Search Rides</h2>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={fetchRides}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      <div className="space-y-4">
        {rides.length === 0 ? (
          <p>No rides found.</p>
        ) : (
          rides.map((ride) => (
            <div key={ride._id} className="border p-4 rounded shadow">
              <p><strong>From:</strong> {ride.startLocation}</p>
              <p><strong>To:</strong> {ride.destination}</p>
              <p><strong>Departure:</strong> {new Date(ride.departureTime).toLocaleString()}</p>
              <p><strong>Seats:</strong> {ride.availableSeats}</p>
              <p><strong>Price:</strong> KES {ride.price}</p>
              <p><strong>Driver:</strong> {ride.driver.fullName} ({ride.driver.email})</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchRides;
