import {useState} from 'react';
import './App.css'
import Tacos from './Tacos'

function App() {
  // const [count, setCount] = useState(0)
  const [active, setActive] = useState(false);
  
  return (
    <>
      <Tacos username="Lechuga"/>
    </>
  )
};
export default App