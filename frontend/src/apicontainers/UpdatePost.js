import axios from "axios";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { loadMyProfile, updatePost } from "../actions/api";

const UpdatePost = ({ profile, loadMyProfile, updatePost }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [days_stayed, setDays_stayed] = useState("");
  const [hotel_name, setHotel_name] = useState(null);
  const [total_travellers, setTotal_travellers] = useState("");
  const [total_costs, setTotal_costs] = useState("");
  const [rating, setRating] = useState("");
  const [food_experience, setFood_experience] = useState("");
  const [locals_behavior, setLocals_behavior] = useState("");
  const [worth, setWorth] = useState("");
  const [riskiness, setRiskness] = useState("");
  const [image, setImage] = useState(null);

  const [dataid, setDataID] = useState(null);

  const { id } = useParams();
  const getPostForUpdate = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/get/${id}/`);
    const data = res.data[0];

    setDataID(data?.author);

    setTitle(data?.title);
    setDays_stayed(data?.days_stayed);
    setContent(data?.content);
    setHotel_name(data?.hotel_name);
    setTotal_travellers(data?.total_travellers);
    setTotal_costs(data?.total_costs);
    setRating(data?.rating);
    setFood_experience(data?.food_experience);
    setLocals_behavior(data?.locals_behavior);
    setWorth(data?.worth);
    setRiskness(data?.riskiness);

    setImage(data?.image);
  };

  const handleUpdate = async () => {
    let formField = new FormData();

    formField.append("title", title);
    formField.append("content", content);
    formField.append("days_stayed", days_stayed);
    formField.append("hotel_name", hotel_name);
    formField.append("total_travellers", total_travellers);
    formField.append("total_costs", total_costs);
    formField.append("rating", rating);
    formField.append("food_experience", food_experience);
    formField.append("locals_behavior", locals_behavior);
    formField.append("worth", worth);
    formField.append("riskiness", riskiness);
    if (image !== null) {
      formField.append("image", image);
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    console.log(formField.values);

    try {
      const res = await axios.put(
        `http://127.0.0.1:8000/update-post/${id}/`,
        formField,
        config
      );
    } catch (err) {}
  };

  useEffect(() => {
    loadMyProfile();
    getPostForUpdate();
  }, []);

  return (
    <div className="container">
      {profile?.userdata.id === dataid ? (
        <>
          <h3 className="mt-2">Update Your Post</h3>

          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group">
                    <label>Title</label>
                    <input
                      onChange={(e) => setTitle(e.target.value)}
                      type="text"
                      class="form-control"
                      value={title}
                    />
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <label>Days Stayed</label>
                    <input
                      onChange={(e) => setDays_stayed(e.target.value)}
                      type="number"
                      class="form-control"
                      value={days_stayed}
                    />
                  </div>
                </div>
              </div>
              <br />
              <div class="form-group">
                <label>Content</label>
                <textarea
                  style={{ height: "110px" }}
                  onChange={(e) => setContent(e.target.value)}
                  type="text"
                  class="form-control"
                  value={content}
                />
              </div>
              <div class="form-group">
                <img
                  className="update__image"
                  src={`${image}`}
                  alt=""
                  srcset=""
                />
                <label>Uplode Image</label>
                <input
                  className="form-control"
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>

              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group">
                    <label>Hotel Name(optional)</label>
                    <input
                      onChange={(e) => setHotel_name(e.target.value)}
                      type="text"
                      class="form-control"
                      value={hotel_name}
                    />
                  </div>
                  <div class="form-group">
                    <label>Total Travellers</label>
                    <input
                      onChange={(e) => setTotal_travellers(e.target.value)}
                      type="number"
                      class="form-control"
                      value={total_travellers}
                    />
                  </div>
                  <div class="form-group">
                    <label for="inputState">Food Experience</label>
                    <select id="inputState" class="form-control">
                      <option selected>{food_experience}</option>
                      <option>Good</option>
                      <option>Very Good</option>
                      <option>Not Bad</option>
                      <option>Bad</option>
                      <option>Worst</option>
                      onChange={(e) => setFood_experience(e.target.value)}
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Worthness</label>
                    <input
                      onChange={(e) => setWorth(e.target.value)}
                      type="number"
                      class="form-control"
                      value={worth}
                    />
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <label>Total Cost</label>
                    <input
                      onChange={(e) => setTotal_costs(e.target.value)}
                      type="number"
                      class="form-control"
                      value={total_costs}
                    />
                  </div>
                  <div class="form-group">
                    <label>Rating out of 10</label>
                    <input
                      onChange={(e) => setRating(e.target.value)}
                      type="number"
                      class="form-control"
                      value={rating}
                    />
                  </div>
                  <div class="form-group">
                    <label for="inputState">Locals Behavior</label>
                    <select id="inputState" class="form-control">
                      <option selected>{locals_behavior}</option>
                      <option>Good</option>
                      <option>Very Good</option>
                      <option>Not Bad</option>
                      <option>Bad</option>
                      <option>Worst</option>
                      onChange={(e) => setLocals_behavior(e.target.value)}
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Riskness</label>
                    <input
                      onChange={(e) => setRiskness(e.target.value)}
                      type="number"
                      class="form-control"
                      value={riskiness}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            class="btn btn-primary mt-2"
            onClick={handleUpdate}
          >
            Submit
          </button>
          <br />
          <br />
        </>
      ) : (
        <>
          <h4>
            You Can't View This Page Because You are Not the Author of this
            Post...Ok Bye ;)
          </h4>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.api.profile,
});
export default connect(mapStateToProps, { loadMyProfile, updatePost })(
  UpdatePost
);
