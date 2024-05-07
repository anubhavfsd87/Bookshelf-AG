import {useContext, useEffect, useState} from "react";
import {differenceInCalendarDays} from "date-fns";
import axios from "axios";
import {Navigate} from "react-router-dom";
import {UserContext} from "./UserContext.jsx";

export default function BookingWidget({book}) {
  const [checkIn,setCheckIn] = useState('');
  const [checkOut,setCheckOut] = useState('');
  const [name,setName] = useState('');
  const [phone,setPhone] = useState('');
  const [redirect,setRedirect] = useState('');
  const {user} = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfBooks = 0;
  if (checkIn && checkOut) {
    numberOfBooks = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }

  async function bookThisBook() {
    const response = await axios.post('/bookings', {
      checkIn,checkOut,name,phone,
      book:book._id,
      price:numberOfBooks * book.price,
    });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: ${book.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label>Check in:</label>
            <input type="date"
                   value={checkIn}
                   onChange={ev => setCheckIn(ev.target.value)}/>
          </div>
          <div className="py-3 px-4 border-l">
            <label>Check out:</label>
            <input type="date" value={checkOut}
                   onChange={ev => setCheckOut(ev.target.value)}/>
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          {numberOfBooks > 0 && (
                <div className="py-3 px-4 border-t">
                  <label>Your full name:</label>
                    <input type="text"
                      value={name}
                      onChange={ev => setName(ev.target.value)}/>
                 <label>Phone number:</label>
                   <input type="tel"
                      value={phone}
                      onChange={ev => setPhone(ev.target.value)}/>
                </div>
            )}
        </div>
     </div>   
      <button onClick={bookThisBook} className="primary mt-4">
        Book this book
        {numberOfBooks > 0 && (
          <span> ${numberOfBooks * book.price}</span>
        )}
      </button>
    </div>
  );
}