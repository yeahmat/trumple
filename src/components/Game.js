import { useEffect, useCallback, useReducer } from "react";
import styled from "styled-components";
import { maxGuesses, wordLength } from "../config";
import Board from "./Board";
import Toast from "./Toast";
import Keyboard from "./Keyboard";
import Modal from "./Modals/Modal";
import StatsModal from "./Modals/StatsModal/StatsModal";
import * as GameState from "../reducers/GameState";
import { useStats } from "../contexts/StatsContext";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  height: calc(100% - 50px);
`;

const Game = () => {
  const [gameState, gameDispatch] = useReducer(GameState.reducer, GameState.initialState, GameState.initializer);
  const { guesses, currentGuess, keyboardColors, isWon, isRevealing, toastMessage } = gameState;

  const { statsModalIsOpen, toggleStatsModal, openStatsModal, statsDispatch, statsState } = useStats();
  const gameIsOver = guesses.length === maxGuesses || isWon;

  useEffect(() => {
    localStorage.setItem("gameState", JSON.stringify(gameState));
  }, [gameState]);

  const onAddLetter = useCallback((letter) => gameDispatch({ type: "addLetter", payload: letter }), []);
  const onEnter = useCallback(() => gameDispatch({ type: "addWord" }), []);
  const onDelete = useCallback(() => gameDispatch({ type: "deleteLetter" }), []);
  const clearToast = useCallback(() => gameDispatch({ type: "clearToast" }), []);
  const closeModalAndReset = useCallback(() => {
    gameDispatch({ type: "reset" });
    toggleStatsModal();
  }, [toggleStatsModal, gameDispatch]);

  useEffect(() => {
    if (guesses.length === 0) return;
    const timeToFlipTiles = wordLength * 350;
    setTimeout(() => {
      gameDispatch({ type: "updateKeyboardColors" });
    }, timeToFlipTiles);
  }, [guesses]);

  useEffect(() => {
    if (!gameIsOver) return;
    statsDispatch({ type: "updateStats", payload: { guesses, isWon } });
    setTimeout(() => openStatsModal(), 2000);
  }, [gameIsOver, isWon, guesses, openStatsModal, statsDispatch]);

  return (
    <Container>
      <Board
        completedRowValues={guesses}
        currentRowValue={currentGuess}
        isRevealing={isRevealing}
        hasError={toastMessage.length > 0 && !gameIsOver}
      />
      <Keyboard {...{ onAddLetter, onEnter, onDelete, keyboardColors }} />
      {toastMessage.length > 0 && <Toast message={toastMessage} clearToast={clearToast} />}
      {statsModalIsOpen && (
        <Modal onClose={toggleStatsModal}>
          <StatsModal closeAndReset={closeModalAndReset} statistics={statsState} />
        </Modal>
      )}
    </Container>
  );
};

export default Game;
