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

  function handleRequest(){
    
    if(!lastUser) return;

    console.log("saveRequest()")
    console.log(savedUsers);
    const number = Math.floor(Math.random() * (max - min) + min);
    const username = lastUser.username;
    // const userName = username;
    const times = getUserAttempts(username);
    // const times = (savedAttempts) ? savedAttempts + 1 : 1;
    console.log(times);
    const id = lastUser.id;
    // const id = lastId + 1;

    const exists = userExists(username);
    
    if(exists && times>=3){
      console.log("entrando a si existe")
      tmiClient.current.say(channelRef.current, `@${username}, Tu ya comiste tragon@`);
    }else {
      console.log("entrando a no existe")
      if(exists){
        setSavedUsers((users) =>
          users.map((user) =>
            username === username ? { ...user, times: user.times + 1, number: number} : user
          )
        );
      }else{
        setSavedUsers(users => [...users, {id, username, number, times}]);
      }
      const tacosMsg = number === 1 ? '1 taquito :(' : `${number} tacos`;
      tmiClient.current.say(channelRef.current, `@${username}, Te comiste ${tacosMsg}`);
    }
    console.log(savedUsers);
    //Only for test, for production use the code commented before
    // console.log("entrando a no existe")
    // setSavedUsers(users => [...users, {id, username, number}]);
    // const tacosMsg = number === 1 ? '1 taquito :(' : `${number} tacos`;
    // tmiClient.current.say(channelRef.current, `@${username}, Te comiste ${tacosMsg}`);
    setLastUser({});
  }

  const userExists = (username) =>{
    console.log("existe " + username + "?")
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