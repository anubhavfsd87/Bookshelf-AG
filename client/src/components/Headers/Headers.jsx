
import { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import "./Headers.css";
import { Row, Col } from "react-bootstrap";
import TrackVisibility from "react-on-screen";
import 'animate.css';

const Headers = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [ "Your Predella", "Shelving", "Books-Rack" ];
  const period = 2000;

    useEffect(() => {
        let ticker = setInterval(() => {
          tick();
        }, delta);

      return () => { clearInterval(ticker) };
    }, [text])

    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
          setDelta(prevDelta => prevDelta / 2);
        }

        if (!isDeleting && updatedText === fullText) {
          setIsDeleting(true);
          setIndex(prevIndex => prevIndex - 1);
          setDelta(period);
        } else if (isDeleting && updatedText === '') {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
          setIndex(1);
          setDelta(500);
        } else {
        setIndex(prevIndex => prevIndex + 1);
        }
    } 
  return (
    <section className=" flex-c banner align-items-center p-1 grow w-full items-center justify-center justify-between justify-around text-center ml-3 mb-5 mt-3 mr-9 max-w-md mx-auto" id="home">
      
        <header className='header'>
          <div className='flex header-content flex-c items-center justify-between justify-center text-center text-white items-center mr-8 p-5 mt-2 mx-auto ml-7'>
            <h2 className='header-title text-capitalize'>find your book of choice.</h2><br />
            <p className='header-text fs-18 fw-3 mt-2'>You can search any book like #romance_novel #fiction #mystery #fiction #technology #education whichever book you may like just search it. This shelf will load the following content below, Have a great time. Your Faithfully #BOOKSHELF See you there.</p>
            <Row className="align-items-center">
              <Col xs={12} md={6} xl={7}>
                  <TrackVisibility>
                      {({ isVisible }) =>
                      <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                        <h1>{`love walking into a bookstore...`} <span className="txt-rotate" dataPeriod="1000" data-rotate='[ "Web Developer", "Web Designer", "UI/UX Designer" ]'><span className="wrap">{text}</span></span></h1>
                          <p></p>
                      </div>}
                    </TrackVisibility>
              </Col>
            </Row> 
            <SearchForm />
          </div>
        </header>
    </section>
  )
}

export default Headers