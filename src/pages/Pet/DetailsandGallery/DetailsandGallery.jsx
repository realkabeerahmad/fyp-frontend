import React from "react";
import Details from "../../../components/Details/Details";
import Gallery from "../../../components/Gallery/Gallery";

const DetailsandGallery = ({ user, Pet, setPet }) => {
  return (
    <>
      <Details Pet={Pet} user={user} setPet={setPet} />
      <Gallery Pet={Pet} setPet={setPet} />
    </>
  );
};

export default DetailsandGallery;
