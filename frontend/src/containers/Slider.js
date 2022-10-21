import React from "react";
import img1 from "./images/img1.jpg";
import img2 from "./images/img2.jpg";
import img3 from "./images/img3.jpg";

const Slider = () => {
  return (
    <div className="container mt-2" style={{ width: "880px" }}>
      <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators" style={{display:"none"}}>
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="0"
            class="active"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="1"
            aria-label="Slide 2"
            class=""
          ></button>
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="2"
            aria-label="Slide 3"
            class="active"
            aria-current="true"
          ></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item">
            <img
              src={img2}
              alt=""
              style={{ height: "500px", width: "inherit" }}
            />
          </div>
          <div class="carousel-item active carousel-item-start">
            <img
              src={img3}
              alt=""
              style={{ height: "500px", width: "inherit" }}
            />
          </div>
          <div class="carousel-item carousel-item-next carousel-item-start">
            <img
              src={img1}
              alt=""
              style={{ height: "500px", width: "inherit" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;


