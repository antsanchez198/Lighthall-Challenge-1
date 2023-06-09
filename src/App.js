import './App.css';
import { useEffect, useState } from 'react'
import { db } from './firebase';
import { getDocs, collection, addDoc, updateDoc, doc, setDoc } from "firebase/firestore";

function App() {

  const [clickAmount, setClickAmount] = useState(0);
  const [dbData, setdbData] = useState([])
  const [currentUserLocation, setCurrentUserLocation] = useState("")

  const clicksCollection = collection(db, "click-amount");

  const getClickAmount = async () => {
    let sum = 0;
    try {
      const data = await getDocs(clicksCollection);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        ...sum += doc.data().Clicks,
      }))
      setdbData(filteredData);
      setClickAmount(sum);
    } catch (error) {
      console.log(error)
    }

  }

  const newLocationClick = async (userCity) => {
    try {
      await setDoc(doc(db, "click-amount", userCity), {
        Clicks: 1,
        City: userCity
      });
    } catch (error) {
      console.log(error)
    }
  }

  const updateClickCount = async (id, updateCount) => {
    const locationClicked = doc(db, "click-amount", id);
    await updateDoc(locationClicked, { Clicks: updateCount })
  }

  const incrementClicks = async () => {
    const success = async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
      const jsonData = await response.json();

      let currentUserCity = jsonData.principalSubdivision
      setCurrentUserLocation(jsonData.locality + ", " + jsonData.principalSubdivision)

      if (dbData.filter(e => e.City === currentUserCity).length == 0) {
        newLocationClick(currentUserCity)
      }
      else {
        let cityFound = dbData.filter(e => e.City === currentUserCity)
        let cityClicks = cityFound.at(0).Clicks + 1 //increment country
        updateClickCount(currentUserCity, cityClicks)
      }
    }

    const error = () => {
      console.log("Mission Failed")
    };

    navigator.geolocation.getCurrentPosition(success, error);
  }

  useEffect(() => {
    getClickAmount();
  }, [])

  useEffect(() => {
  }, [dbData, clickAmount, currentUserLocation]);

  return (
    <div className="App">
      <h1>Total Clicks: {clickAmount} <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-mouse" width="24" height="24" viewBox="0 0 24 24" stroke-width="3" stroke="#75E6DA" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <rect x="6" y="3" width="12" height="18" rx="4" />
        <line x1="12" y1="7" x2="12" y2="11" />
      </svg></h1>
      <button onClick={() => { incrementClicks(); getClickAmount(); }}>Click Me
      </button>

      <div className='spacing flex'>
        <h1>Current Location:</h1>
        <h2>{currentUserLocation}</h2>
      </div>

      <div className='spacing'>
        <h1>Clicks Around the World
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-map-pin" style={{ marginLeft: "5px" }} width="24" height="24" viewBox="0 0 24 24" stroke-width="3" stroke="#75E6DA" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="12" cy="11" r="3" />
            <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
          </svg>
        </h1>
        <div class="tbl-content">
          <table cellpadding="0" cellspacing="0" border="0">
            <thead>
              <tr>
                <th>City</th>
                <th>Clicks</th>
              </tr>
            </thead>
            <tbody>
              {dbData && dbData.map((item) => {
                return (
                  <tr>
                    <td>{item.City}</td>
                    <td>{item.Clicks}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;