"use client"
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from "react-slick";
import HorizontalEventCard from './HorizontalEventCard';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "flex", justifyContent: "center", alignItems: "center", background: "#111111" , scale: "2", height: "18px", width: "18px",  borderRadius: "50%"}}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "flex", justifyContent: "center", alignItems: "center", background: "#111111" , scale: "2", height: "18px", width: "18px",  borderRadius: "50%"}}
        onClick={onClick}
      />
    );
  }
function EventSlider() {
    const settings = {
      dots: true,
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };
    return (
      <div className='w-full'>
        <div className="slider-container">
        <Slider {...settings}>
            <HorizontalEventCard event={{title: "hi"}}/>
            <HorizontalEventCard event={{title: "hi"}}/>
            <HorizontalEventCard event={{title: "hi"}}/>
            <HorizontalEventCard event={{title: "hi"}}/>
            <HorizontalEventCard event={{title: "hi"}}/>
            <HorizontalEventCard event={{title: "hi"}}/>
        </Slider>
      </div>
      </div>
    );
  }
  
  export default EventSlider