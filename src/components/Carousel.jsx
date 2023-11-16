import React, { useEffect, useState } from 'react';
import '../components/Carousel.css';


const Carousel = () => {
  const [slideIndex, setSlideIndex] = useState(1);
  let slides, dots; // Define slides and dots variables

  const plusSlides = (n) => {
    slider(slideIndex + n);
  };

  const currentSlide = (n) => {
    slider(n);
  };

  const slider = (n) => {
    let counter = n;

    if (counter > slides.length) {
      counter = 1;
    }
    if (counter < 1) {
      counter = slides.length;
    }

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(' active', '');
    }

    slides[counter - 1].style.display = 'block';
    dots[counter - 1].className += ' active';
    setSlideIndex(counter);
  };

  useEffect(() => {
    slides = document.getElementsByClassName('mySlides');
    dots = document.getElementsByClassName('dot');
    slider(slideIndex);

    // Automatically move to the next slide every 3 seconds (adjust the interval as needed)
    const intervalId = setInterval(() => {
      plusSlides(1);
    }, 3000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [slideIndex]);


  return (
    <div>
      <div className="slideshow-container">
        {/* Slides */}
        <div className="mySlides image1">
          <img
            src={process.env.PUBLIC_URL + '/HomePageImages/CarImage1.png'}
            alt=""
            width="100%"
          />
          <div className="ImageText">
             <h1 style={{  paddingBottom: '20px'}}>All-in-one</h1>
             <h3 style={{ width: '466px', paddingBottom: '50px'}}>The one solution for all your tech needs</h3>
             <h6 style={{ width: '555px'}}>Laptops are a quick and easy way to store information from the web</h6>
             </div>
        </div>
        <div className="mySlides image2 ">
          <img
            src={process.env.PUBLIC_URL + '/HomePageImages/mobile.png'}
            alt=""
            width="100%"
          />
          <div className="ImageText">
             <h1 style={{ width:'585px', paddingBottom: '20px'}}>GET THE NEW IPHONE 12 PRO</h1>
             <h6 style={{ width: '555px'}}>A transformative triple‑camera system that adds tons of capability without complexity</h6>
             </div>
        </div>

        <div className='Navdots' style={{ textAlign: 'center' }}>
        <span className="dot" onClick={() => currentSlide(1)}></span>
        <span className="dot" onClick={() => currentSlide(2)}></span>
      </div>


        {/* ... other slides */}
        {/* Navigation */}
        <a className="prev fas fa-arrow-left" onClick={() => plusSlides(-1)}></a>
        <a className="next fas fa-arrow-right" onClick={() => plusSlides(1)}></a>
      </div>
      <br />
      {/* Dots */}
     
    </div>
  );
};

export default Carousel;
