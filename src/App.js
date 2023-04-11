import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react'

function App() {

  var [data, setData] = useState(JSON.parse(window.localStorage.getItem('dataKey')));

  useEffect(() => {
    localStorage.setItem('dataKey', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    setData(JSON.parse(window.localStorage.getItem('dataKey')))
  })

  return (
    <div className="App">
      <h1>Hi baby :* The number below is how much you love me</h1>
      <h3>Count: {data}</h3>
      <button onClick={() => {setData(data + 1);}}>Increment</button>
    </div>
  );
}

export default App;