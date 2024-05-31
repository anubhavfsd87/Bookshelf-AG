import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import AddressLink from "../AddressLink";
import BookGallery from "../BookGallery";
import BookingDates from "../BookingDates";


export default function BookingPage() {
  const {id} = useParams();
  const [booking,setBooking] = useState(null);
  useEffect(() => {
    if (id) {
      axios.get('/bookings').then(response => {
        const foundBooking = response.data.find(({_id}) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return '';
  }

  return (
    <div className="flex-c my-8">
      <h1 className="text-3xl">{booking.book.title}</h1>
      <AddressLink className="my-2 text-white text-2xl block">{booking.book.address}ASIA</AddressLink>
      <div className="bg-gray-200 p-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-4">Your booking information:</h2>
          <BookingDates booking={booking} />
        </div>
        <div className="bg-primary p-6 text-white rounded-2xl">
          <div>Total price</div>
          <div className="text-3xl"> ₹{booking.price}</div>
        </div>
      </div>
      <BookGallery book={booking.book} />
    </div>
  );
}