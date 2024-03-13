import './App.css';
import {useState, useEffect} from "react"

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch("http://mybackend:5000")
      .then(response => response.json())
      .then(data => setData("Connected"))
      .catch(data => setData("Sth went wrong"));
  }, []);

  return (
    <div>
      {data}
    </div>
  );
}

export default App;
