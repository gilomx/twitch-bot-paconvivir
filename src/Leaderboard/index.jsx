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
            <div className="table-headings">
                <div className="player-head">Jugador</div>
                <div className="points-head">Puntos</div>
            </div>
            <ul className="ul-container">
                <li>
                    <div className="win-player-line">
                        <div className="win-player">Cochiloco</div>
                        <div className="win-points">19</div>
                    </div>
                </li>
                <li>
                    <div className="player-line">
                        <div className="player">Cochiloco</div>
                        <div className="points">19</div>
                    </div>
                </li>
                <li>
                    <div className="player-line">
                        <div className="player">Cochiloco</div>
                        <div className="points">19</div>
                    </div>
                </li>
                <li>
                    <div className="player-line">
                        <div className="player">Cochiloco</div>
                        <div className="points">19</div>
                    </div>
                </li>
                <li>
                    <div className="player-line">
                        <div className="player">Cochiloco</div>
                        <div className="points">19</div>
                    </div>
                </li>
            </ul>
            <br/>
        </motion.div>
    );
}

export default Leaderboard;