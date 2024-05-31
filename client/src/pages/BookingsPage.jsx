import AccountNav from "../AccountNav";
import {useEffect, useState} from "react";
import axios from "axios";
import BookImg from "../BookImg";
import {Link} from "react-router-dom";
import BookingDates from "../BookingDates";



export default function BookingsPage() {
  const [bookings,setBookings] = useState([]);
  useEffect(() => {
    axios.get('/bookings').then(response => {
      setBookings(response.data);
    });
  }, []);
  return (
    <div className="mt-3 flex-c -p-1 text-1xl bg-lightblack rounded-3xl">
      <AccountNav />
      <div className="flex-c bg-primary p-2 text-center text-white mx-auto text-5xl"> TOTAL ORDERS
        {bookings?.length > 0 && bookings.map(booking => (
          <Link to={`/account/bookings/${booking._id}`} className="flex gap-4 bg-gray-200 overflow-hidden">
            <div className="flex flex-c w-48 h-40 -p-3">
              <BookImg book={booking.book} />
            </div>
            <br/>
            <div className="flex py-3 pr-3 bg-white p-5 items-center grow">
              <h2 className="flex text-xl text-primary p-1">{booking.book.title}</h2>
              <div className="text-xl p-1">
                <BookingDates booking={booking} className="mb-2 mt-4 text-gray-500" />
                <div className="flex gap-1 p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                  </svg>
                  <span className="text-2xl">
                    Total price:  ₹{booking.price}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}