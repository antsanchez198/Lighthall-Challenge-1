import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react'

function App() {

  var [data, setData] = useState(JSON.parse(window.localStorage.getItem('dataKey')));
  
  const [locations, setLocations] = useState([])
  const [county, setCounty] = useState([])
  const [state, setState] = useState([])

  const increment = () => {
    setData(data + 1);
  }

  const fetchLocation = async () => {
    const success = async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
      const jsonData = await response.json();

      let currentState = jsonData.principalSubdivision;
      let currentCounty = jsonData.locality;

      if (!state.includes(currentState) || !county.includes(currentCounty)) {
        let str = currentCounty + ', ' + currentState;
        
        locations.push(str);
        state.push(currentState);
        county.push(currentCounty);
      }
    }

    const error = () => {
      console.log("Mission Failed")
    };

    navigator.geolocation.getCurrentPosition(success, error);
  }


  useEffect(() => {
    localStorage.setItem('dataKey', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    setData(JSON.parse(window.localStorage.getItem('dataKey')))
  })

  return (
    <div className="App">
      <h1>Press below to increment</h1>
      <h3>Count: {data}</h3>
      <button 
        onClick={() => { increment(); fetchLocation();}}
        style={{width: "10rem", height: "2rem", backgroundColor: "#025669", color: "white"}}
      >Increment</button>

      <table>
        <tr>
          <th>Locations clicked</th>
        </tr>
        <tr>
          {locations && locations.map((index) => (<div>{index}</div>))}
        </tr>
      </table>
    </div>
  );
}

export default App;