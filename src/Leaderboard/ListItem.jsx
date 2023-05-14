import { AnimatePresence, motion, usePresence } from "framer-motion";

function ListItem(props) {
    return (
    <motion.li key={props.playerId}
        initial={{scale:0, opacity:0}}
        animate={{scale:1, opacity:1}}
        exit={{scale:0, opacity:0}}
    >
        <div className={props.firstNumber === props.playerNumber ? "win-player-line" : "player-line"}>
            <div className={props.firstNumber === props.playerNumber ? "win-player" : "player"}>{props.playerName}</div>
            <div className={props.firstNumber === props.playerNumber ? "win-points" : "points"}>{props.playerNumber}</div>
        </div>
    </motion.li>)
}

export default ListItem;