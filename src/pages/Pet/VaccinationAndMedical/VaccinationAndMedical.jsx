import React from "react";
import Medical from "../../../components/Medical/Medical";
import Vaccination from "../../../components/Vaccination/Vaccination";

const VaccinationAndMedical = ({ Pet, setPet }) => {
  return (
    <div>
      <Vaccination Pet={Pet} setPet={setPet} />
      <Medical Pet={Pet} setPet={setPet} />
    </div>
  );
};

export default VaccinationAndMedical;
