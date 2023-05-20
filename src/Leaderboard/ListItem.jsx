import { AnimatePresence, motion, usePresence, Reorder, useIsPresent } from "framer-motion";

function ListItem(props) {
    const isPresent = useIsPresent()
    return (
        <Reorder.Item className={props.firstNumber === props.playerNumber ? "win-player-line" : "player-line"}
            initial={{scale:0, opacity:0}}
            animate={{scale:1, opacity:1}}
            transition={{type: 'spring', duration:0.3}}
            exit={{scale:0, opacity:0}}
            style={{
                position: isPresent ? 'relative' : 'absolute',
                background: props.firstNumber === props.playerNumber ? props.styles.winPlayerLine.background : props.styles.playerLine.background
            }}
        >
            <div className={props.firstNumber === props.playerNumber ? "win-player" : "player"}>{props.playerName}</div>
            <div className={props.firstNumber === props.playerNumber ? "win-points" : "points"}>{props.playerNumber}</div>
        </Reorder.Item>
)}

export default ListItem;