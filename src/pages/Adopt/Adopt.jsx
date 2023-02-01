import React, { useEffect, useState } from "react";
import axios from "axios";
import AdoptCard from "../../components/AdoptCard/AdoptCard";
import "./Adopt.css";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SwipeableDrawer,
  TextField,
} from "@mui/material";
import { FilterList, Search } from "@mui/icons-material";
import url from "../../apiCalls/api";

// --------------------------------------------------------------

const Adopt = ({ setPet }) => {
  const [values, setValues] = useState({
    text: "",
    category: "",
  });
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const [Pets, setPets] = useState([]);
  useEffect(() => {
    fetchItem();
  }, []);
  const fetchItem = () => {
    axios
      .get(url + "/adoption/adopt/show/all")
      .then((res) => {
        console.log(res.data.pets);
        setPets(res.data.pets);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const searchItem = () => {
    if (!values.text) {
      return false;
    } else {
      const data = { searched_text: values.text };
      axios
        .post(url + "/adoption/search", data)
        .then((res) => {
          console.log(res.data);
          setPets(res.data.products);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  // -------------------------------------
  const handleChange = (value) => (e) => {
    setValues({ ...values, [value]: e.target.value });
  };
  return (
    <>
      <Box
        sx={{
          width: "100%",
          p: 2,
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}>
        <Box
          sx={{
            width: "20%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            left: "30px",
          }}>
          <Button color="error" onClick={toggleDrawer("left", true)}>
            <FilterList />
            &nbsp; &nbsp;Filter
          </Button>
        </Box>
        <SwipeableDrawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
          onOpen={toggleDrawer("left", true)}>
          <Box
            sx={{
              width: "350px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              p: 2,
            }}>
            <h1 style={{ color: "#e92e4a" }}>Filters</h1>
            <FormControl sx={{ width: "80%", m: 2 }} color="success">
              <InputLabel id="type" color="success">
                Category
              </InputLabel>
              <Select label="Category">
                <MenuItem>Dog</MenuItem>
                <MenuItem>Cat</MenuItem>
                <MenuItem>Parrot</MenuItem>
                <MenuItem>Rabbit</MenuItem>
                <MenuItem>Others</MenuItem>
              </Select>
            </FormControl>
            <Button
              sx={{ width: "80%", m: 1 }}
              color="success"
              variant="contained">
              Filter
            </Button>
          </Box>
        </SwipeableDrawer>
        <Box sx={{ width: "80%", display: "flex", justifyContent: "center" }}>
          <TextField
            variant="outlined"
            color="error"
            sx={{
              width: "60%",
            }}
            type="text"
            placeholder="Search"
            onChange={handleChange("text")}
            value={values.text}
          />
          <Button
            color="error"
            variant="contained"
            sx={{ width: 50, ml: "-65px", boxShadow: "none" }}
            onClick={searchItem}>
            <Search />
          </Button>
          {/* </form> */}
        </Box>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridAutoColumns: "max-content",
          gridTemplateColumns: "repeat(5, 1fr)",
          gridGap: "25px",
          gridAutoRows: "minmax(100px, auto)",
          gridAutoFlow: "dense",
          width: "100%",
          p: 2,
        }}>
        {Pets ? (
          Pets.map((Pet) => {
            return <AdoptCard Pet={Pet} setPet={setPet} />;
          })
        ) : (
          <Box>No Pets Available For Adoption</Box>
        )}
      </Box>
    </>
  );
};

export default Adopt;
