import React from "react";
import "./Home.css";
import Team from "../../assets/Team.png";
import { Box } from "@mui/material";
const Home = () => {
  return (
    <div className="home">
      <header className="home-header">
        <h1>Providing Pet Needs</h1>
        <h3>All at one place</h3>
      </header>
      <Box
        sx={{
          py: 5,
          px: 3,
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          flexDirection: "column",
        }}>
        <h1>Introduction</h1>
        <Box
          sx={{
            py: 3,
            px: 0,
            width: "80%",
            my: 3,
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            // flexDirection: "column",
          }}>
          <Box sx={{ my: 1, width: 300 }}>
            • It's hard for pet owners to keep track of everything regarding
            their pet's life in today's fast-paced world.
          </Box>
          <Box sx={{ my: 1, width: 300 }}>
            • PetHub helps pet owners easily track their pet's activities and
            schedule appointments, vaccinations, walks, and meal times.
          </Box>
          <Box sx={{ my: 1, width: 300 }}>
            • PetHub also lets owners buy pet goods at great prices and connect
            with a community to share stories, questions and experiences about
            their pets.
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          py: 5,
          px: 3,
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          flexDirection: "column",
        }}>
        <h1>OUR SERVICES</h1>
        <Box
          sx={{
            py: 3,
            px: 0,
            width: "80%",
            my: 3,
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}>
          <Box
            sx={{
              width: 200,
              height: 80,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}>
            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: 20,
                backgroundImage: "linear-gradient(red, #e92e4a)",
              }}>
              1
            </Box>
            <Box sx={{ fontSize: 25, color: "#2f2f2f" }}>Pet Manager</Box>
          </Box>
          <Box
            sx={{
              width: 250,
              height: 80,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}>
            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: 20,
                backgroundImage: "linear-gradient(red, #e92e4a)",
              }}>
              2
            </Box>
            <Box sx={{ fontSize: 25, color: "#2f2f2f" }}>Adoption Portal</Box>
          </Box>
          <Box
            sx={{
              width: 200,
              height: 80,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}>
            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: 20,
                backgroundImage: "linear-gradient(red, #e92e4a)",
              }}>
              3
            </Box>
            <Box sx={{ fontSize: 25, color: "#2f2f2f" }}>Community</Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ contain: "content" }}>
        <img src={Team} alt="team" width={"100%"} />
      </Box>
      {/* <section className="home-more-about">More About Us Section</section> */}
    </div>
  );
};

export default Home;
