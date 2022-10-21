import React from 'react'

const Extra = () => {

    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const [days_stayed, setDays_stayed] = useState(null);
    const [hotel_name, setHotel_name] = useState(null);
    const [total_travellers, setTotal_travellers] = useState(null);
    const [total_costs, setTotal_costs] = useState(null);
    const [rating, setRating] = useState(null);
    const [food_experience, setFood_experience] = useState(null);
    const [locals_behavior, setLocals_behavior] = useState(null);
    const [worth, setWorth] = useState(null);
    const [riskiness, setRiskness] = useState(null);
    const [image, setImage] = useState(null);
  
    const onSubmit = ()=>{
      let formData = new FormData()
    }
  
  

   
  return (
    <div>Extra</div>
  )
}

// export default Extra


import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { createPost, loadMyProfile } from "../actions/api";
import axios from "axios";

const NewPost = () => {
  const [postDone, setPostDone] = useState(false);

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState("");
  const [days_stayed, setDaysStayed] = useState("");
  // const [hotel_name, setHotelName] = useState("");
  const [total_travellers, setTotalTravellers] = useState("");
  const [total_cost, setTotalCost] = useState("");
  const [rating, setRating] = useState("");
  // const [food_experience, setFoodExperience] = useState("");
  // const [locals_behavior, setLoaclsBehavior] = useState("");
  // const [worthness, setWorthness] = useState("");
  // const [riskness, setRiskness] = useState("");
  const [author, setAuthor] = useState("15");

  useEffect(() => {
    loadMyProfile();
  }, []);

  const AddPost = async () => {
    var formField = new FormData();
    formField.append("title", "nana");
    formField.append("content", "nana Patekar");
    formField.append("days_stayed", days_stayed);
    // formField.append("hotel_name", hotel_name);
    formField.append("total_traveller", total_travellers);
    formField.append("total_cost", total_cost);
    formField.append("rating", rating);
    // formField.append("food_experience", food_experience);
    // formField.append("localsBehaviour", locals_behavior);
    // formField.append("worthness", worthness);
    // formField.append("riskness", riskness);
    formField.append("author", author);
    if (image !== null) {
      formField.append("image", image);
    }
    console.log(formField);

    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      };
      try {
        await axios({
          method: "POST",
          url: "http://127.0.0.1:8000/api/",
          data: formField,
          headers: {
            Authorization: `JWT ${localStorage.getItem("access")}`,
          },
        });
        console.log(formField);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="container">
      <h1>Add Products</h1>
      <div className="container">
        <div className="form-group">
          <div className="form-group">
            <label htmlFor="">Select An Image to Upload</label>
            <input
              type="file"
              className="form-control form-control-lg mt-1"
              name="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg mt-1"
              placeholder="Enter Content"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control form-control-lg mt-1"
              placeholder="Enter Days Stayed"
              name="days_stayed"
              value={days_stayed}
              onChange={(e) => setDaysStayed(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg mt-1"
              placeholder="Enter Total Travellers"
              name="total_travellers"
              value={total_travellers}
              onChange={(e) => setTotalTravellers(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg mt-1"
              placeholder="Enter Total Cost"
              name="total_cost"
              value={total_cost}
              onChange={(e) => setTotalCost(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg mt-1"
              placeholder="Enter Rating"
              name="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </div>
          <button className="btn btn-success mt-2" onClick={AddPost}>
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.api.profile,
});
// export default connect(mapStateToProps, { createPost, loadMyProfile })(NewPost);
// export default NewPost;
