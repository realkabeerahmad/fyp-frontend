import React from "react";
import { Link } from "react-router-dom";
import "./AdoptCard.css";

const AdoptCard = ({ Pet, setPet }) => {
  const setPetDetails = () => {
    setPet(Pet);
  };
  return (
    <div className="petAdoptionCard">
      <Link
        to={`/adopt/${Pet._id}`}
        onClick={setPetDetails}
        className="PetCardWrap"
      >
        <div className="pet-adopt">
          <div className="pet-adopt-left">
            <img
              src={"http://localhost:8000/" + Pet.image}
              alt={Pet._id}
              title={`Pet Name: ${Pet.name} | Shelter Name: ${Pet.shelterName}`}
            />
          </div>
          <div className="pet-adopt-right">
            <div className="pet-info-head">
              <h2 className="petName">{Pet.name.toUpperCase()}</h2>
              <h4 className="ShelterName">{Pet.shelterName.toUpperCase()}</h4>
            </div>
            <p className="description">{Pet.bio.slice(0, 50)}...</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AdoptCard;
