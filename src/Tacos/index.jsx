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
                        <b>{props.username}</b> ahí tan tus <b>{props.number}</b> tacos.
                    </>
                }     
                {props.number == 1 &&
                    <>
                        <b>{props.username}</b> nomás <b>{props.number}</b> taquito.
                    </>
                }     
            
            </motion.p>
        </motion.div>
    );
}

export default Tacos;