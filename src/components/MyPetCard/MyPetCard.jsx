import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./MyPetCard.css";
import axios from "axios";
import Modal from "@mui/material/Modal";
import DeleteIcon from "@mui/icons-material/Delete";

// -------------------------------------------------

const MyPetCard = ({ Pet, setPet, setPets, user }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const setPetDetails = () => {
    setPet(Pet);
  };
  const deletePet = () => {
    const data = { _id: Pet._id };
    axios
      .post("http://localhost:8000/pet/deletePet", data)
      .then((res) => {
        alert(res.data.message);
        handleClose();
        const d = { userId: user._id };
        axios
          .post("http://localhost:8000/pet/showAllPets", d)
          .then((r) => {
            setPets(r.data.pets);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <div className="pet-card">
      <Link
        to={`/my_pets/${Pet._id}/details_and_gallery`}
        onClick={setPetDetails}
      >
        <div className="pet-card-wrapper">
          <div className="pet-img">
            <img src={"http://localhost:8000/" + Pet.image} alt="" />
          </div>
          <div className="pet-details">
            <p className="pet-name">{Pet.name}</p>
            <p className="pet-dob">{Pet.dob.slice(0, 10)}</p>
          </div>
        </div>
      </Link>
      <button className="delete-btn" onClick={handleOpen}>
        <DeleteIcon />
      </button>
      <Modal open={open} onClose={handleClose}>
        <div className="add">
          <div className="confirm">
            <h2>Are You Sure?</h2>
            <div className="confirm-btns">
              <button className="confirm-btn" onClick={deletePet}>
                Confirm
              </button>
              <button className="cancle-btn" onClick={handleClose}>
                Cancle
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MyPetCard;
