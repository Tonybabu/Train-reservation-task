import React from 'react';
import './App.css';

const SeatLayout = ({ seatData }) => {
  if (!Array.isArray(seatData)) {
    return <div>No seat data available.</div>; 
  }

  return (
    <div className="layout">
      <div className="seat-layout">
        {seatData.map((seat) => (
          <div className={`seat ${seat.isBooked ? 'booked' : 'available'}`} key={seat._id}>
            <div className="seat-number">Seat No. - {seat.number}</div>
            <div className="row-number">Row No. - {seat.row}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatLayout;
