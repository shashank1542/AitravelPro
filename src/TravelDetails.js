import React from "react";
import "./TravelDetails.css";

const TravelDetails = ({ tripDetails }) => {
  let data;
  try {
    data = JSON.parse(tripDetails);
  } catch (error) {
    return <div>Error: Unable to parse trip details</div>;
  }

  if (data.error) {
    return <div>{data.error}</div>;
  }

  return (
    <div className="travel-details">
      <h2>Travel Details</h2>
      <div className="section">
        <h3>Destination: {data.destination}</h3>
        <p>Duration: {data.Duration}</p>
        <p>Travelers: {data.Travelers}</p>
        <p>Mode of Travel: {data.travel}</p>
      </div>
      <div className="section">
        <h3>Itinerary</h3>
        {data.days.map((day, index) => (
          <div key={index} className="day">
            <h4>Day {index + 1}</h4>
            <ul>
              {day.map((activity, i) => (<li key={i}>{activity}</li>))}
            </ul>
          </div>
        ))}
      </div>
      <div className="section">
        <h3>Best Accommodations</h3>
        <ul>
          {data.bestAccommodations.map((accommodation, index) =>(<li key={index}>{accommodation}</li>))}
        </ul>
      </div>
      <div className="section">
        <h3>Dining Options</h3>
        <ul>
          {data.Dining.map((restaurant, index) => (<li key={index}>{restaurant}</li>))}
        </ul>
      </div>
      <div className="section">
        <h3>Activities</h3>
        <ul>
          {data.Activities.map((activity, index) => (<li key={index}>{activity}</li>))}
        </ul>
      </div>
      <div className="section">
        <h3>Tips</h3>
        <ul>{data.Tips.map((tip, index) => (<li key={index}>{tip}</li>))}
        </ul>
      </div>
    </div>
  );
};

export default TravelDetails;
