// import React, { useState } from 'react';
// import axios from 'axios';
// import { useUserContext } from './UserContext'; // Import the useUserContext hook

// const BookRoom: React.FC = () => {
//     const { userId } = useUserContext(); // Access the userId from context
//     const [hotelId, setHotelId] = useState<number | ''>('');
//     const [rooms, setRooms] = useState<number | ''>('');
//     const [fromDate, setFromDate] = useState<string>('');
//     const [toDate, setToDate] = useState<string>('');
//     const [message, setMessage] = useState<string>('');
//     const [error, setError] = useState<string>('');

//     const handleBooking = async () => {
//         if (userId === null) {
//             setError('User must be logged in to book a room');
//             return;
//         }
//         if (hotelId === '' || rooms === '' || fromDate === '' || toDate === '') {
//             setMessage('Please fill all the fields');
//             return;
//         }

//         try {
//             const response = await axios.post('http://localhost:8080/user/users/booking', null, {
//                 params: {
//                     userId,
//                     hotelId,
//                     rooms,
//                     fromDate,
//                     toDate
//                 }
//             });
//             console.log(response)
//             console.log("inside sucess")
//             setMessage(`Booking successful! Booking ID: ${response.data.id}`);
//             setError(''); // Clear previous errors
//         } catch (error: any) {
//             if (error.response) {
//                 console.log(error.response)
//                 console.log("inside error")
//                 setError(error.response.data.message || 'An error occurred'); // Display backend error message
//                 setMessage(''); // Clear previous success messages
//             } else {
//                 console.log(error.response)
//                 console.log("inside unexpected error")
//                 setError('An unexpected error occurred'); // Handle unexpected errors
//                 setMessage(''); // Clear previous success messages
//             }
//         }
//     };

//     return (
//         <div>
//             <h2>Book a Room</h2>
//             <input
//                 type="number"
//                 placeholder="Hotel ID"
//                 value={hotelId}
//                 onChange={(e) => setHotelId(Number(e.target.value))}
//             />
//             <input
//                 type="number"
//                 placeholder="Number of Rooms"
//                 value={rooms}
//                 onChange={(e) => setRooms(Number(e.target.value))}
//             />
//             <input
//                 type="date" // yyyy-MM-dd format
//                 placeholder="From Date"
//                 value={fromDate}
//                 onChange={(e) => setFromDate(e.target.value)}
//             />
//             <input
//                 type="date" // yyyy-MM-dd format
//                 placeholder="To Date"
//                 value={toDate}
//                 onChange={(e) => setToDate(e.target.value)}
//             />
//             <button onClick={handleBooking}>Book Room</button>
//             {message && <p style={{ color: 'green' }}>{message}</p>}
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//         </div>
//     );
// };

// export default BookRoom;


import React, { useState } from 'react';
import axios from 'axios';
import { useUserContext } from './UserContext'; // Import the useUserContext hook

const BookRoom: React.FC = () => {
    const { userId } = useUserContext(); // Access the userId from context
    const [hotelId, setHotelId] = useState<number | ''>('');
    const [rooms, setRooms] = useState<number | ''>('');
    const [fromDate, setFromDate] = useState<string>('');
    const [toDate, setToDate] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleBooking = async () => {
        if (userId === null) {
            setError('User must be logged in to book a room');
            return;
        }
        if (hotelId === '' || rooms === '' || fromDate === '' || toDate === '') {
            setError('Please fill all the fields');
            return;
        }

        try {
            // Ensure you use query parameters for the POST request
            const response = await axios.post('http://localhost:8080/user/users/booking', null, {
                params: {
                    hotelId,
                    rooms,
                    fromDate,
                    toDate
                },
                paramsSerializer: params => {
                    // Custom function to serialize params into query string
                    return new URLSearchParams(params).toString();
                }
            });
            
            setMessage(`Booking successful! Booking ID: ${response.data.id}`);
            setError(''); // Clear previous errors
        } catch (error: any) {
            if (error.response) {
                setError(error.response.data || 'An error occurred'); // Display backend error message
            } else {
                setError('An unexpected error occurred'); // Handle unexpected errors
            }
            setMessage(''); // Clear previous success messages
        }
    };

    return (
        <div>
            <h2>Book a Room</h2>
            <input
                type="number"
                placeholder="Hotel ID"
                value={hotelId}
                onChange={(e) => setHotelId(Number(e.target.value))}
            />
            <input
                type="number"
                placeholder="Number of Rooms"
                value={rooms}
                onChange={(e) => setRooms(Number(e.target.value))}
            />
            <input
                type="date" // yyyy-MM-dd format
                placeholder="From Date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
            />
            <input
                type="date" // yyyy-MM-dd format
                placeholder="To Date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
            />
            <button onClick={handleBooking}>Book Room</button>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default BookRoom;

