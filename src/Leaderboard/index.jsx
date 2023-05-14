//Tacos Component
import { AnimatePresence, motion, Reorder  } from "framer-motion";
import medal from '../assets/lovecoin.png'
import taco from '../assets/food_taco.png'
import ListItem from "./ListItem";

function Leaderboard(props) {
    //Define min and max numbers
    // const min = 1;
    // const max = 500;
    const users = props.users.savedUsers;
    const sorted = users.sort((a, b) => b.number - a.number).slice(0, 5);
    console.log(sorted);
    return (
        <motion.div className='leaderboard'
            initial={{opacity:0, scale:0}}
            animate={{opacity:1, scale:1}}
            transition={{duration:0.4}}
            exit={{opacity:0, scale:0}}
        >
            <h1>¿Quién tragó más?</h1>
            {/* <img src={tacos} width="200px"/> */}
            {sorted.length > 0 &&
                <>
                    <div className="table-headings">
                        <div className="player-head">Jugador</div>
                        <div className="points-head">Tacos Absorbidos</div>
                    </div>
                    <Reorder.Group values={sorted}
                        as="ul"
                        axis="y"
                        >
                            {sorted.map((player) => (
                                <ListItem
                                key={player.id}
                                firstNumber={sorted[0].number}
                                playerId={player.id}
                                playerNumber={player.number}
                                playerName={player.username}/>
                                ))}
                        {/* <li>
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
                        </li> */}
                    </Reorder.Group>
                    
                </>
            }
            {sorted.length === 0 &&
                <motion.img
                    animate={{ scale: 1.1 }}
                    transition={{ repeat: Infinity, repeatType:"reverse", duration: 1.5 }}
                    src={medal} width="200px"/>
            }
            <br/>
            <motion.img 
                className="taco-img"
                initial={{
                    rotate: -10,
                    scale:0.9
                }}
                animate={{
                    scale:1.1,
                    rotate:-20,
                    x:-30,
                    y:-20
                }}
                transition={{
                    duration: 1,
                    type: "spring",
                    repeat: Infinity,
                    repeatType: 'mirror',
                    repeatDelay:5,
                    stiffness:50,
                    damping:2
                  }}
                src={taco}
                width="300px" />
        </motion.div>
    );
}

export default Leaderboard;