import React, { useState } from "react";
import "./App.css";
import ReactDOM from "react-dom";
import favicon from "./components/icons/icon.png";

import Button from "./components/Button/Button";
import Breadcrumb from "./components/Breadcrumb/Breadcrumb";

function App({ classes }) {
  const [crumbs, setCrumbs] = useState([
    "Home",
    "Pictures",
    "Summer 15",
    "Italy",
  ]);

  // const selected = (crumb) => {
  //   console.log(">>>>", crumb);
  // };

  return (
    <div className="App">
      {/* <Button variant="primary">
        <img src={favicon} style={{ marginRight: "0.5rem" }} />
        Primary
      </Button> */}
      {/* <Breadcrumb crumbs={crumbs} selected={selected} /> */}
      <h1>hi</h1>
    </div>
  );
}

export default App;
