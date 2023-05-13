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
                        <div className="win-player">coquito</div>
                        <div className="win-points">36</div>
                    </div>
                </li>
                <li>
                    <div className="player-line">
                        <div className="player">FurrymichiYT</div>
                        <div className="points">29</div>
                    </div>
                </li>
                <li>
                    <div className="player-line">
                        <div className="player">lechux_</div>
                        <div className="points">21</div>
                    </div>
                </li>
                <li>
                    <div className="player-line">
                        <div className="player">Cyborg</div>
                        <div className="points">18</div>
                    </div>
                </li>
                <li>
                    <div className="player-line">
                        <div className="player">moxxiepocossimps</div>
                        <div className="points">15</div>
                    </div>
                </li>
            </ul>
            <br/>
        </motion.div>
    );
}

export default Leaderboard;