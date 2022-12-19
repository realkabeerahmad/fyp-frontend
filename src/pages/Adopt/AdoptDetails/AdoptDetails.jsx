import { Pets } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdoptDetails.css";

// ---------------------------------------------------

const AdoptDetails = ({ Pet }) => {
  const Navigate = useNavigate();
  return (
    <div className="Details">
      <div className="Details-Left">
        <Link to="/adopt">
          <i className="fa fa-arrow-left"></i>
        </Link>
        <img src={Pet.image} alt={Pet._id} />
      </div>
      <div className="Details-Right">
        <div className="Details-intro">
          <h1>{Pet.name.toUpperCase()}</h1>
          {Pet.shelter.name ? (
            <h2>{Pet.shelter.name.toUpperCase()}</h2>
          ) : (
            <h2></h2>
          )}
        </div>
        <div className="Details-details">
          <p className="details-description">{Pet.bio}</p>
          <table>
            <tbody>
              <tr>
                <th>Type:</th>
                <td>{Pet.type}</td>
                <th>Breed:</th>
                <td>{Pet.breed}</td>
              </tr>
              <tr>
                <th>Gender:</th>
                <td>{Pet.gender}</td>
                <th>Age:</th>
                <td>{Pet.age}</td>
              </tr>
              {Pet.passport ? (
                <tr>
                  <th>Passport No:</th>
                  <td>{Pet.passport}</td>
                  <th></th>
                  <td></td>
                </tr>
              ) : (
                <></>
              )}
            </tbody>
          </table>
        </div>
        <div className="details-button">
          {/* <div className="details-fav">
            <i className="fa fa-heart"></i>
          </div> */}
          <Button
            color="error"
            variant="contained"
            sx={{
              fontSize: 20,
              position: "sticky",
              bottom: 0,
              width: "100%",
              justifyContent: "center",
            }}
            onClick={() => Navigate("/adopt/" + Pet._id + "/application")}
          >
            <Pets sx={{ mr: 1 }} />
            Adopt
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdoptDetails;
