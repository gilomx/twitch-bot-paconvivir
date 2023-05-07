//Tacos Component
import { motion } from "framer-motion";
import tacos from '../assets/tacos.gif'

function Tacos(props) {
    //Define min and max numbers
    const min = 1;
    const max = 20;
    const randomNumber = Math.floor(Math.random() * (max - min) + min);
    return (
        <motion.div className='twitch-bot'
        //TODO insert enter animations
        >
            <img src={tacos} width="200px"/>
            <br/>
            <motion.p className="message"
            animate={{scale: 0.9}}
            transition={{type: 'spring', repeat:Infinity, repeatType:'reverse'}}
            >   
                {randomNumber > 1 &&
                    <>
                        {props.username} ahí tan tus <b className="message-focus">{randomNumber}</b> tacos.
                    </>
                }     
                {randomNumber == 1 &&
                    <>
                        {props.username} nomás <b className="message-focus">{randomNumber}</b> taquito.
                    </>
                }     
            
            </motion.p>
        </motion.div>
    );
}

export default Tacos;