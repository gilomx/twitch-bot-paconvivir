import {useState} from 'react';
import './App.css'
import Tacos from './Tacos'

function App() {
  // const [count, setCount] = useState(0)
  const [active, setActive] = useState(true);

  // const randomNumber = Math.floor(Math.random() * (max - min) + min);
  
  return (
    <>
      <Tacos username="Hacker Rojo" number={5} active={true}/>
    </>
  )
};
export default App