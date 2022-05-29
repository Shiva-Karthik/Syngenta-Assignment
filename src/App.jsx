import { useState, useEffect } from "react";
import "./App.css";
import React from "react";
import Circle from "./Components/Circle";
import EmptyDiv from "./Components/EmptyDiv";

function App() {
  return (
    <div className="App">
      <EmptyDiv />
      <div>
        <Circle />
      </div>
    </div>
  );
}

export default App;
