import {useState, useRef, useEffect} from 'react';
import './App.css'
import Tacos from './Tacos'
import Tmi from "tmi.js";
import { AnimatePresence } from 'framer-motion';

function App() {
  const [active, setActive] = useState(false);
  const [notification, setNotification] = useState({});
  const [requestQueue, setRequestQueue] = useState([]);

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
    setRequestQueue(queue => [...queue, {username, number}]);
    // console.log("requestqueue:")
    // console.log(requestQueue);
  }

  // function showNotification(data){
  //   setNotification(data);
  //   setActive(true);
  //   timer = setTimeout(() => {
  //     setActive(false);
  //   }, 3000);
  // }

  function notifier(){

    if (active) return;

    if(requestQueue.length){
      const nextNotification = requestQueue[0];
      setNotification(nextNotification);
      setActive(true);

      setTimeout(() => {
        setActive(false);
        setNotification({})
        setRequestQueue(queue => queue.slice(1));
      }, 3000);

    }

  }

  //Listen Chat
  useEffect(() => {
    tmiClient.current.connect();

    tmiClient.current.on("message", (channel, tags, message, self) => {
      if (self) return;

      if(message.toLowerCase() === '!quierotacos') {
        // "@alca, heya!"
        // client.say(channel, `@${tags.username}, heya!`);
        tmiClient.current.say(channel, `@${tags.username}, En un momentito le entrego sus tacos!`);
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