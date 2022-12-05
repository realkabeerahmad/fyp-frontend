import axios from "axios";
const updatePet = ({ setPets, user }) => {
  const data = { userId: user._id };
  axios
    .post("http://localhost:8000/pet/showAllPets/", data)
    .then((res) => {
      setPets(res.data.pets);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default updatePet;
