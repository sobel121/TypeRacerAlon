export const getLeaderBoardFromLocalStorage = () => JSON.parse(localStorage.getItem("leaderBoard") || '[]');
