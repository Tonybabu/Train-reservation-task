const express = require('express');
const Seat = require('../models/Seat');
const router = express.Router();

router.get('/seats', async (req, res) => {
  try {
    const seats = await Seat.find({});
    if (!seats || seats.length === 0) {
        return res.status(200).json([]); 
      }
    res.status(201).json(seats);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/seats/book', async (req, res) => {
    const { seatCount } = req.body; 
  
    try {
      
      const availableSeats = await Seat.find({ isBooked: false }).sort({ row: 1, number: 1 });
  
      //console.log("Available seats are : ",availableSeats)
      if (availableSeats.length < seatCount) {
        return res.status(400).json({ message: 'Not enough seats available' });
      }
  
      let seatsToBook = []; 
      let booked = false;
  
    
      for (let row = 1; row <= 12; row++) {
        const rowSeats = availableSeats.filter(seat => seat.row === row);
  
        if (rowSeats.length >= seatCount) {
          seatsToBook = rowSeats.slice(0, seatCount); 
          booked = true;
          //console.log("seats are : ",seatsToBook)
          break;
        }
      }
  

      if (!booked) {
        seatsToBook = availableSeats.slice(0, seatCount);
        console.log("seats are : ",seatsToBook)
      }
  
     
      const seatIds = seatsToBook.map(seat => seat._id);
      await Seat.updateMany({ _id: { $in: seatIds } }, { $set: { isBooked: true } });
  

      const updatedSeats = await Seat.find({}).sort({ row: 1, number: 1 });

      res.status(200).json({
        message: 'Seats booked successfully',
        bookedSeats: seatsToBook,
        allSeats: updatedSeats
      });
      
    } catch (error) {
      res.status(500).json({ message: 'Error booking seats', error });
    }
  });


module.exports = router;
