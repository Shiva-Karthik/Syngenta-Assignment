import { useState, useEffect, useRef } from "react";
import "./App.css";
import { nanoid } from "nanoid";

function App() {
  const [emptyDivCircle, setEmptyDivCircle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  let obj = {};
  const colours = useRef([]);
  const generateColor = () =>
    "#" + Math.floor(Math.random() * 16777215).toString(16);

  useEffect(() => {
    for (let i = 0; i < 5; i++) {
      let currentColor = generateColor();
      if (obj[currentColor]) {
        i--;
        continue;
      } else {
        obj[currentColor] = true;
        colours.current.push({
          className: "circle",
          id: i + 1,
          key: nanoid(),
          style: { backgroundColor: currentColor },
        });
      }
    }
    setLoading(false);
  }, []);
  if (loading) {
    return <div>Loading....</div>;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    let shooted_div = colours.current[text - 1];
    let filter_div = colours.current.filter((el, i) => text - 1 != i);
    colours.current = filter_div;
    setEmptyDivCircle([...emptyDivCircle, shooted_div]);
  };
  const handleReverse = (index) => {
    let shooted_div = emptyDivCircle[index];
    let filter_div = emptyDivCircle.filter((el, i) => index != i);
    colours.current.push(shooted_div);
    colours.current = colours.current.sort((a, b) => a.id - b.id);
    setEmptyDivCircle(filter_div);
  };
  return (
    <div className="App">
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
          {emptyDivCircle.map((el, i) => (
            <div {...el} onClick={() => handleReverse(i)}></div>
          ))}
        </div>
      </div>
      <div className="randomCircle">
        {colours.current.map((el) => (
          <div {...el}></div>
        ))}
      </div>
    </div>
  );
}

export default App;
