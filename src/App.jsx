import {useState, useRef, useEffect} from 'react';
import './App.css'
import sound from './assets/audio.mp3'
import Tacos from './Tacos'
import Tmi from "tmi.js";
import { AnimatePresence } from 'framer-motion';

function App() {
  const [active, setActive] = useState(false);
  const [notification, setNotification] = useState({});
  const [requestQueue, setRequestQueue] = useState([]);
  const [notificationQueue, setNotificationQueue] = useState([]);
  const [savedUsers, setSavedUsers] = useState([]);
  const channelRef = useRef();

  const audio = new Audio(sound);

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
  
  function handleRequest(username){
    console.log('handlerequest()')
    let number = Math.floor(Math.random() * (max - min) + min);
    setRequestQueue(queue => [...queue, {username, number}]);
  }

  const userExists = (username) =>{
    console.log("Comprobando si el usuario existe:");
    let exists = savedUsers.some(user => user.username === username);
    console.log(exists);
    return exists;
  }

  function saveRequest(){
    console.log("requestQueue()")
    console.log(requestQueue);

    if(requestQueue.length){
      
      const nextRequest = requestQueue[0];
      console.log("nextRequest:")
      console.log(nextRequest);
      
      const username = nextRequest.username;
      console.log("username:")
      console.log(username);
      
      const number = nextRequest.number;
      console.log("number:")
      console.log(number);

      const exists = userExists(username);
      console.log("userExists")
      console.log(exists);

      if(exists){
        console.log("entrando a si existe")
        tmiClient.current.say(channelRef.current, `@${username}, Tu ya comiste tragon@`);
      }else {
        console.log("entrando a no existe")
        setNotificationQueue(queue => [...queue, {username, number}]);
        setSavedUsers(users => [...users, {username, number}]);
        tmiClient.current.say(channelRef.current, `@${username}, En un momentito le entrego sus tacos!`);
      }
      
      setRequestQueue(queue => queue.slice(1));
    }
  }

  //Show notifications
  function notifier(){

    if (active) return;
    
    if(notificationQueue.length){
      const nextNotification = notificationQueue[0];
      setNotification(nextNotification);
      audio.play();
      
      setTimeout(() => {
        setActive(true);
        //Add time to hide notification
      }, 500)

      setTimeout(() => {
        setActive(false);
        setNotification({})
        setNotificationQueue(queue => queue.slice(1));
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
        handleRequest(tags.username);
      }
    });

    return () => {
      tmiClient.current.disconnect();
    };
  }, []);
  
  
  //Handle requestQueue
  useEffect(() => {
    saveRequest();
  }, [requestQueue]);

  //Handle request queue
  useEffect(() => {
    notifier();
  }, [active,notificationQueue, notification]);

  return (
    <AnimatePresence>
      {active &&(
          <Tacos username={notification.username} number={notification.number} />
      )}
    </AnimatePresence>
  )
};
export default App