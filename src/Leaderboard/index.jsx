//Tacos Component
import { motion } from "framer-motion";
import tacos from '../assets/tacos.gif'

function Leaderboard(props) {
    //Define min and max numbers
    const min = 1;
    const max = 20;
    
    return (
        <motion.div className='leaderboard'
            initial={{opacity:0, scale:0}}
            animate={{opacity:1, scale:1}}
            transition={{duration:0.4}}
            exit={{opacity:0, scale:0}}
        >
            <h1>¿Quién tragó más?</h1>
            {/* <img src={tacos} width="200px"/> */}
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </motion.div>
    );
}

export default Leaderboard;