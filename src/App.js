import React from "react";
import "./App.css";
import ReactDOM from "react-dom";
import favicon from "./components/icons/icon.png";

import Button from "./components/Button/Button";

const onClickEvent = () => {
  alert("Primary Button clicked");
};
function App({ classes }) {
  return (
    <div className="App">
      <Button onClick={onClickEvent} variant="primary">
        <img src={favicon} style={{ marginRight: "0.5rem" }} />
        Primary
      </Button>
    </div>
  );
}

export default App;
