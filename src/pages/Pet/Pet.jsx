import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import Modal from "@mui/material/Modal";
import "./Pet.css";
import { Box } from "@mui/material";
const Pet = ({ Pet }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const activeClassName = "is-active";

  return (
    <>
      <div className="pet">
        <Link to="/my_pets">
          <i className="fa fa-arrow-left"></i>
        </Link>
        <div className="hidden"></div>
        <div className="pet-info">
          <div className="pet-profile-image" onClick={handleOpen}>
            <img src={Pet.image} alt="" />
          </div>
          <Modal open={open} onClose={handleClose}>
            <Box sx={{}}>
              <div className="pet-img-pop">
                <div className="pet-img-pop-header">
                  <div className="pet-img-pop-close" onClick={handleClose}>
                    <i className="fa fa-times"></i>
                  </div>
                </div>
                <div className="pet-img-pop-img">
                  <img src={Pet.image} alt="" />
                </div>
              </div>
            </Box>
          </Modal>
          <div className="pet-info-div">
            <div>
              <p className="pet-profile-name">{Pet.name}</p>
              <p className="pet-bio">{Pet.bio}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="more-about-pet">
        <div className="more-about-pet-links">
          <NavLink
            to="details_and_gallery"
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
          >
            <div>Details & Gallery</div>
          </NavLink>
          <NavLink
            to="vaccination_and_medical_details"
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
          >
            <div>Vaccination & Medical Details</div>
          </NavLink>
          <NavLink
            to="meal_timings"
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
          >
            <div>Meal Timings</div>
          </NavLink>

          {Pet.type === "Dog" ? (
            <NavLink
              to="walk_timings"
              className={({ isActive }) =>
                isActive ? activeClassName : undefined
              }
            >
              <div>Walk Timings</div>
            </NavLink>
          ) : (
            <></>
          )}
          <NavLink
            to="vaccination_history"
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
          >
            <div>Vaccination History</div>
          </NavLink>
          <NavLink
            to="vet_history"
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
          >
            <div>Vet History</div>
          </NavLink>
        </div>
        <div className="pet-links-outlet">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Pet;
