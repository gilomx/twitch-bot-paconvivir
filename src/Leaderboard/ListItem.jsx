import { AnimatePresence, motion, usePresence } from "framer-motion";

function ListItem({children}) {
    <motion.li key={player.id}
        initial={{scale:0, opacity:0}}
        animate={{scale:1, opacity:1}}
        exit={{scale:0, opacity:0}}
    >
        <div className={filterProps.firstNumber === playerNumber ? "win-player-line" : "player-line"}>
            <div className={filterProps.firstNumber === playerNumber ? "win-player" : "player"}>{playerName}</div>
            <div className={filterProps.firstNumber === playerNumber ? "win-points" : "points"}>{playerNumber}</div>
        </div>
    </motion.li>
}

export default ListItem;