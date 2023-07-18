export const getCurrentGameIdFromLocalStorage = () => JSON.parse(localStorage.getItem("currentGameId") || '1');
