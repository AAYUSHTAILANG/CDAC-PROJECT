import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import c1 from '../images/c1.jpg';
import c2 from '../images/c2.jpg';
import c3 from '../images/c3.jpg';
import './mainhome.css'; 
export default function MainHome() {
  return (
    <div  className="slider-container .img-fluid . max-width: 100% height: auto">
    <Carousel autoPlay={true} interval={2000} showArrows={true} infiniteLoop={true} style={{ width: '100%', maxWidth: '100vw' }}>
      <div>
        <img src={c1} alt="Image 1"  />
      </div>
      <div>
        <img src={c2} alt="Image 2"  />
      </div>
      <div>
        <img src={c3} alt="Image 3"  />
      </div>
    </Carousel>
  </div>
  );
}
