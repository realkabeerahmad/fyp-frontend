import React from "react";
import Details from "../../../components/Details/Details";
import Gallery from "../../../components/Gallery/Gallery";

const DetailsandGallery = ({ Pet, setPet }) => {
  return (
    <>
      <Details Pet={Pet} />
      <Gallery Pet={Pet} setPet={setPet} />
    </>
  );
};

export default DetailsandGallery;
