import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react'
import { db } from './firebase';
import { getDocs, collection, addDoc, updateDoc, doc, setDoc} from "firebase/firestore";

function App() {

  const [clickAmount, setClickAmount] = useState([]);
  const [allClicks, setAllClicks] = useState([])

  const clicksCollection = collection(db, "click-amount");
  let amount = 0;

  useEffect(() => {
    const getClickAmount = async () => {
    
      try {
        const data = await getDocs(clicksCollection);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        setAllClicks(filteredData)
        console.log(allClicks)
      } catch (error) {
        console.log(error)
      }

    }

    const setLocationClick = async () => {
      try {
        await setDoc(doc(db, "click-amount", "jersey"), {
          name: "Los Angeles",
          state: "CA",
          country: "USA"
        });

        // await addDoc(clicksCollection, {
        //   Country: "Mexico",
        //   Clicks: 6,
        //   id: "Testing"
        // });
      } catch (error) {
        console.log(error)
      }
    }

    const updateClickCount = async (id) => {
      const locationClicked = doc(db, "click-amount", id);
      await updateDoc( locationClicked, {Clicks: 7})
    }

    setLocationClick();
    getClickAmount();
    updateClickCount();
  }, [])


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
        // style={{width: "10rem", height: "2rem", backgroundColor: "#025669", color: "white"}}
      >Increment</button>

      <table>
        <tr>
          <th>Locations clicked</th>
        </tr>
        <tr>
          {locations && locations.map((index) => (<div>{index}</div>))}
        </tr>
      </table>

      <table>
        <thead>
          <tr>
            <th>City</th>
            <th>Country</th>
            <th>Clicks</th>
          </tr>
        </thead>
      </table>
    </div>
  );
}

export default App;