import {useContext, useEffect, useState} from "react";
import {differenceInCalendarDays} from "date-fns";
import axios from "axios";
import {Navigate} from "react-router-dom";
import {UserContext} from "./UserContext.jsx";
import PhoneNumberValidation from "./components/PhoneValidation/PhoneNumberValidation.jsx";


export default function BookingWidget({book}) {
  const [checkIn,setCheckIn] = useState('');
  const [checkOut,setCheckOut] = useState('');
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [redirect,setRedirect] = useState('');
  const {user} = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email)
    }
  }, [user]);

  let numberOfBooks = 0;
  if (checkIn && checkOut) {
    numberOfBooks = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }

  async function bookThisBook() {
    const response = await axios.post('/bookings', {
      checkIn,checkOut,name,email,title,
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
    <div className="p-1 bg-white shadow p-4 bg-black rounded-2xl">
      <div className="text-4xl bg-black text-white text-center">
        Price: ₹{book.price} / per day
      </div>
      <div className="border text-black bg-blue rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4 bg-blue">
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
        {numberOfBooks > 0 && (
          <div className="py-3 px-4 border-t bg-primary ">
            <label>Your full name:</label>
              <input type="text"
                value={name}
                onChange={ev => setName(ev.target.value)}/>
            <label>Your Email Address:</label>
              <input type="text"
                value={email}
                onChange={ev => setEmail(ev.target.value)}/>      
          </div>
        )}
        <br />
        <div className="bg-black text-white p-3 mt-2 text-center text-4xl text-bold ml-4 mr-9">
          <label> Valid Phone Number </label>
          <PhoneNumberValidation />
        </div>  
      </div>  
         
      <button onClick={bookThisBook} className="primary mt-4">
        Read this book online <br/>
        {numberOfBooks > 0 && (
          <span> ₹{numberOfBooks * book.price}</span>
        )}
      </button>
    </div>
  );
}