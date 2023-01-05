import { ArrowBack, Pets, Favorite, FavoriteBorder } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import url from "../../../apiCalls/api";
import "./AdoptDetails.css";

// ---------------------------------------------------

const AdoptDetails = ({ Pet, user, setUser, login }) => {
  const Navigate = useNavigate();
  var [liked, setLiked] = useState(false);
  var [first, setFirst] = useState(true);
  if (login) {
    if (user.pet_wish.length > 0 && first) {
      for (let i = 0; i < user.pet_wish.length; i++) {
        if (user.pet_wish[i]._id === Pet._id) {
          setLiked(true);
          // console.log(liked);
          break;
        }
      }

      setFirst(false);
    }
  }
  const wish = () => {
    if (login) {
      const data = { userId: user._id, _id: Pet._id };
      axios
        .post(url + "/pet/wish", data)
        .then((res) => {
          if (res.data.status === "success") {
            setUser(res.data.data);
            // setFirst(false);
            if (res.data.message === "Added to WishList") {
              setLiked(true);
            } else if (res.data.message === "Removed from WishList") {
              setLiked(false);
            }
            // alert(res.data.message);
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      Navigate("/login");
    }
  };
  return (
    <div className="Details">
      <div className="Details-Left">
        <IconButton
          sx={{ position: "absolute", top: 10, left: 10 }}
          onClick={() => Navigate(-1)}
        >
          <ArrowBack />
        </IconButton>
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
          <Button
            color="error"
            variant="text"
            sx={{
              fontSize: 20,
              position: "sticky",
              bottom: 0,
              width: "20%",
              justifyContent: "center",
            }}
            onClick={wish}
          >
            {liked ? <Favorite /> : <FavoriteBorder />}
          </Button>
          <Button
            color="error"
            variant="contained"
            sx={{
              fontSize: 20,
              position: "sticky",
              bottom: 0,
              width: "80%",
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
