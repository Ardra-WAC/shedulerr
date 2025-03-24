import React from "react";
import Header from "./Header";
import CalendarComponent from "./CalendarComponent";
import { useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  const { user } = location.state || {};
  return (
    <div>
      <Header user={user} />
      <br />
      <br /> <br />
      <br /> <br />
      <br />
      <div className="main-content">
        <CalendarComponent />
      </div>
    </div>
  );
}

export default Home;
