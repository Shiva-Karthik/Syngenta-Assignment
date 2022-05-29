import { useState, useEffect, useRef } from "react";
import "./App.css";
import { nanoid } from "nanoid";

function App() {
  const [emptyDivCircle, setEmptyDivCircle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  let obj = {};
  const colours = useRef([]);

  {/* Generating random colours */}
  const generateColor = () => Math.floor(Math.random() * 16777215).toString(16);
  
  {/* Mounting unique colour circles */}
  useEffect(() => {
    for (let i = 0; i < 5; i++) {
      let currentColor = "#" + generateColor();
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

  {/* Moving circles into empty div */}
  const handleSubmit = (e) => {
    if(text>5||text<1){
      return;
    }
    e.preventDefault();
    let shooted_div = colours.current[text - 1];
    let filter_div = colours.current.filter((el, i) => text - 1 != i);
    colours.current = filter_div;
    setEmptyDivCircle([...emptyDivCircle, shooted_div]);
  };

  {/* Moving circles back to original position*/}
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
        {/* Showing number of shooted circles*/}
        <div><h1>Shooted circles {emptyDivCircle.length}</h1></div>
        {
         text>5||text<1 ? "Shoot the circle from 1 to 5" : "" 
        }

        {/* Input form */}
        <div className="form" style={{padding:"20px"}}>
          <form action="" onSubmit={handleSubmit} >
            <input
            style={{padding:"10px"}}
              type="number"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
            <button style={{padding:"10px"}} type="submit">Shoot</button>
          </form>
        </div>

        {/* empty div */}
        <div className="empty_div">
          {emptyDivCircle.map((el, i) => (
            <div {...el} onClick={() => handleReverse(i)}></div>
          ))}
        </div>
      </div>

      {/* Random unique colour circles div */}
      <div className="randomCircle">
        {colours.current.map((el) => (
          <div {...el}></div>
        ))}
      </div>
    </div>
  );
}

export default App;
