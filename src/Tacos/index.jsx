//Tacos Component
import { motion } from "framer-motion";
import tacos from '../assets/tacos.gif'

function Tacos(props) {
    //Define min and max numbers
    const min = 1;
    const max = 20;
    
    return (
        <motion.div className='twitch-bot'
            initial={{opacity:0, scale:0}}
            animate={{opacity:1, scale:1}}
            transition={{duration:0.4}}
            exit={{opacity:0, scale:0}}
        >
            <img src={tacos} width="200px"/>
            <br/>
            <motion.p className="message"
            animate={{scale: 0.9}}
            transition={{
                type: 'spring',
                repeat:Infinity,
                repeatType:'reverse',
                delay: 0.4
            }}
            >   
                {props.number > 1 &&
                    <>
                        {props.username} ahí tan tus <b className="message-focus">{props.number}</b> tacos.
                    </>
                }     
                {props.number == 1 &&
                    <>
                        {props.username} nomás <b className="message-focus">{props.number}</b> taquito.
                    </>
                }     
            
            </motion.p>
        </motion.div>
    );
}

export default Tacos;