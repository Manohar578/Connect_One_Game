import React, { useEffect, useState } from "react";
import GameCircle from "./GameCircle";
import '../Game.css'
import Header from "./Header";
import Footer from "./Footer";
import { isWinner, isDraw, getComputerMove } from "../Helper";
import {
    GAME_STATE_PLAYING,
    GAME_STATE_WIN,
    NO_PLAYER,
    PLAYER_1,
    PLAYER_2,
    NO_CIRCLE,
    GAME_STATE_DRAW
} from "../Constants";


const GameBoard = () => {
    const [gameBoard, setGameBoard] = useState(Array(NO_CIRCLE).fill(NO_PLAYER));
    const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);
    const [gameState, setGameState] = useState(GAME_STATE_PLAYING);
    const [winPlayer, setWinPlayer] = useState(NO_PLAYER);

    console.log(gameBoard);

    useEffect(() => {
        initGame();
    }, []);

    const initGame = () => {
        console.log('init game');
        setGameBoard(Array(NO_CIRCLE).fill(NO_PLAYER));
        setCurrentPlayer(PLAYER_1)
        setGameState(GAME_STATE_PLAYING);
    }

    const initBoard = () => {
        const circles = [];
        for (let i = 0; i < NO_CIRCLE; i++) {
            circles.push(circleRender(i));
        }
        return circles;
    };
    const suggestMove = () => {
        circleClicked(getComputerMove(gameBoard));
    }

    const circleClicked = (id) => {
        console.log("circle clicked" + id);

        if (gameBoard[id] !== NO_PLAYER) return;
        if (gameState !== GAME_STATE_PLAYING) return;

        if (isWinner(gameBoard, id, currentPlayer)) {
            setGameState(GAME_STATE_WIN)
            setWinPlayer(currentPlayer)
        } if (isDraw(gameBoard, id, currentPlayer)) {
            setGameState(GAME_STATE_DRAW)
            setWinPlayer(NO_PLAYER)
        }

        setGameBoard(prev => {
            return prev.map((circle, pos) => {
                if (pos === id) return currentPlayer;
                return circle;
            })
        })
        setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1);
        console.log(gameBoard);
        console.log(currentPlayer);
    }
    const circleRender = id => {
        return <GameCircle key={id} id={id} className={`player_${gameBoard[id]}`} onCircleClicked={circleClicked}>
        </GameCircle>

    }

    return (
        <>
            <Header gameState={gameState} currentPlayer={currentPlayer} winPlayer={winPlayer}></Header>
            <div className='gameBoard' >
                {initBoard()}

            </div>
            <Footer onNewGameClick={initGame} onSuggestClick={suggestMove} gameState={gameState}></Footer>
        </>
    )
};
export default GameBoard;
