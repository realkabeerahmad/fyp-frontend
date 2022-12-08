import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Shop.css";
import ShopCard from "../../components/ShopCard/ShopCard";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SwipeableDrawer,
  TextField,
} from "@mui/material";
import {
  CompareArrows,
  CompareArrowsOutlined,
  FilterList,
  Search,
} from "@mui/icons-material";

// ----------------------------------------------------------

const Shop = ({ setProduct }) => {
  const [values, setValues] = useState({
    text: "",
  });
  // ----------------------------------
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  // ------------------------------------
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
  // -------------------------------------
  const [Products, setProducts] = useState([]);
  useEffect(() => {
    fetchItem();
  }, []);
  // ----------------------------------------
  const fetchItem = () => {
    axios
      .get("http://localhost:8000/shop/showAllProducts")
      .then((res) => {
        console.log(res.data.products);
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // ------------------------------------
  const searchItem = () => {
    if (!values.text) {
      return false;
    } else {
      const data = { searched_text: values.text };
      axios
        .post("http://localhost:8000/shop/search", data)
        .then((res) => {
          console.log(res.data.products);
          setProducts(res.data.products);
          // setValues({ text: "" });
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
  // -------------------------------------
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
        }}
      >
        <Box
          sx={{
            width: "20%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button color="error" onClick={toggleDrawer("left", true)}>
            <FilterList />
            &nbsp; &nbsp;Filter
          </Button>
        </Box>
        <SwipeableDrawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
          onOpen={toggleDrawer("left", true)}
        >
          <Box
            sx={{
              width: "350px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              p: 2,
            }}
          >
            <h1 style={{ color: "#e92e4a" }}>Filters</h1>
            <FormControl sx={{ width: "80%", m: 2 }} color="success">
              <InputLabel id="type" color="success">
                Category
              </InputLabel>
              <Select label="Category">
                <MenuItem>Food</MenuItem>
                <MenuItem>Accessory</MenuItem>
                <MenuItem>Toys</MenuItem>
                <MenuItem>Cloths</MenuItem>
                <MenuItem>Cloths</MenuItem>
              </Select>
            </FormControl>
            <Box
              sx={{
                width: "100%",
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              color="success"
            >
              <TextField
                label="Price From"
                sx={{ width: "33%", m: 2 }}
                color="success"
              ></TextField>
              <CompareArrowsOutlined />
              <TextField
                label="Price To"
                sx={{ width: "33%", m: 2 }}
                color="success"
              ></TextField>
            </Box>
            <Button
              sx={{ width: "80%", m: 1 }}
              color="success"
              variant="contained"
            >
              Filter
            </Button>
          </Box>
        </SwipeableDrawer>
        <Box sx={{ width: "80%", display: "flex" }}>
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
            sx={{ width: 50, ml: "-65px" }}
            onClick={searchItem}
          >
            <Search />
          </Button>
          {/* </form> */}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          p: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {Products.length > 0 ? (
              Products.map((Product) => {
                return (
                  <ShopCard
                    Product={Product}
                    setProduct={setProduct}
                  ></ShopCard>
                );
              })
            ) : (
              <>No Product Found</>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Shop;
