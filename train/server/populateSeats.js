const Seat = require('./models/Seat');
const connectDB = require('./config/db');

connectDB();

const initializeSeats = async () => {
  const seats = [];
  for (let i = 1; i <= 12; i++) {
    const seatCount = i === 12 ? 3 : 7;
    for (let j = 1; j <= seatCount; j++) {
      seats.push({ row: i, number: j,isBooked:false });
    }
  }

  await Seat.insertMany(seats);
  console.log('Seats initialized');
  process.exit();
};

initializeSeats();
