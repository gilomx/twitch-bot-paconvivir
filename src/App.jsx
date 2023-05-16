import {useState, useRef, useEffect} from 'react';
import './App.css'
import Leaderboard from './Leaderboard'
import Tmi from "tmi.js";
import { AnimatePresence } from 'framer-motion';

function App() {
  // const [active, setActive] = useState(false);
  const [lastUser, setLastUser] = useState({});
  const [savedUsers, setSavedUsers] = useState([]);
  const channelRef = useRef();

  //Define min and max numbers
  const min = 1;
  const max = 500;

  const tmiClient = useRef(
    new Tmi.Client({
      identity: {
        username: import.meta.env.VITE_TWITCH_USERNAME,
        password: import.meta.env.VITE_TWITCH_OAUTH
      },
      channels: [ import.meta.env.VITE_TWITCH_CHANNEL ]
    })
  );

  function handleRequest(){    
    if(!lastUser) return;

    const number = Math.floor(Math.random() * (max - min) + min);
    const username = lastUser.username;
    const times = getUserAttempts(username);
    console.log(times);
    const id = lastUser.id;
    const exists = userExists(username);
    // console.log('Vite Attempts: ',import.meta.env.VITE_ATTEMPTS)
    if(exists && times>=import.meta.env.VITE_ATTEMPTS){
      tmiClient.current.say(channelRef.current, `@${username}, Tu ya comiste tragon@`);
      return;
    }else if(exists && times<import.meta.env.VITE_ATTEMPTS){
      setSavedUsers((users) =>
        users.map((user) =>
          user.username === username ? { ...user, times: user.times + 1, number: number} : user
        )
      );

    }else {
      setSavedUsers(users => [...users, {id, username, number, times}]);
    }
      const tacosMsg = number === 1 ? '1 taquito :(' : `${number} tacos`;
      tmiClient.current.say(channelRef.current, `@${username}, Te comiste ${tacosMsg}`);
      setLastUser({});
  }

  const userExists = (username) =>{
    const exists = savedUsers.some(user => user.username === username);
    console.log(exists);
    return exists;
  }

  const getUserAttempts = (username) => {
    let userAttempts = 1;
    const user = savedUsers.find((user) => user.username === username);
    if(user){
      userAttempts = user.times;
    }
    return userAttempts;
  }

  //Listen Chat
  useEffect(() => {
    tmiClient.current.connect();

    tmiClient.current.on("message", (channel, tags, message, self) => {
      if (self) return;
      channelRef.current = channel;

      if(message.toLowerCase() === '!quierotacos') {
        // console.log(tags);
        setLastUser({
          username: tags.username,
          id: tags.id
        });
      }
    });
    return () => {
      tmiClient.current.disconnect();
    };
  }, []);
  
  useEffect(() => {
    if(!lastUser || Object.keys(lastUser).length === 0) return;
    handleRequest();
  }, [lastUser]);
  
  return (
    <AnimatePresence>
      <Leaderboard users={{savedUsers}} />
    </AnimatePresence>
  )
};
export default App