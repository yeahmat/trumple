import { timeSinceMidnight } from "../utils";

export const initialState = {
  stats: {
    Played: 0,
    "Win %": 0,
    "Current Streak": 0,
    "Max Streak": 0,
  },
  guesses: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  },
  gamesWon: 0,
  lastDatePlayed: -Infinity,
};

export const initializer = (initialValue) => {
  const local = JSON.parse(localStorage.getItem("statistics"));
  return local || initialValue;
};
export const reducer = (state, action) => {
  switch (action.type) {
    case "updateStats":
      const now = new Date().getTime();
      if (now - state.lastDatePlayed < timeSinceMidnight()) return state;

      const { guesses, isWon } = action.payload;
      const { Played, "Max Streak": maxStreak, "Current Streak": currentStreak } = state.stats;

      const newPlayed = Played + 1;
      const newGamesWon = isWon ? state.gamesWon + 1 : state.gamesWon;
      const newWinPercentage = Math.floor((newGamesWon / newPlayed) * 100);
      const newStreak = isWon ? currentStreak + 1 : 0;
      const newMaxStreak = newStreak > maxStreak ? newStreak : maxStreak;

      const newGuessDistribution = isWon ? state.guesses[guesses.length] + 1 : state.guesses[guesses.length];

      return {
        ...state,
        stats: {
          Played: newPlayed,
          "Win %": newWinPercentage,
          "Current Streak": newStreak,
          "Max Streak": newMaxStreak,
        },
        guesses: {
          ...state.guesses,
          [guesses.length]: newGuessDistribution,
        },
        gamesWon: newGamesWon,
        lastDatePlayed: now,
      };
    default:
      return state;
  }
};
