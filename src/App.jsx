import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Community from "./pages/Community/Community";
import Home from "./pages/Home/Home";
import MyPets from "./pages/MyPets/MyPets";
import Shop from "./pages/Shop/Shop";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import AddPet from "./pages/AddPet/AddPet";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Pet from "./pages/Pet/Pet";
import DetailsandGallery from "./pages/Pet/DetailsandGallery/DetailsandGallery";
import ForgetPass from "./pages/ForgetPass/ForgetPass";
import VaccinationAndMedical from "./pages/Pet/VaccinationAndMedical/VaccinationAndMedical";
import { Alert, Collapse, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import Otp from "./pages/Otp/Otp";
import MealTime from "./pages/Pet/MealTime/MealTime";
import WalkTime from "./pages/Pet/WalkTime/WalkTime";
import Adopt from "./pages/Adopt/Adopt";
import ShopDetails from "./pages/Shop/ShopDetails/ShopDetails";
import AdoptDetails from "./pages/Adopt/AdoptDetails/AdoptDetails";
import AdoptApplication from "./pages/Adopt/AdoptApplication/AdoptApplication";
import User from "./pages/User/User";
import Cart from "./pages/Cart/Cart";
import CheckOut from "./pages/CheckOut/CheckOut";
import MyOrder from "./pages/MyOrder/MyOrder";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import History from "./components/Vaccination/History";
import Application from "./pages/Application/Application";
import WishList from "./pages/WishList/WishList";
import axios from "axios";
import url from "./apiCalls/api";
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------

function App() {
  // ----------------------------------------------------------------
  const [alert, setAlert] = useState("true");
  const [severity, setSeverity] = useState("success");
  const [openAlert, setOpenAlert] = useState(false);
  // ----------------------------------------------------------------
  // ----------------------------------------------------------------
  // ----------------------------------------------------------------
  const [Product, setProduct] = useState({});
  const [Products, setProducts] = useState([]);
  // ----------------------------------------------------------------
  const [pet, setPet] = useState({});
  // const [Pets, setPets] = useState({});
  // ----------------------------------------------------------------
  const [login, setLogin] = useState(false);
  // ----------------------------------------------------------------
  const [user, setUser] = useState({});
  // ----------------------------------------------------------------
  const [userDetails, setUserDetails] = useState({});
  // ----------------------------------------------------------------
  const [cart, setCart] = useState({});
  // ----------------------------------------------------------------
  if (openAlert === true) {
    setTimeout(() => {
      setOpenAlert(false);
    }, 5000);
  }
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
  const LoginComponent = (
    <Login
      setAlert={setAlert}
      setOpenAlert={setOpenAlert}
      setSeverity={setSeverity}
      setLogin={setLogin}
      setUser={setUser}
      user={user}
      setCart={setCart}
      setUserDetails={setUserDetails}
    />
  );
  // ---------------------------------------------------------
  // ---------------------------------------------------------
  // ---------------------------------------------------------
  // ---------------------------------------------------------
  const stripePromise = loadStripe(
    "pk_test_51M7jqtILXO2OeSWiTvBQrAP6ZAZjVZ7X7DBEIYe73yvn1l7FjCL446745e2uDvuWOxVLFnmVZKEGmVg53SGEUuKx00LnkAidtZ"
  );
  return (
    <Elements stripe={stripePromise}>
      <>
        <BrowserRouter>
          {/* Navigation Bar */}
          {/* ----------------------------------------- */}
          {/* ----------------------------------------- */}
          {/* ----------------------------------------- */}
          {/* ----------------------------------------- */}
          <Navigation
            login={login}
            setLogin={setLogin}
            user={user}
            setUser={setUser}
            setAlert={setAlert}
            setOpenAlert={setOpenAlert}
            setSeverity={setSeverity}
            cart={cart}
            setCart={setCart}
          />
          {/* <LinearProgress color="success" /> */}
          {/* Alert Area */}
          {/* ----------------------------------------- */}
          {/* ----------------------------------------- */}
          {/* ----------------------------------------- */}
          {/* ----------------------------------------- */}
          <Collapse in={openAlert}>
            <Alert
              severity={severity}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpenAlert(false);
                  }}>
                  <i className="fa fa-times"></i>
                </IconButton>
              }
              sx={{ mb: 2 }}>
              {alert}
            </Alert>
          </Collapse>
          {/* App Structure */}
          {/* ----------------------------------------- */}
          {/* ----------------------------------------- */}
          {/* ----------------------------------------- */}
          {/* ----------------------------------------- */}
          <div className="App">
            <Routes>
              {/* Home */}
              {/* ----------------------------------------- */}
              {/* ----------------------------------------- */}
              {/* ----------------------------------------- */}
              {/* ----------------------------------------- */}
              <Route exact path="/" element={<Home />}></Route>
              {/* User */}
              {/* ----------------------------------------- */}
              {/* ----------------------------------------- */}
              {/* ----------------------------------------- */}
              {/* ----------------------------------------- */}
              <Route
                path="/user"
                element={
                  login ? (
                    <User user={user} setUser={setUser} />
                  ) : (
                    <Login
                      setAlert={setAlert}
                      setOpenAlert={setOpenAlert}
                      setSeverity={setSeverity}
                      setLogin={setLogin}
                      setUser={setUser}
                      user={user}
                      setCart={setCart}
                      setUserDetails={setUserDetails}
                    />
                  )
                }></Route>
              <Route
                path="/user/orders"
                element={
                  login ? (
                    <MyOrder user={user} setUser={setUser} />
                  ) : (
                    <Login
                      setAlert={setAlert}
                      setOpenAlert={setOpenAlert}
                      setSeverity={setSeverity}
                      setLogin={setLogin}
                      setUser={setUser}
                      user={user}
                      setCart={setCart}
                      setUserDetails={setUserDetails}
                    />
                  )
                }></Route>
              <Route
                path="/user/wishlist"
                element={
                  login ? (
                    <WishList user={user} setUser={setUser} />
                  ) : (
                    <Login
                      setAlert={setAlert}
                      setOpenAlert={setOpenAlert}
                      setSeverity={setSeverity}
                      setLogin={setLogin}
                      setUser={setUser}
                      user={user}
                      setCart={setCart}
                      setUserDetails={setUserDetails}
                    />
                  )
                }></Route>
              {/* My Pets */}
              {/* ----------------------------------------- */}
              {/* ----------------------------------------- */}
              {/* ----------------------------------------- */}
              {/* ----------------------------------------- */}
              <Route
                path="/my_pets"
                element={
                  login ? (
                    <MyPets user={user} setPet={setPet} />
                  ) : (
                    <Login
                      setAlert={setAlert}
                      setOpenAlert={setOpenAlert}
                      setSeverity={setSeverity}
                      setLogin={setLogin}
                      setUser={setUser}
                      user={user}
                      setCart={setCart}
                      setUserDetails={setUserDetails}
                    />
                  )
                }></Route>
              {/* Add Pet Form */}
              <Route
                path="/my_pets/add_pet"
                element={
                  login ? (
                    <AddPet user={user} />
                  ) : (
                    <Login
                      setAlert={setAlert}
                      setOpenAlert={setOpenAlert}
                      setSeverity={setSeverity}
                      setLogin={setLogin}
                      setUser={setUser}
                      user={user}
                      setCart={setCart}
                      setUserDetails={setUserDetails}
                    />
                  )
                }
              />
              {/* Pet Screen */}
              <Route path={"/my_pets/" + pet._id} element={<Pet Pet={pet} />}>
                <Route
                  index
                  element={
                    <DetailsandGallery user={user} Pet={pet} setPet={setPet} />
                  }></Route>
                <Route
                  path="details_and_gallery"
                  element={
                    <DetailsandGallery Pet={pet} setPet={setPet} user={user} />
                  }></Route>
                <Route
                  path="vaccination_and_medical_details"
                  element={
                    <VaccinationAndMedical Pet={pet} setPet={setPet} />
                  }></Route>
                <Route
                  path="meal_timings"
                  element={<MealTime Pet={pet} setPet={setPet} />}></Route>
                <Route
                  path="walk_timings"
                  element={<WalkTime Pet={pet} setPet={setPet} />}></Route>
                <Route
                  path="vaccination_history"
                  element={
                    <History
                      history={pet.vaccination_history}
                      page={"vaccination"}
                    />
                  }></Route>
                <Route
                  path="vet_history"
                  element={
                    <History history={pet.vet_history} page={"vet"} />
                  }></Route>
              </Route>

              {/* Shop Routes */}
              {/* ----------------------------------------- */}
              {/* ----------------------------------------- */}
              {/* ----------------------------------------- */}
              {/* ----------------------------------------- */}
              <Route
                path="/shop"
                element={
                  <Shop setProduct={setProduct} products={Products} />
                }></Route>
              <Route
                path="/shop/cart"
                element={
                  login ? (
                    <Cart
                      cart={cart}
                      setCart={setCart}
                      setProduct={setProduct}
                    />
                  ) : (
                    <Login
                      setAlert={setAlert}
                      setOpenAlert={setOpenAlert}
                      setSeverity={setSeverity}
                      setLogin={setLogin}
                      setUser={setUser}
                      user={user}
                      setCart={setCart}
                      setUserDetails={setUserDetails}
                    />
                  )
                }></Route>

              <Route
                path="/shop/checkOut"
                element={
                  login && cart ? (
                    // <Elements stripe={stripePromise}>
                    <CheckOut
                      cart={cart}
                      setCart={setCart}
                      user={user}
                      setProduct={setProduct}
                    />
                  ) : (
                    // </Elements>
                    <Cart
                      cart={cart}
                      setCart={setCart}
                      setProduct={setProduct}
                    />
                  )
                }></Route>
              <Route
                path={`/product/${Product._id}`}
                element={
                  <ShopDetails
                    Product={Product}
                    cart={cart}
                    setCart={setCart}
                    user={user}
                    setUser={setUser}
                    login={login}
                  />
                }></Route>

              {/* Adopt */}
              {/* ----------------------------------------- */}
              {/* ----------------------------------------- */}
              {/* ----------------------------------------- */}
              {/* ----------------------------------------- */}
              <Route path="/adopt" element={<Adopt setPet={setPet} />}></Route>
              {user ? (
                user.isShelter ? (
                  <Route
                    path="/shelter/applications"
                    element={<Application user={user} />}></Route>
                ) : (
                  <></>
                )
              ) : (
                LoginComponent
              )}
              <Route
                path={"/adopt/" + pet._id}
                element={
                  <AdoptDetails
                    Pet={pet}
                    user={user}
                    setUser={setUser}
                    login={login}
                  />
                }></Route>
              {/* Auth */}
              {/* ----------------------------------------- */}
              {/* ----------------------------------------- */}
              {/* ----------------------------------------- */}
              {/* ----------------------------------------- */}
              <Route
                path={"/adopt/" + pet._id + "/application"}
                element={
                  login ? (
                    <AdoptApplication Pet={pet} user={user} setUser={setUser} />
                  ) : (
                    <Login
                      setAlert={setAlert}
                      setOpenAlert={setOpenAlert}
                      setSeverity={setSeverity}
                      setLogin={setLogin}
                      setUser={setUser}
                      user={user}
                      setCart={setCart}
                      setUserDetails={setUserDetails}
                    />
                  )
                }></Route>
              <Route
                path="/community"
                element={<Community user={user} />}></Route>
              <Route
                exact
                path="/login"
                element={
                  <Login
                    setAlert={setAlert}
                    setOpenAlert={setOpenAlert}
                    setSeverity={setSeverity}
                    setLogin={setLogin}
                    setUser={setUser}
                    user={user}
                    setCart={setCart}
                    setUserDetails={setUserDetails}
                  />
                }
              />
              <Route path="/forget_password" element={<ForgetPass />}></Route>
              <Route
                path="/verify_otp"
                element={
                  userDetails ? (
                    <Otp
                      userDetails={userDetails}
                      setAlert={setAlert}
                      setOpenAlert={setOpenAlert}
                      setSeverity={setSeverity}
                      setUserDetails={setUserDetails}
                    />
                  ) : (
                    <ErrorPage />
                  )
                }></Route>
              <Route
                path="/register"
                element={
                  <Register
                    setAlert={setAlert}
                    setOpenAlert={setOpenAlert}
                    setSeverity={setSeverity}
                    setUserDetails={setUserDetails}
                  />
                }></Route>
              <Route path="*" element={<ErrorPage />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </>
    </Elements>
  );
}

export default App;
