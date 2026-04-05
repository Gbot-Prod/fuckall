export const formatMMSS = (ms: number) => {
  const minutes = String(Math.floor(ms / 60000)).padStart(2, '0');
  const seconds = String(Math.floor((ms / 1000) % 60)).padStart(2, '0');

  return `${minutes}:${seconds}`;
}

export const formatHHMMSSms = (ms: number) => {
  const hours = String(Math.floor(ms / 3600000)).padStart(2, '0');
  const minutes = String(Math.floor((ms / 60000) % 60)).padStart(2, '0');
  const seconds = String(Math.floor((ms / 1000) % 60)).padStart(2, '0');
  const milliseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');

  return `${hours}:${minutes}:${seconds}:${milliseconds}`
}