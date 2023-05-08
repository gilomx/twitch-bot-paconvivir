import {useState, useRef, useEffect} from 'react';
import './App.css'
import Tacos from './Tacos'
import Tmi from "tmi.js";

function App() {
  const [active, setActive] = useState(true);
  const [request, setRequest] = useState({});
  const [requestQueue, setRequestQueue] = useState([]);

  const tmiClient = useRef(
    new Tmi.Client({
      options: { debug: true },
      identity: {
        username: 'jugarpaconvivir',
        password: 'oauth:68nqajwlygsiiut4x9ljn0tz1xgxu9'
      },
      channels: [ 'jugarpaconvivir' ]
    })
  );

  function handleRequest(username){
    let number = Math.floor(Math.random() * (max - min) + min);
    if(request.username){
      setRequestQueue(queue => [...queue, {username, number}]);
      return;
    }

    const request = {username, number};
    setRequest(request);
  }

  //Listen Chat
  useEffect(() => {
    tmiClient.current.connect();

    tmiClient.current.on("message", (channel, tags, message, self) => {
      if (self) return;

      if(message.toLowerCase() === '!quierotacos') {
        // "@alca, heya!"
        // client.say(channel, `@${tags.username}, heya!`);
        client.say(channel, `@${tags.username}, en un momentito le entregamos sus taquitos :)`);
        handleRequest(tags.username);
      }
    });

    return () => {
      tmiClient.current.disconnect();
    };
  }, []);
  

  //Handle request queue
  useEffect(() => {
    if (requestQueue.length && !request.username) {
      const nextRequest = requestQueue[0];
      setRequest(nextRequest);
    }
  }, [request, requestQueue]);

  return (
    <>
      {request.username && (
          <Tacos username={request.username} number={request.number} />
      )}
    </>
  )
};
export default App