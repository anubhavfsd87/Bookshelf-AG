import { useContext } from "react";
import {Link} from "react-router-dom";
import { UserContext } from "./UserContext";
import headerImg from "../src/images/log.jpg";
import { Row, Col } from "react-bootstrap";
import TrackVisibility from "react-on-screen";
import "./App.css";

export default function Header(){
  
  const {user} = useContext(UserContext);
  
  return (
    <session className="banner flex-c" id="home">
     <div className=" flex gap-5 ml-6 items-center flex-c">
        <header className="flex flex-c justify-between bg-lightblack text-center rounded-full w-full gap-3">
          <Link to={'/'} className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-7 h-8 -rotate-360">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
            </svg>
            <span className="flex flex-c -p-3 font-bold text-3xl object-cover mr-9 border-cover w-9">BOOKSHELF</span>
          </Link> 
          <br />
          <div className="flex-c text-4xl">
            <Row>  
              <Col xs={9} md={9} xl={9}>
                <TrackVisibility>
                {({ isVisible }) =>
                  <div className={isVisible ? "animate__animated animate__zoomIn center" : ""}>
                    <img src={headerImg} alt="Header Img"/>
                  </div>}
                </TrackVisibility>
              </Col>  
            </Row>
          </div> 
          <br />
          <Link to={user?'/account':'/login'} className="flex flex-c items-center gap-2 bg-lightblack ml-8 border-blue-300 font-bold text-2xl rounded-full py-4 px-4 p-7">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <div className="flex bg-gray-500 text-white rounded-full border bg-primary border-gray-500 overflow-hidden px-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6  h-7 relative -bottom-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </div>
            {!!user && (
              <div>
                {user.name}
              </div>
            )}
            
          </Link> 
        </header> 
      </div>  
    </session>
  )
}

