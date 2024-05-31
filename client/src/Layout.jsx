import Header from "./Header";
import Footer from "./Footer";
import './App.css';
import {Outlet} from "react-router-dom";



export default function layout() {
  return(
    <div className="py-4 px-10 flex flex-col max-h-screen max-w-8xl mx-auto">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
} 