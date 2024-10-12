import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { SampleNextArrow, SamplePrevArrow } from "./Arrows";

export default function BannerGroup({ banners }) {
  // Settings for react-slick
  const settings = {
    infinite: true, // Infinite looping
    speed: 500, // Transition speed
    slidesToShow: 5, // Default to 5 banners on large screens
    slidesToScroll: 1, // Scroll one banner at a time
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    pauseOnHover: true, // Pause on hover
    responsive: [
      {
        breakpoint: 1280, // Large screens (e.g., laptops/desktops)
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // Medium screens (e.g., tablets)
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Small screens (e.g., smaller tablets)
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640, // Extra small screens (e.g., mobile devices)
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 570, // Extra small screens (e.g., mobile devices)
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="relative flex flex-col justify-center items-center w-full overflow-visible">
      <Slider {...settings} className="w-full">
        {banners.map((banner, index) => (
          <div key={index} className="relative">
            {" "}
            {/* Set relative positioning for the container */}
            <Link to={`/category/${banner.name}`} className="block">
              <div
                className="w-[180px] md:w-[230px]" // Set width for small and medium screens
                style={{
                  backgroundImage: `url(${banner.img})`, // Set the background image
                  backgroundSize: "cover", // Cover the entire div
                  backgroundPosition: "center", // Center the image
                  height: "360px", // Fixed height for the banner
                  borderRadius: "0.5rem", // Rounded corners
                  margin: "0 auto", // Center the div
                  position: "relative", // Allow absolute positioning of child elements
                }}
                alt={`Banner ${index + 1}`}
              >
                <span
                  className="font-bold text-left" // Align text to the left
                  style={{
                    position: "absolute", // Position the text absolutely
                    top: "10px", // Position from the top
                    left: "10px", // Position from the left
                    color: "black", // Text color
                    padding: "5px", // Padding for the text
                  }}
                >
                  {banner.name} {/* Display the name */}
                </span>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}
