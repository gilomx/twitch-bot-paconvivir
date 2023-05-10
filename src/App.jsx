import {useState, useRef, useEffect} from 'react';
import './App.css'
import Tacos from './Tacos'
import Tmi from "tmi.js";
import { AnimatePresence } from 'framer-motion';

function App() {
  const [active, setActive] = useState(false);
  const [notification, setNotification] = useState({});
  const [requestQueue, setRequestQueue] = useState([]);
  const [savedUsers, setSavedUsers] = useState([]);
  const channelRef = useRef();
  //Define min and max numbers
  const min = 1;
  const max = 20;
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
    
  function saveRequest(username){
    let number = Math.floor(Math.random() * (max - min) + min);
    // console.log('entrando a requestqueue')
    // const exists = (savedUsers.length) ? userExists(username) : false;

    

    console.log("Exists:");
    // console.log(exists);
    // tmiClient.current.connect();
    if(userExists(username)){
      tmiClient.current.say(channelRef.current, `@${username}, Tu ya comiste tragon@`);
    }else {
      setRequestQueue(queue => [...queue, {username, number}]);
      setSavedUsers(users => [...users, {username, number}]);
      tmiClient.current.say(channelRef.current, `@${username}, En un momentito le entrego sus tacos!`);
    }
    // tmiClient.current.disconnect();
  }

  const userExists = (username, users) =>{
    console.log("Comprobando si el usuario existe:");
    let exists = savedUsers.some(user => user.username === username);
    console.log(exists);
    return exists;
  }

  //Show notifications
  function notifier(){

    if (active) return;

    if(requestQueue.length){
      const nextNotification = requestQueue[0];
      setNotification(nextNotification);
      setTimeout(() => {
        setActive(true);
        //Add time to hide notification
      }, 500)

      setTimeout(() => {
        setActive(false);
        setNotification({})
        setRequestQueue(queue => queue.slice(1));
      }, 4000);

      
    }

  }

  //Listen Chat
  useEffect(() => {
    tmiClient.current.connect();

    tmiClient.current.on("message", (channel, tags, message, self) => {
      if (self) return;
      channelRef.current = channel;

      if(message.toLowerCase() === '!quierotacos') {
        saveRequest(tags.username);
      }
    });

    return () => {
      tmiClient.current.disconnect();
    };
  }, []);
  
  

  //Handle request queue
  useEffect(() => {
    notifier();
  }, [active,requestQueue]);

  return (
    <AnimatePresence>
      {active &&(
          <Tacos username={notification.username} number={notification.number} />
      )}
    </AnimatePresence>
  )
};
export default App