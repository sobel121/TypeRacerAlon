export const getCurrentGameIdFromLocalStorage = () => JSON.parse(localStorage.getItem("currentGameId") || '1');

export const setCurrentGameIdInLocalStorage = (gameId: number) => localStorage.setItem("currentGameId", JSON.stringify(gameId));