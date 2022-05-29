import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import React from "react";
import ReactDOM from "react-dom/client";

const EmptyDiv = () => {
  const [text, setText] = useState("");
  var [circle, setCircle] = useState([]);
  const handleOriginalPos = (id) => {
    let o = document.getElementsByClassName("circle");
    id = id.split("_")[0];
    o[id].style.display = "block";
    let filete_rever_props = circle.filter((el) => el.id != id + "_");
    // console.log(circle,id);
    setCircle(filete_rever_props);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let o = document.getElementsByClassName("circle");
    console.log('o:', o)
    if (circle.find((el) => el.id == o[text - 1].id + "_")) {
      return alert("It alread added");
    }
    // console.log("o:", o);
    let current_div = {
      key: nanoid(),
      className: "div-circle",
      id: o[text - 1].id + "_",
      style: {
        backgroundColor: o[text - 1].style.backgroundColor,
      },
    };

    setCircle([...circle, current_div]);
    o[text - 1].style.display = "none";
  };

  return (
    <div>
      <div>
        <form action="" onSubmit={handleSubmit}>
          <input
            type="number"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <button type="submit">Shoot</button>
        </form>
      </div>
      <div className="empty_div">
        {circle.map((el) => (
          <div
            onClick={() => {
              handleOriginalPos(el.id);
            }}
            {...el}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default EmptyDiv;
