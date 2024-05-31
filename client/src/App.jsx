import './App.css'
import {Route, Routes} from 'react-router-dom';
import IndexPage from "./pages/IndexPage.jsx";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";  
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import ProfilePage from './pages/ProfilePage.jsx';
import BooksPage from './pages/BooksPage.jsx';
import BooksFormPage from './pages/BooksFormPage.jsx';
import BookPage from './pages/BookPage.jsx';
import BookingsPage from "./pages/BookingsPage";
import BookingPage from "./pages/BookingPage";
import { AppProvider } from "./Context.jsx";
import BookList from "./components/BookList/BookList.jsx";
import BookDetails from './components/BookDetails/BookDetails.jsx';




axios.defaults.baseURL = 'http://localhost:3002';
axios.defaults.withCredentials = true;

function App() { 
  return (
    <AppProvider>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/account/:subpage?" element={<ProfilePage />} />
            <Route path="/account/Books" element={<BooksPage />} />
            <Route path="/account/Books/new" element={<BooksFormPage />} />
            <Route path="/account/Books/:id" element={<BooksFormPage />} />
            <Route path="/Bookks/:id" element={<BookPage />} />
            <Route path="/account/bookings" element={<BookingsPage />} />
            <Route path="/account/bookings/:id" element={<BookingPage />} />
            <Route path="book" element={<BookList />} />
            <Route path = "/book/:id" element = {<BookDetails />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </AppProvider>   
  )
}

export default App
