"use client"
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from "react-slick";
import HorizontalEventCard from './HorizontalEventCard';
import { useEffect, useState } from 'react';

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

  const [data, setData] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        fetch('https://eea5ym4cdf.execute-api.us-east-1.amazonaws.com/dev/events')
            .then(response => response.json())
            .then((data: Event[]) => {
                setData(data);
                setIsLoading(false);
            })
            .catch((error: Error) => {
                setError(error.message);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div className="p-4">Loading...</div>;
    }

    if (error) {
        return <div className="p-4 text-red-600">Error: {error}</div>;
    }

    

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
        {data.length > 0 ? (
                data.map((event, index) => <HorizontalEventCard key={index} event={event}/>
                
                )
            ) : (
                <p>No events available.</p>
            )}
        </Slider>
      </div>
      </div>
    );
  }
  
  export default EventSlider