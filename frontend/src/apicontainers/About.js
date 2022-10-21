import React from "react";

const About = ({ setProgress }) => {
  setProgress(100);

  return (
    <div className="container mt-2">
      <div className="jumbotron">
        <h1 className="display-4">Hello</h1>

        <p className="lead">
          This is a web-based user generated application where authenticated
          users can share the experience about their tour. Like the places they
          had traveled, the beauty of that places, Total Cost, Food Experience,
          Hotel Availability, Rating, Riskiness, Locals’ behavior etc.
        </p>

        <ul>
          <li>
            This web App will Help a lot of travelers to find an actual
            beautiful place by real life user’s post.
          </li>
          <li>
            Most of the time a new traveler can’t collect enough information
            about a place where he is going to travel like how much money he
            would need and what hotel is exactly suitable for his budget.
          </li>
          <li>
            He can compare different experience from multiple users of a same
            place and thus he can take proper decision.
          </li>
          <li>
            Travel is the most important thing of a human life. But most of the
            people can’t travel because of the lacking of enough knowledge so
            this site can be helped those people with some valuable data.
          </li>
        </ul>
        <p className="lead" style={{ fontWeight: "bold", color: "red" }}>
          This Website is Under Construction and Developed by Mubtasim Rahman
          Nabil Roll - 1903180 Due to The Course of CSE 2100 Under The
          Supervisor Tasmia Jannat
        </p>
        <hr className="my-4" />
        <div className="row">
          <div className="col-sm-6">
            <h4 style={{ textAlign: "center" }}>Submitted To</h4>
            <h5 style={{ textAlign: "center" }}>Tasmia Jannat</h5>
            <h5 style={{ textAlign: "center" }}>Lecturer</h5>
            <h5 style={{ textAlign: "center" }}>
              Rajshahi University of Engineering and Technology
            </h5>
          </div>
          <div className="col-sm-6">
            <h4 style={{ textAlign: "center" }}>Submitted By</h4>
            <h5 style={{ textAlign: "center" }}>Mubtasim Rahman Nabil</h5>
            <h5 style={{ textAlign: "center" }}>Roll - 1903180</h5>
            <h5 style={{ textAlign: "center" }}>
              Rajshahi University of Engineering and Technology
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
