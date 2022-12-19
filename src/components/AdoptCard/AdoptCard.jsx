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
              src={Pet.image}
              alt={Pet._id}
              title={`Pet Name: ${Pet.name} | Shelter Name: ${Pet.shelterName}`}
            />
          </div>
          <div className="pet-adopt-right">
            <div className="pet-info-head">
              <h2 className="petName">{Pet.name.toUpperCase()}</h2>
              {Pet.shelter.name ? (
                <h4 className="ShelterName">
                  {Pet.shelter.name.toUpperCase()}
                </h4>
              ) : Pet.user.name ? (
                <h4 className="ShelterName">{Pet.user.name.toUpperCase()}</h4>
              ) : (
                <></>
              )}
            </div>
            <p className="description">{Pet.bio.slice(0, 50)}...</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AdoptCard;
