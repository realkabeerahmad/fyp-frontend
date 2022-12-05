import React from "react";
import "./Home.css";
import Comsats from "../../assets/CUI.jpg";
const Home = () => {
  return (
    <div className="home">
      <header className="home-header">
        <h1>Providing Pet Needs</h1>
        <h3>All at one place</h3>
      </header>
      <section className="home-about">
        <h1>CS04-PETHUB</h1>
        <h3>FINAL YEAR PROJECT</h3>
        <div className="home-about-wrapper">
          <div className="home-about-left">
            <h4>Project Supervisor</h4>
            <table>
              <tbody>
                <tr>
                  <td>Amaid Zia</td>
                  <td>Lecturer, CUI, Lahore</td>
                </tr>
              </tbody>
            </table>
            <br />
            <h4>Group Members</h4>
            <table>
              <tbody>
                <tr>
                  <td>Kabeer Ahmad</td>
                  <td>SP19-BCS-113</td>
                </tr>
                <tr>
                  <td>Muhammad Umar</td>
                  <td>FA18-BCS-181</td>
                </tr>
                <tr>
                  <td>Rimshah Qudoss</td>
                  <td>SP19-BCS-109</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="home-about-right">
            <img src={Comsats} alt="" />
          </div>
        </div>
      </section>
      <section className="home-more-about">More About Us Section</section>
    </div>
  );
};

export default Home;
