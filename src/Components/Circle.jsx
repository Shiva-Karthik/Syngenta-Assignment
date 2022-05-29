import React from "react";
import { nanoid } from "nanoid";
import { useRef } from "react";

const Circle = () => {
  let obj = {};
  const colours = useRef([]);
  
  const generateColor = () =>
  "#" + Math.floor(Math.random() * 16777215).toString(16);

  for (let i = 0; i < 5; i++) {
    let currentColor = generateColor();
    if (obj[currentColor] !== undefined) {
      i--;
      continue;
    } else {
      obj[currentColor] = true;
      colours.current.push(generateColor());
    }
  }
  
  return (
    <>
      {colours.current.map((e, i) => (
        <div
          key={nanoid()}
          style={{ backgroundColor: e }}
          className="circle"
          id={i}
        ></div>
      ))}
    </>
  );
};

export default Circle;
