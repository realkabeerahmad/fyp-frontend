import { Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./AdoptCard.css";

const AdoptCard = ({ Pet, setPet }) => {
  const setPetDetails = () => {
    setPet(Pet);
  };
  return (
    <Box
      className="Hover"
      sx={{
        width: "250px",
        height: "300px",
        backgroundColor: "white",
        borderRadius: 2,
        border: "1px solid #cfcfcf",
        gridRow: "span 1",
        gridColumn: "span 1",
        contain: "content",
      }}>
      <Link
        to={`/adopt/${Pet._id}`}
        onClick={setPetDetails}
        className="PetCardWrap">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            contain: "content",
          }}>
          <Box
            sx={{
              height: "150px",
              contain: "content",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#cfcfcf",
            }}>
            <img
              src={Pet.image}
              alt={Pet._id}
              title={`Pet Name: ${Pet.name} | Shelter Name: ${Pet.shelterName}`}
              style={{ width: "100%" }}
            />
          </Box>
          <Box sx={{ p: 1, contain: "content" }}>
            <Box>
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
              <p style={{ lineBreak: "anywhere", textOverflow: "ellipsis" }}>
                {Pet.bio.slice(0, 55)}
                ...
              </p>
            </Box>
          </Box>
        </Box>
      </Link>
    </Box>
  );
};

export default AdoptCard;
