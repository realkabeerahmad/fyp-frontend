import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Shop.css";
import ShopCard from "../../components/ShopCard/ShopCard";
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
import { CompareArrowsOutlined, FilterList, Search } from "@mui/icons-material";
import url from "../../apiCalls/api";

// ----------------------------------------------------------

const Shop = ({ setProduct, products }) => {
  const [values, setValues] = useState({
    text: "",
    category: "",
    min: 0,
    max: 10000,
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
  const [Products, setProducts] = useState(products);
  useEffect(() => {
    fetchItem();
  }, []);
  // ----------------------------------------
  const fetchItem = () => {
    axios
      .get(url + "/shop/show/all")
      .then((res) => {
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
        .post(url + "/shop/search", data)
        .then((res) => {
          setProducts(res.data.products);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const filter = () => {
    if (!values.category && !values.min && !values.max) {
      return false;
    } else {
      const data = {
        category: values.category,
        from: values.min,
        to: values.max,
      };
      axios
        .post(url + "/shop/filter", data)
        .then((res) => {
          setProducts(res.data.products);
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
          position: "relative",
        }}>
        <Box
          sx={{
            width: "20%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            left: 30,
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
              <Select
                label="Category"
                value={values.category}
                onChange={handleChange("category")}>
                <MenuItem value="Food">Food</MenuItem>
                <MenuItem value="Accessory">Accessory</MenuItem>
                <MenuItem value="Toys">Toys</MenuItem>
                <MenuItem value="Clothes">Clothes</MenuItem>
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
              color="success">
              <TextField
                label="Price From"
                sx={{ width: "33%", m: 2 }}
                color="success"
                value={values.min}
                onChange={handleChange("min")}></TextField>
              <CompareArrowsOutlined />
              <TextField
                label="Price To"
                sx={{ width: "33%", m: 2 }}
                color="success"
                value={values.max}
                onChange={handleChange("max")}></TextField>
            </Box>
            <Button
              sx={{ width: "80%", m: 1 }}
              color="success"
              variant="contained"
              onClick={filter}>
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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          p: 2,
        }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}>
          {Products.length > 0 ? (
            <Box
              sx={{
                display: "grid",
                gridAutoColumns: "max-content",
                gridTemplateColumns: "repeat(5, 1fr)",
                gridGap: "25px",
                gridAutoRows: "minmax(100px, auto)",
                gridAutoFlow: "dense",
              }}>
              {Products.map((Product) => {
                return (
                  <ShopCard
                    key={Product._id}
                    Product={Product}
                    setProduct={setProduct}></ShopCard>
                );
              })}
            </Box>
          ) : (
            <Box>No Product Found</Box>
          )}
          {/* <LoadingButton loading>Loading</LoadingButton> */}
        </Box>
      </Box>
    </>
  );
};

export default Shop;
