import {useState, useRef, useEffect} from 'react';
import './App.css'
import sound from './assets/audio.mp3'
import Tacos from './Tacos'
import Leaderboard from './Leaderboard'
import Tmi from "tmi.js";
import { AnimatePresence } from 'framer-motion';

function App() {
  // const [active, setActive] = useState(false);
  const [savedUsers, setSavedUsers] = useState([]);
  const channelRef = useRef();


  //Define min and max numbers
  const min = 1;
  const max = 50;
  let timer;

  const tmiClient = useRef(
    new Tmi.Client({
      identity: {
        username: 'jugarpaconvivir',
        password: 'oauth:68nqajwlygsiiut4x9ljn0tz1xgxu9'
      },
      channels: [ 'jugarpaconvivir' ]
    })
  );

  function handleRequest(username, id){
    console.log("saveRequest()")

    const number = Math.floor(Math.random() * (max - min) + min);
    // const id = lastId + 1;
    const exists = userExists(username);

    // if(exists){
    //   console.log("entrando a si existe")
    //   tmiClient.current.say(channelRef.current, `@${username}, Tu ya comiste tragon@`);
    // }else {
    //   console.log("entrando a no existe")
    //   setSavedUsers(users => [...users, {username, number}]);
    //   const tacosMsg = number === 1 ? '1 taquito :(' : `${number} tacos`;
    //   tmiClient.current.say(channelRef.current, `@${username}, Te comiste ${tacosMsg}`);
    // }

    //Only for test, for production use the code commented before
    // console.log("entrando a no existe")
    setSavedUsers(users => [...users, {id, username, number}]);
    const tacosMsg = number === 1 ? '1 taquito :(' : `${number} tacos`;
    tmiClient.current.say(channelRef.current, `@${username}, Te comiste ${tacosMsg}`);
  }

  const userExists = (username) =>{
    let exists = savedUsers.some(user => user.username === username);
    return exists;
  }

  //Listen Chat
  useEffect(() => {
    tmiClient.current.connect();

    tmiClient.current.on("message", (channel, tags, message, self) => {
      if (self) return;
      channelRef.current = channel;

      if(message.toLowerCase() === '!quierotacos') {
        // console.log(tags);
        handleRequest(tags.username,tags.id);
      }
    });
    return () => {
      tmiClient.current.disconnect();
    };
  }, []);
  
  
  return (
    <AnimatePresence>
      <Leaderboard users={{savedUsers}} />
    </AnimatePresence>
  )
};
export default App