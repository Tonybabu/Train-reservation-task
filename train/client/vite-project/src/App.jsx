import React, { useState, useEffect } from 'react';
import SeatLayout from './SeatLayout';
import './App.css';

const App = () => {
  const [seatCount, setSeatCount] = useState(0);
  const [temp,setTemp]=useState([]) 

  useEffect(() => {
    fetch('http://localhost:5000/api/seats')
      .then((res) => res.json())
      .then((data) => {
        //console.log(data); 
        setTemp(data);
      })
      .catch((error) => {
        console.error("Error fetching seat data:", error);
        setTemp([]); 
      });
  }, []);

  const handleBookSeats = () => {
    fetch('http://localhost:5000/api/seats/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ seatCount }),
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data); 
        setTemp(data); 
      })
      .catch((error) => {
        console.error("Error booking seats:", error);
      });
  };

  return (
    <div className="App">
      <h1>Train Seat Reservation</h1>
      <div className="controls">
        <input
          type="number"
          placeholder="Enter seat count"
          value={seatCount}
          onChange={(e) => setSeatCount(Number(e.target.value))}
        />
        <button onClick={handleBookSeats}>Book Seats</button>
      </div>
      <SeatLayout seatData={temp} />
    </div>
  );
};

export default App;
